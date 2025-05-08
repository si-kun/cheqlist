import { TaskWithChecklists } from "@/type";

export const getProgress = (task: TaskWithChecklists) => {
    const checklistsLength = task.checklists.length;
    if (checklistsLength === 0) return 0;

    const checkedLength = task.checklists.filter((c) => c.completed).length;
    return Math.round((checkedLength / checklistsLength) * 100);
  };