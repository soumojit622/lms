"use client";

import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  GripVerticalIcon,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { reorderChapters, reorderLessons } from "../actions";
import { DeleteChapter } from "./DeleteChapter";
import { DeleteLesson } from "./DeleteLesson";
import { NewChapterModal } from "./NewChapterModal";
import { NewLessonModal } from "./NewLessonModal";

interface iAppProps {
  data: AdminCourseSingularType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string;
  };
}

export const CourseStructure = ({ data }: iAppProps) => {
  const initialItems =
    data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems((prevItems) => {
      const updatedItems =
        data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            prevItems.find((item) => item.id === chapter.id)?.isOpen ?? true,
          lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
          })),
        })) || [];

      return updatedItems;
    });
  }, [data]);

  function SortableItem({ children, id, className, data }: SortableItemProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: id, data: data });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn("touch-none", className, isDragging ? "z-10" : "")}
      >
        {children(listeners)}
      </div>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = over.data.current?.type as "chapter" | "lesson";
    const courseId = data.id;

    if (activeType === "chapter") {
      let targetChapterId = null;

      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }

      if (!targetChapterId) {
        toast.error("Could not determine the chapter for reordering");
        return;
      }

      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 || newIndex === -1) {
        toast.error("Could not find chapter old/new index for reordering");
        return;
      }

      const reordedLocalChapter = arrayMove(items, oldIndex, newIndex);
      const updatedChapterForState = reordedLocalChapter.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        })
      );

      const previousItems = [...items];

      setItems(updatedChapterForState);

      if (courseId) {
        const chaptersToUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));

        const reorderChapterPromise = () =>
          reorderChapters(courseId, chaptersToUpdate);

        toast.promise(reorderChapterPromise, {
          loading: "Reordering chapters...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder chapters. Please try again later.";
          },
        });
      }
    }

    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;

      if (!chapterId || chapterId !== overChapterId) {
        toast.error(
          "Lesson move between different chapters or invalid chapter id not allowed."
        );
        return;
      }

      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId
      );

      if (chapterIndex === -1) {
        toast.error("Could not find chapter for lesson");
        return;
      }

      const chapterToUpdate = items[chapterIndex];

      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === activeId
      );

      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overId
      );

      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.error("Could not find lesson for reordering");
        return;
      }

      const reordedLessons = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex
      );

      const updatedlessonForState = reordedLessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));

      const newItems = [...items];

      newItems[chapterIndex] = {
        ...chapterToUpdate,
        lessons: updatedlessonForState,
      };

      const previousItems = [...items];

      setItems(newItems);

      if (courseId) {
        const lessonsToUpdate = updatedlessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));

        const reorderLessonPromise = () =>
          reorderLessons(chapterId, lessonsToUpdate, courseId);

        toast.promise(reorderLessonPromise, {
          loading: "Reordering lessons...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder lessons. Please try again later.";
          },
        });
      }

      return;
    }
  }

  function toggleChapter(chapterId: string) {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter
      )
    );
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card className="overflow-hidden shadow-sm border border-border rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <BookMarked className="size-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Chapters</CardTitle>
          </div>
          <NewChapterModal courseId={data.id} />
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                data={{ type: "chapter" }}
              >
                {(listeners) => (
                  <Card className="rounded-md border border-border shadow-sm hover:shadow-md transition-all duration-200">
                    <Collapsible
                      open={item.isOpen}
                      onOpenChange={() => toggleChapter(item.id)}
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
                        <div className="flex items-center gap-3">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-muted rounded-full"
                            {...listeners}
                          >
                            <GripVerticalIcon className="size-4 opacity-70" />
                          </Button>

                          <CollapsibleTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="flex items-center rounded-full hover:bg-muted"
                            >
                              {item.isOpen ? (
                                <ChevronDown className="size-4" />
                              ) : (
                                <ChevronRight className="size-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>

                          <BookOpen className="size-4 text-primary opacity-80 " />
                          <p className="cursor-pointer hover:text-primary font-medium">
                            {item.title}
                          </p>
                        </div>

                        <DeleteChapter chapterId={item.id} courseId={data.id} />
                      </div>

                      <CollapsibleContent>
                        <div className="p-3 space-y-2">
                          <SortableContext
                            items={item.lessons.map((lesson) => lesson.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {item.lessons.map((lesson) => (
                              <SortableItem
                                key={lesson.id}
                                id={lesson.id}
                                data={{ type: "lesson", chapterId: item.id }}
                              >
                                {(lessonListeners) => (
                                  <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent/50 transition-colors duration-150">
                                    <div className="flex items-center gap-3">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hover:bg-muted rounded-full"
                                        {...lessonListeners}
                                      >
                                        <GripVerticalIcon className="size-4 opacity-70" />
                                      </Button>

                                      <FileText className="size-4 text-primary opacity-80" />

                                      <Link
                                        href={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}
                                        className="hover:underline"
                                      >
                                        {lesson.title}
                                      </Link>
                                    </div>

                                    <DeleteLesson
                                      lessonId={lesson.id}
                                      chapterId={item.id}
                                      courseId={data.id}
                                    />
                                  </div>
                                )}
                              </SortableItem>
                            ))}
                          </SortableContext>

                          <div className="pt-2 border-t border-border flex items-center gap-2">
                            <PlusCircle className="size-4 text-primary" />
                            <NewLessonModal
                              courseId={data.id}
                              chapterId={item.id}
                            />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
};
