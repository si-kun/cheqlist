import { Memo, Task } from "@/type";
import { v4 as uuidv4 } from "uuid";

export const createEmptyTask = (): Task => ({
    id: uuidv4(),
    title: "",
    description: "",
    completed: false,
    startDate: new Date(),
    endDate: new Date(),
    isFavorite: false,
})

export const createEmptyMemo = (): Memo => ({
    id: uuidv4(),
    title: "",
    content: "",
    childMemos: [],
    userId: "",
})