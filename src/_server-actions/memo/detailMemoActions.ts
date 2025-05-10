"use server"

import { prisma } from "@/lib/prismaClient"

export const detailMemoActions = async(title: string) => {
    try {
        const memo = await prisma.memo.findFirst({
            where: {
                title: title
            },
            include: {
                childMemos: true
            }
        })
        return {
            success: true,
            message: "メモの取得に成功しました",
            data: memo
        }
    } catch(error) {
        return {
            success: false,
            message: "メモの取得に失敗しました",
            error: JSON.stringify(error)
        }
    }
}