"use server";

import { prisma } from "@/lib/prismaClient";

export const deleteMemoActions = async(id: string) => {
    try {
        const memo = await prisma.memo.delete({
            where: {
                id: id
            },
            include: {
                childMemos: true
            }
        })
        return {
            success: true,
            message: "メモを削除しました",
            data: memo
        }
    } catch(error) {
        return {
            success: false,
            message: "メモの削除に失敗しました",
            error: JSON.stringify(error)
        }
    }
}


