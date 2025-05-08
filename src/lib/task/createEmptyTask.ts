import { Task } from "@/type";
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