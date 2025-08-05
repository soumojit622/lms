"use server"

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { chapterSchema, ChapterSchemaType, courseSchema, CourseSchemaType, lessonSchema, LessonSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet
    .withRule(
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 5
        })
    )

export const editCourse = async (
    data: CourseSchemaType,
    courseId: string

): Promise<ApiResponse> => {

    const user = await requireAdmin();

    try {

        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: user.user.id
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: "error",
                    message: "You have been blocked due to rate limiting"
                }
            } else {
                return {
                    status: "error",
                    message: "Automated request blocked. If this is a mistake, please contact support"
                }
            }
        }

        const result = courseSchema.safeParse(data);

        if (!result.success) {
            return {
                status: "error",
                message: "Invalid form data"
            }
        }

        await prisma.course.update({
            where: {
                id: courseId,
                userId: user.user.id
            },
            data: {
                ...result.data
            }
        })

        return {
            status: "success",
            message: "Course updated successfully"
        }
    } catch {
        return {
            status: "error",
            message: "Failed to update the course. Please check server logs for details."
        }
    }
}

export const reorderLessons = async (
    chapterId: string,
    lessons: { id: string; position: number }[],
    courseId: string
): Promise<ApiResponse> => {

    await requireAdmin();

    try {

        if (!lessons || lessons.length === 0) {
            return {
                status: "error",
                message: "No lesson provided for reordering"
            }
        }

        const updates = lessons.map((lesson) =>
            prisma.lesson.update({
                where: {
                    id: lesson.id,
                    chapterId: chapterId
                },
                data: {
                    position: lesson.position
                }
            })
        )

        await prisma.$transaction(updates);

        revalidatePath(`/admin/courses/${courseId}/edit`)

        return {
            status: "success",
            message: "Lessons reordered successfully"
        }

    } catch {
        return {
            status: "error",
            message: "Failed to reorder lessons. Please check server logs for details."
        }
    }
}

export const reorderChapters = async (
    courseId: string,
    chapters: { id: string; position: number }[],
): Promise<ApiResponse> => {

    await requireAdmin();

    try {

        if (!chapters || chapters.length === 0) {
            return {
                status: "error",
                message: "No chapter provided for reordering"
            }
        }

        const updates = chapters.map((chapter) =>
            prisma.chapter.update({
                where: {
                    id: chapter.id,
                    courseId: courseId
                },
                data: {
                    position: chapter.position
                }
            })
        )

        await prisma.$transaction(updates);

        revalidatePath(`/admin/courses/${courseId}/edit`)
        return {
            status: "success",
            message: "Chapters reordered successfully"
        }

    } catch {
        return {
            status: "error",
            message: "Failed to reorder chapters. Please check server logs for details."
        }
    }
}

export const createChapter = async (values: ChapterSchemaType): Promise<ApiResponse> => {

    await requireAdmin();

    try {

        const result = chapterSchema.safeParse(values);
        if (!result.success) {
            return {
                status: "error",
                message: "Invalid form data"
            }
        }

        await prisma.$transaction(async (tx) => {


            const maxPos = await tx.chapter.findFirst({
                where: {
                    courseId: result.data.courseId,
                },
                select: {
                    position: true,
                },
                orderBy: {
                    position: "desc",
                }
            })

            await tx.chapter.create({
                data: {
                    title: result.data.name,
                    courseId: result.data.courseId,
                    position: (maxPos?.position ?? 0) + 1
                }
            })
        })

        revalidatePath(`/admin/courses/${result.data.courseId}/edit`)

        return {
            status: "success",
            message: "Chapter created successfully"
        }

    } catch {
        return {
            status: "error",
            message: "Failed to create chapter. Please check server logs for details."
        }
    }
}

export const createLesson = async (values: LessonSchemaType): Promise<ApiResponse> => {

    await requireAdmin();

    try {

        const result = lessonSchema.safeParse(values);
        if (!result.success) {
            return {
                status: "error",
                message: "Invalid form data"
            }
        }

        await prisma.$transaction(async (tx) => {


            const maxPos = await tx.lesson.findFirst({
                where: {
                    chapterId: result.data.chapterId,
                },
                select: {
                    position: true,
                },
                orderBy: {
                    position: "desc",
                }
            })

            await tx.lesson.create({
                data: {
                    title: result.data.name,
                    description: result.data.description,
                    videoKey: result.data.videoKey,
                    thumbnailKey: result.data.thumbnailKey,
                    chapterId: result.data.chapterId,
                    position: (maxPos?.position ?? 0) + 1
                }
            })
        })

        revalidatePath(`/admin/courses/${result.data.courseId}/edit`)

        return {
            status: "success",
            message: "Lesson created successfully"
        }

    } catch {
        return {
            status: "error",
            message: "Failed to create lesson. Please check server logs for details."
        }
    }
}

export const deleteChapter = async ({
    chapterId,
    courseId
}: {
    chapterId: string;
    courseId: string;
}): Promise<ApiResponse> => {

    await requireAdmin();

    try {

        const courseWithChapters = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            select: {
                chapter: {
                    orderBy: {
                        position: "asc",
                    },
                    select: {
                        id: true,
                        position: true
                    }
                }
            }
        })

        if (!courseWithChapters) {
            return {
                status: "error",
                message: "Course not found"
            }
        }

        const chapters = courseWithChapters.chapter;

        const chapterToDelete = chapters.find((chap) => chap.id === chapterId);

        if (!chapterToDelete) {
            return {
                status: "error",
                message: "Chapter not found in the course"
            }
        }

        const remainingChapters = chapters.filter((chap) => chap.id !== chapterId);

        const updates = remainingChapters.map((chap, index) => {
            return prisma.chapter.update({
                where: { id: chap.id },
                data: { position: index + 1 }
            })
        })

        await prisma.$transaction([
            ...updates,
            prisma.chapter.delete({
                where: {
                    id: chapterId,
                }
            })
        ]);

        revalidatePath(`/admin/courses/${courseId}/edit`)

        return {
            status: "success",
            message: "Chapter deleted and position reordered successfully"
        }


    } catch (error) {
        return {
            status: "error",
            message: "Failed to delete chapter.."
        }
    }
}
export const deleteLesson = async ({
    chapterId,
    lessonId,
    courseId
}: {
    chapterId: string;
    lessonId: string;
    courseId: string;
}): Promise<ApiResponse> => {

    await requireAdmin();

    try {

        const chapterWithLessons = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            },
            select: {
                lessons: {
                    orderBy: {
                        position: "asc"
                    },
                    select: {
                        id: true,
                        position: true
                    }
                }
            }
        })

        if (!chapterWithLessons) {
            return {
                status: "error",
                message: "Chapter not found"
            }
        }

        const lessons = chapterWithLessons.lessons;

        const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);

        if (!lessonToDelete) {
            return {
                status: "error",
                message: "Lesson not found in the chapter"
            }
        }

        const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);

        const updates = remainingLessons.map((lesson, index) => {
            return prisma.lesson.update({
                where: { id: lesson.id },
                data: { position: index + 1 }
            })
        })

        await prisma.$transaction([
            ...updates,
            prisma.lesson.delete({
                where: {
                    id: lessonId,
                    chapterId: chapterId
                }
            })
        ]);

        revalidatePath(`/admin/courses/${courseId}/edit`)

        return {
            status: "success",
            message: "Lesson deleted and position reordered successfully"
        }


    } catch (error) {
        return {
            status: "error",
            message: "Failed to delete lesson.."
        }
    }
}



