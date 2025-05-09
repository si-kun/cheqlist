'use server';

import { prisma } from "@/lib/prismaClient";
import { Checklist, Task } from "@/type";

export const submitTaskAction = async (task: Task, checklists: Checklist[]) => {
  const {
    title,
    description,
    completed,
    startDate,
    endDate,
    isFavorite,
  } = task;

  if (title === "") {
    return {
      success: false,
      message: "タスクのタイトルを入力してください",
    };
  }

  if (checklists.length === 0) {
    return {
      success: false,
      message: "チェックリストを入力してください",
    };
  }

  if (checklists.some((checklist) => checklist.title === "")) {
    return {
      success: false,
      message: "チェックリストのタイトルを入力してください",
    };
  }

  try {
    // まずユーザーを作成（存在しない場合）
    const user = await prisma.user.upsert({
      where: { id: "ReoNa" },
      update: {},
      create: { id: "ReoNa" }
    });

    const res = await prisma.task.create({
      data: {
        title: title,
        description: description ?? "",
        completed: completed,
        startDate: startDate,
        endDate: endDate,
        isFavorite: isFavorite,
        userId: user.id,
        checklists: {
          create: checklists.map((checklist,index) => ({
            title: checklist.title,
            description: checklist.description ?? "",
            completed: checklist.completed,
            order: index,
          })),
        },
      },
    });
    return {
      success: true,
      message: "タスクの作成に成功しました",
      task: res,
    };
  } catch (error) {
    return {
      success: false,
      message: "タスクの作成に失敗しました",
      error: error,
    };
  }
};
