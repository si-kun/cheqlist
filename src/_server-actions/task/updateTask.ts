"use server";

import { prisma } from "@/lib/prismaClient";
import { Checklist, Task } from "@/type";

export const updateTask = async (
  taskId: string,
  task: Task,
  checklists: Checklist[],
  deleteChecklists: string[]
) => {
  try {
    const { title, description, completed, startDate, endDate, isFavorite } =
      task;

    const updateTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        completed,
        startDate,
        endDate,
        isFavorite,
      },
    });

    await Promise.all(
      checklists.map((c) => {
       return prisma.checklist.upsert({
          where: {
            id: c.id,
          },
          create: {
            id: c.id,
            title: c.title,
            description: c.description,
            completed: c.completed,
            taskId: taskId,
          },
          update: {
            title: c.title,
            description: c.description,
            completed: c.completed,
          },
        });
      })
    );

    if (deleteChecklists.length > 0) {
      await prisma.checklist.deleteMany({
        where: {
          id: {
            in: deleteChecklists,
          }
        }
      })
    }

    return {
      success: true,
      message: "タスクの更新に成功しました",
      updateTask,
    };
  } catch (error) {
    return {
      success: false,
      message: "タスクの更新に失敗しました",
      error,
    };
  }
};
