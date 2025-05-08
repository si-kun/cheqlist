'use server'

import { prisma } from "@/lib/prismaClient";

export const deleteTask = async (taskId: string) => {
  try {
    const res = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    if (!res) {
      return {
        success: false,
        message: "タスクを削除できませんでした",
      };
    }

    return {
      success: true,
      message: "タスクを削除しました",
    };
  } catch (error) {
    return {
      success: false,
      message: "タスクを削除できませんでした",
      error: error,
    };
  }
};
