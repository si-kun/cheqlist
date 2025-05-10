"use server";

import { prisma } from "@/lib/prismaClient";

export const getAllMemosActions = async (
  status: "all" | "favorite" | "createdAt" | "updatedAt",
  page: number = 1,
  limit: number = 12,
  sort: { field: string; order: "asc" | "desc" } = {
    field: "createdAt",
    order: "desc",
  }
) => {
  try {
    const where =
      status === "all"
        ? {}
        : status === "favorite"
        ? {
            isFavorite: true,
          }
        : status === "createdAt"
        ? {
            createdAt: {
              [sort.order]: sort.field,
            },
          }
        : status === "updatedAt"
        ? {
            updatedAt: {
              [sort.order]: sort.field,
            },
          }
        : {};
    const memos = await prisma.memo.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sort.field]: sort.order,
      },
      include: {
        childMemos: true,
      },
    });
    const total = await prisma.memo.count({
      where,
    });

    const totalPages = Math.ceil(total / limit);
    return {
      success: true,
      message: "メモの取得に成功しました",
      data: {
        memos,
        totalPages,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "メモの取得に失敗しました",
      error: error,
    };
  }
};
