"use server"

import { prisma } from "@/lib/prismaClient"

export const getAllMemosActions = async () => {
    try {
        const memos = await prisma.memo.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                childMemos: true,
            }

        })
        return {
            success: true,
            message: "メモの取得に成功しました",
            data: memos,
        }
    } catch(error) {
        return {
            success: false,
            message: "メモの取得に失敗しました",
            error: error,
        }
    }
}