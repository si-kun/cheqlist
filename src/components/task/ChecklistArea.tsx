import React from "react";
import { Checklist } from "@/type";
import { FiCheckSquare, MdOutlineSquare } from "@/react-icon";
import DeleteCheckButton from "../ui/button/DeleteCheckButton";

interface ChecklistAreaProps {
  checklists: Checklist[];
  handleChangeChecklist: <K extends keyof Checklist>(
    id: string,
    key: K,
    value: Checklist[K]
  ) => void;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{
      type: "task" | "checklist";
      id: string;
    }>
  >;
  handleDeleteChecklist: (id: string) => void;
}

const ChecklistArea = ({
  checklists,
  handleChangeChecklist,
  setSelectedItem,
  handleDeleteChecklist,
}: ChecklistAreaProps) => {
  return (
    <ul className="flex flex-col flex-1 h-full gap-4 overflow-y-auto">
      {checklists.map((list) => (
        <li key={list.id} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              handleChangeChecklist(list.id, "completed", !list.completed)
            }
            className="text-2xl"
          >
            {list.completed ? <FiCheckSquare /> : <MdOutlineSquare />}
          </button>
          <input
            type="text"
            value={list.title}
            name="title"
            onChange={(e) =>
              handleChangeChecklist(list.id, "title", e.target.value)
            }
            onClick={() => setSelectedItem({ type: "checklist", id: list.id })}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
          />

          {/* チェックリストを削除するボタン */}
          <DeleteCheckButton
            handleDeleteChecklist={handleDeleteChecklist}
            checklistId={list.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChecklistArea;
