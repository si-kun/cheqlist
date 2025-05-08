"use server";

import { prisma } from "@/lib/prismaClient";

export const getTaskWithPagenation = async (
  status: "completed" | "incompleted" | "all" | "favorite",
  page: number = 1,
  limit: number = 10,
  sort: {field: string; order: "asc" | "desc"} = {field: "createdAt", order: "desc"}
) => {
  try {
    const where =
      status === "completed"
        ? { completed: true }
        : status === "incompleted"
        ? { completed: false }
        : status === "favorite"
        ? { isFavorite: true }
        : {};

    const [tasks, totalCount] = await Promise.all([
      prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sort.field]: sort.order
        },
        include: {
          checklists: true,
        }
      }),
      prisma.task.count({where})
    ])

    const totalPages = Math.ceil(totalCount / limit);

    return { success: true, message: "タスクを取得できました", tasks, totalCount, totalPages, sort };
  } catch (error) {
    return { success: false, message: "タスクを取得できませんでした", error };
  }
};
