import { editMemoActions } from "@/_server-actions/memo/editMemoActions";
import { updateTask } from "@/_server-actions/task/updateTask";
import { checklistsAtom, deleteListIdsAtom, memoAtom, taskAtom } from "@/atoms/taskAtom";
import { useMemoForm } from "@/hooks/useMemoForm";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const TaskSubmitButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isEdit = pathname.includes("edit");

  const deleteListIds = useAtomValue(deleteListIdsAtom)
  const memo = useAtomValue(memoAtom)
  const task = useAtomValue(taskAtom)
  const checklists = useAtomValue(checklistsAtom)
  const { handleClickSubmit } = useTaskForm();
  const { isMemo, handleClickMemoSubmit } = useMemoForm();

  const updateSubmit = () => {
    if(isMemo && isEdit) {
      editMemoActions(memo,deleteListIds)
      toast.success("メモを更新しました")
      router.replace("/")
    } else if (isEdit && !isMemo) {
      updateTask( task, checklists, deleteListIds)
      toast.success("タスクを更新しました")
      router.replace("/")
    }

  }

  return (
    <button
      onClick={isEdit ? updateSubmit : isMemo ? handleClickMemoSubmit : handleClickSubmit}
      type="button"
      className="fixed bottom-15 right-15 bg-green-500 p-2 rounded-full font-bold"
    >
      {isEdit ? "更新する" : isMemo ? "メモを追加する" : "タスクを追加する"}
    </button>
  );
};

export default TaskSubmitButton;
