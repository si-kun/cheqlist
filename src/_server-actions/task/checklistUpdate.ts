"use server";

import { prisma } from "@/lib/prismaClient";
import { Checklist } from "@/type";

export const favoriteWithChecklistUpdate = async (checklists: Checklist[],taskId: string, isFavorite: boolean) => {
  try {

    const favoriteUpdate = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isFavorite,
      }
    })

    const updateResults = await Promise.all(
      checklists.map((checklist) => {
        return prisma.checklist.update({
          where: {
            id: checklist.id,
          },
          data: {
            completed: checklist.completed,
          },
        });
      })
    );

    const task = await prisma.task.update({
      where: {
        id:taskId,
      },
      data: {
        completed: checklists.every((checklist) => checklist.completed),
      }
    })

    return {
      success: true,
      message: "チェックリストが更新できました",
      favoriteUpdate,
      updateResults,
      task,
    };
  } catch (error) {
    return {
      success: false,
      message: "チェックリストが更新できませんでした",
      error,
    };
  }
};
