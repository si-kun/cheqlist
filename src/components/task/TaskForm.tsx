"use client";

import "react-datepicker/dist/react-datepicker.css";
import TaskHeaderForm from "./TaskHeaderForm";
import TaskBodyForm from "./TaskBodyForm";
import TaskSubmitButton from "./TaskSubmitButton";
import { Memo, TaskWithChecklists } from "@/type";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useMemoForm } from "@/hooks/useMemoForm";
import { usePathname } from "next/navigation";
interface TaskFormProps {
  initialTask?: TaskWithChecklists;
  initialMemo?: Memo | null;
}

const TaskForm = ({ initialTask, initialMemo }: TaskFormProps) => {

  const pathname = usePathname();
  const isEdit = pathname.includes("edit");

  useTaskForm(initialTask);
  useMemoForm(initialMemo ?? undefined);

  if (!initialTask && !initialMemo && isEdit) return null;

  return (
    <form className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* 上側 */}
      <TaskHeaderForm />

      {/* 下 */}
      <TaskBodyForm />
      <TaskSubmitButton />
    </form>
  );
};

export default TaskForm;
