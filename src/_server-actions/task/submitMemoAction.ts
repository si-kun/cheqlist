"use server";

import { prisma } from "@/lib/prismaClient";
import { Memo } from "@/type";

export const submitMemoAction = async (memo: Memo) => {

    const {title,content,} = memo;

    if (title === "") {
        return {
            success: false,
            message: "メモのタイトルを入力してください"
        }
    }

    if (content === "") {
        return {
            success: false,
            message: "メモの内容を入力してください"
        }
    }



    try {
        const user = await prisma.user.upsert({
            where: {id: "ReoNa"},
            update: {},
            create: {id: "ReoNa"}
        })

        const res = await prisma.memo.create({
            data: {
                title,
                content,
                childMemos: {
                    create: memo.childMemos.map((childMemo,index) => ({
                        title: childMemo.title,
                        content: childMemo.content,
                        order: index,
                    }))
                },
                userId: user.id,
            },
            include: {
                childMemos: true,
            }
        })

        return {
            success: true,
            message: "メモの作成に成功しました",
            memo: res
        }
    } catch(error) {
        console.log(error);
        return {
            success: false,
            message: "メモの作成に失敗しました"
        }
    }
}