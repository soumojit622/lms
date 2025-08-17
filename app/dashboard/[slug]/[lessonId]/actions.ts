"use server"

import { requireUser } from "@/app/data/user/require-user"
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

export const MarklessonComplete = async (
    lessonId: string,
    slug: string
): Promise<ApiResponse> => {

    const session = await requireUser();

    try {

        await prisma.lessonProgress.upsert({ 
            where: {
                userId_lessonId: {               
                    userId: session.id,
                    lessonId: lessonId
                },
            },
            update: {
                completed: true                  
            },
            create: {                          
                userId: session.id,
                lessonId: lessonId,
                completed: true
            }
        })

        revalidatePath(`/dashboard/${slug}`);

        return {
            status: "success",
            message: "Lesson marked as complete",
        }

    } catch {
        return {
            status: "error",
            message: "Failed to mark lesson as complete",
        }
    }

}