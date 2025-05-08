"use server";

import { prisma } from "@/lib/prismaClient";

export const getTaskForHomePage = async () => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        checklists: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, message: "タスクを取得できました", tasks };
  } catch (error) {
    return { success: false, message: "タスクを取得できませんでした", error };
  }
};
