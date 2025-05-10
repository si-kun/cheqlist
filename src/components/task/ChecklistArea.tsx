import React from "react";
import { Checklist, ChildMemo } from "@/type";
import { FiCheckSquare, MdOutlineSquare } from "@/react-icon";
import DeleteCheckButton from "../ui/button/DeleteCheckButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { checklistsAtom, deleteListIdsAtom, memoAtom } from "@/atoms/taskAtom";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useMemoForm } from "@/hooks/useMemoForm";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isEdit = pathname.includes("edit");
  const formMemo = useAtomValue(memoAtom);
  const [checklists, setChecklists] = useAtom(checklistsAtom);
  const deleteListIds = useSetAtom(deleteListIdsAtom);

  const { handleChangeChecklist, setSelectedItem, } = useTaskForm();
  const { setSelectedMemoItem, handleDeleteMemo } = useMemoForm();

  const handleDeleteChildMemo = (id: string) => {
    if (isMemo && isEdit) {
      handleDeleteMemo(id);
      deleteListIds((prev) => [...prev, id]);
    } else {
      handleDeleteMemo(id);
    }
  };

  const handleDeleteChecklist = (id: string) => {
    if(!isMemo && isEdit) {
      setChecklists((prev) => prev.filter((c) => c.id !== id))
      deleteListIds((prev) => [...prev, id])
    } else {
      setChecklists((prev) => prev.filter((c) => c.id !== id))
    }
  }

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
                ? () => handleDeleteChildMemo(list.id)
                : () => handleDeleteChecklist(list.id)
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ChecklistArea;
