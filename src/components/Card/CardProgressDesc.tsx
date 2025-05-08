import React from "react";
import { TaskWithChecklists } from "@/type";
import ProgressBar from "../progressBar/ProgressBar";

interface CardProgressDescProps {
  task: TaskWithChecklists;
}

const CardProgressDesc = ({ task }: CardProgressDescProps) => {

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">
        {task.description && task.description.length > 25
          ? task.description?.slice(0, 25) + "..."
          : task.description || "タスクの詳細がありません"}
      </span>
      <ProgressBar task={task} />
    </div>
  );
};

export default CardProgressDesc;
