import { createEmptyMemo, createEmptyTask } from "@/lib/task/createEmptyTask";
import { Checklist, Memo, Task, TaskWithChecklists } from "@/type";
import { atom } from "jotai";

// export const tasksAtom = atom<TaskWithChecklists[]>([])

export const tasksAtom = atom<TaskWithChecklists[]>([])

export const taskAtom = atom<Task>(createEmptyTask())
export const checklistsAtom = atom<Checklist[]>([])
export const selectedItemAtom = atom<{type: "task" | "checklist", id: string}>({type: "task", id: ""})

export const memoAtom = atom<Memo>(createEmptyMemo())
export const isMemoAtom = atom<boolean>(false)
export const selectedMemoItemAtom = atom<{type: "memo" | "childMemo", id: string}>({type: "memo", id: ""})

export const deleteListIdsAtom = atom<string[]>([])
