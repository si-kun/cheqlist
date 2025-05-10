import React from "react";
import { Checklist, ChildMemo } from "@/type";
import { FiCheckSquare, MdOutlineSquare } from "@/react-icon";
import DeleteCheckButton from "../ui/button/DeleteCheckButton";
import { useAtomValue } from "jotai";
import { checklistsAtom, memoAtom } from "@/atoms/taskAtom";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useMemoForm } from "@/hooks/useMemoForm";

// Checklistかどうかを判定する型ガード関数
function isChecklist(list: Checklist | ChildMemo): list is Checklist {
  return "completed" in list;
}

interface ChecklistAreaProps {
  handleChangeMemo: <K extends keyof ChildMemo>(
    id: string,
    key: K,
    value: ChildMemo[K]
  ) => void;

  isMemo?: boolean;
}

const ChecklistArea = ({
  handleChangeMemo,
  isMemo = false,
}: ChecklistAreaProps) => {
  const formMemo = useAtomValue(memoAtom);
  const checklists = useAtomValue(checklistsAtom);

  const { handleChangeChecklist, setSelectedItem, handleDeleteChecklist } =
    useTaskForm();
  const { setSelectedMemoItem, handleDeleteMemo } = useMemoForm();

  return (
    <ul className="flex flex-col flex-1 h-full gap-4 overflow-y-auto">
      {(isMemo ? formMemo.childMemos : checklists).map((list) => (
        <li key={list.id} className="flex items-center gap-2">
          {isMemo ? (
            <span className="font-bold">
              {list.order !== null && list.order !== undefined
                ? list.order + 1 + "."
                : ""}
            </span>
          ) : (
            isChecklist(list) && (
              <button
                type="button"
                onClick={() =>
                  handleChangeChecklist(list.id, "completed", !list.completed)
                }
                className="text-2xl"
              >
                {list.completed ? <FiCheckSquare /> : <MdOutlineSquare />}
              </button>
            )
          )}
          <input
            type="text"
            value={list.title}
            name="title"
            onChange={(e) =>
              isMemo
                ? handleChangeMemo(list.id, "title", e.target.value)
                : handleChangeChecklist(list.id, "title", e.target.value)
            }
            onClick={() =>
              isMemo
                ? setSelectedMemoItem({ type: "childMemo", id: list.id })
                : setSelectedItem({ type: "checklist", id: list.id })
            }
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
          />

          {/* チェックリストを削除するボタン */}
          <DeleteCheckButton
            onClick={
              isMemo
                ? () => handleDeleteMemo(list.id)
                : () => handleDeleteChecklist(list.id)
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ChecklistArea;
