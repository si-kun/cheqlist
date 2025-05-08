export interface Task {
    id    :      string;
    title       : string;
    description : string | null;
    completed   : boolean;
    startDate   : Date | null;
    endDate     : Date | null;
    isFavorite  : boolean;
}

export interface Checklist {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface ChecklistUpdate extends Checklist {
  taskId: string;
}

export interface TaskWithChecklists extends Task {
  checklists: Checklist[];
  updatedAt: Date;
}

