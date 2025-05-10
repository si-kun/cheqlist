import React from "react";
import { FaDeleteLeft } from "@/react-icon";

interface DeleteCheckButtonProps {
  onClick: () => void;
}

const DeleteCheckButton = ({ onClick}: DeleteCheckButtonProps) => {
  return (
    <button
      type="button"
      className="text-2xl cursor-pointer"
      onClick={() => onClick()}
    >
      <FaDeleteLeft />
    </button>
  );
};

export default DeleteCheckButton;
