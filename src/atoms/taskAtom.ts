import { TaskWithChecklists } from "@/type";
import { atom } from "jotai";

export const tasksAtom = atom<TaskWithChecklists[]>([])

export const taskAtom = atom<TaskWithChecklists | null>(null)