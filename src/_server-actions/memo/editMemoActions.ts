"use server";

import { prisma } from "@/lib/prismaClient";
import { Memo } from "@/type";

export const editMemoActions = async (memo: Memo, deleteChildMemoIds: string[]) => {
  try {

    const deleteIds = deleteChildMemoIds ?? []

    if(deleteIds.length > 0) {

        await prisma.childMemo.deleteMany({
            where: {
                id: {
                    in: deleteIds
                }
            }
        })
    }


    const result = await prisma.memo.update({
      where: {
        id: memo.id,
      },
      data: {
        title: memo.title,
        content: memo.content,
        childMemos: {
          upsert: memo.childMemos.map((child,index) =>
            child.id
              ? {
                  where: {
                    id: child.id,
                  },
                  update: {
                    title: child.title,
                    content: child.content,
                    order: index,
                  },
                  create: {
                    title: child.title,
                    content: child.content,
                    order: index,
                  },
                }
              : {
                    where: {
                        id: crypto.randomUUID()
                    },
                    update: {},
                    create: {
                        title: child.title,
                        content: child.content,
                        order: index,
                    },
                }
          ),
        },
      },
    });

    return {
      success: true,
      message: "メモの更新に成功しました",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "メモの更新に失敗しました",
      error: JSON.stringify(error),
    };
  }
};
