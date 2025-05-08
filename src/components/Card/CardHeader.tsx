import React from "react";
import { TaskWithChecklists } from "@/type";
import ButtonIcon from "../ui/ButtonIcon";
import { GoChecklist, MdFavorite, MdFavoriteBorder } from "@/react-icon";
import { useRouter } from "next/navigation";
import DeleteButton from "../ui/button/DeleteButton";

interface CardHeaderProps {
  task: TaskWithChecklists;
}

const CardHeader = ({ task }: CardHeaderProps) => {
  const router = useRouter();

  const handleDetailTask = async () => {
    router.push(`task/${task.title}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
      <span className="text-xl">
        {task.isFavorite ? (
          <MdFavorite className="text-red-500" />
        ) : (
          <MdFavoriteBorder />
        )}
      </span>
      <h2 className="text-lg font-bold">{task.title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <ButtonIcon
          icon={<GoChecklist />}
          hoverClass="hover:text-green-500"
          onClick={handleDetailTask}
        />
        <DeleteButton taskId={task.id} />
      </div>
    </div>
  );
};

export default CardHeader;
