"use server";

import { prisma } from "@/lib/prismaClient";
import { Checklist, Task } from "@/type";

export const updateTask = async (
  task: Task,
  checklists: Checklist[],
  deleteChecklists: string[]
) => {
  try {

    const deleteIds = deleteChecklists ?? []

    if(deleteIds.length > 0) {
      await prisma.checklist.deleteMany({
        where: {
          id: {
            in: deleteIds
          }
        }
      })
    }

    const result = await prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        isFavorite: task.isFavorite,
        checklists: {
          upsert: checklists.map((c,index) =>
            c.id
              ? {
                  where: {
                    id: c.id,
                  },
                  update: {
                    title: c.title,
                    description: c.description,
                    completed: c.completed,
                    order: index,
                  },
                  create: {
                    title: c.title,
                    description: c.description,
                    completed: c.completed,
                    order: index,
                  },
                }
              : {
                  where: { id: crypto.randomUUID() },
                  update: {},
                  create: {
                    title: c.title,
                    description: c.description,
                    completed: c.completed,
                    order: index,
                  }
                }
          )
        }
      }
    })


    return {
      success: true,
      message: "タスクの更新に成功しました",
      updateTask: result,
    }
  } catch (error) {
    return {
      success: false,
      message: "タスクの更新に失敗しました",
      error,
    };
  }
};
