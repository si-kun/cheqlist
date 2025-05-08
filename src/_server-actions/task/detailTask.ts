"use server";

import { prisma } from "@/lib/prismaClient";

export const detailTask = async (title: string) => {
  try {
    const res = await prisma.task.findFirst({
      where: {
        title: title,
      },
      include: {
        checklists: true,
      },
    });

    if (!res) {
      return { success: false, message: "タスクが見つかりません" };
    }

    return { success: true, message: "タスクを取得できました", task: res };
  } catch (error) {
    return { success: false, message: "タスクを取得できませんでした", error: String(error) }; // ←ここを修正！
  }
};
