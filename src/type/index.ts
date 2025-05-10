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
  order?: number | null;
}

export interface ChecklistUpdate extends Checklist {
  taskId: string;
}

export interface TaskWithChecklists extends Task {
  checklists: Checklist[];
  updatedAt: Date;
}

export interface Memo {
    id         : string;
    title      : string;
    content    : string;
    childMemos : ChildMemo[];
    userId     : string;
    updatedAt?  : Date;
}

export interface ChildMemo {
  id: string;
  title: string;
  content: string;
  order: number | null;
  memoId: string;
}
