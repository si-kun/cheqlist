import { Task } from "@/type";
import React from "react";

interface TaskTitleInputProps {
  formTask: Task;
  setFormTask: React.Dispatch<React.SetStateAction<Task>>;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{
      type: "task" | "checklist";
      id: string;
    }>
  >;
}

const TaskTitleInput = ({
  formTask,
  setFormTask,
  setSelectedItem,
}: TaskTitleInputProps) => {
  return (
    <input
      className="w-full p-2 rounded-md border-2 border-gray-300"
      type="text"
      name="task"
      placeholder="タスクタイトルを入力"
      value={formTask.title}
      onChange={(e) => setFormTask({ ...formTask, title: e.target.value })}
      onClick={() => setSelectedItem({ type: "task", id: formTask.id })}
    />
  );
};

export default TaskTitleInput;
