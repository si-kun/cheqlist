import React from "react";
import ButtonIcon from "../ButtonIcon";
import { RiDeleteBin6Line } from "@/react-icon";
import { deleteTask } from "@/_server-actions/task/deleteTask";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { tasksAtom } from "@/atoms/taskAtom";

interface DeleteButtonProps {
  taskId: string;
}

const DeleteButton = ({ taskId }: DeleteButtonProps) => {
  const setTasks = useSetAtom(tasksAtom);

  const handleDeleteTask = async (taskId: string) => {
    const res = await deleteTask(taskId);
    if (res.success) {
      toast.success(res.message);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } else {
      toast.error(res.message);
    }
    if (res.error) {
      console.error(res.error);
    }
  };

  return (
    <ButtonIcon
      icon={<RiDeleteBin6Line />}
      onClick={() => handleDeleteTask(taskId)}
      hoverClass="hover:text-red-700"
    />
  );
};

export default DeleteButton;
