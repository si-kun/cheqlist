import React from "react";
import { FaDeleteLeft } from "@/react-icon";

interface DeleteCheckButtonProps {
  handleDeleteChecklist: (id: string) => void;
  checklistId: string;
}

const DeleteCheckButton = ({ handleDeleteChecklist, checklistId, }: DeleteCheckButtonProps) => {
  return (
    <button
      type="button"
      className="text-2xl cursor-pointer"
      onClick={() => handleDeleteChecklist(checklistId)}
    >
      <FaDeleteLeft />
    </button>
  );
};

export default DeleteCheckButton;
