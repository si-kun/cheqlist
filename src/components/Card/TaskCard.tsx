import React from "react";
import { TaskWithChecklists } from "@/type";
import CardHeader from "./CardHeader";
import CardProgressDesc from "./CardProgressDesc";
import CardFooter from "./CardFooter";

interface TaskCardProps {
  task: TaskWithChecklists;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <li
      key={task.id}
      className="bg-amber-200 p-4 rounded-md flex flex-col gap-3"
    >
      <CardHeader task={task} />
      <CardProgressDesc task={task} />
      <CardFooter task={task} />
    </li>
  );
};

export default TaskCard;
