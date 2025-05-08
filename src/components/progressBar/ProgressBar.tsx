import React from "react";
import { getProgress } from "./getProgress";
import { TaskWithChecklists } from "@/type";

interface ProgressBarProps {
  task: TaskWithChecklists;
}

const ProgressBar = ({ task }: ProgressBarProps) => {
  const progress = getProgress(task);

  return (
    <div className="w-full h-[5px] bg-gray-500 rounded-full relative">
      <div
        style={{ width: `${progress}%` }}
        className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 rounded-full flex items-center justify-center"
      >
        {progress > 0 && <p className="text-xs text-white">{progress}%</p>}
      </div>
    </div>
  );
};

export default ProgressBar;
