import {
  checklistsAtom,
  isMemoAtom,
  memoAtom,
  selectedItemAtom,
  taskAtom,
} from "@/atoms/taskAtom";
import { createEmptyMemo, createEmptyTask } from "@/lib/task/createEmptyTask";
import { useSetAtom } from "jotai";

export const useResetFormState = () => {
  const resetMemo = useSetAtom(memoAtom);
  const resetSelectedItem = useSetAtom(selectedItemAtom);
  const resetChecklists = useSetAtom(checklistsAtom);
  const resetTask = useSetAtom(taskAtom);
  const resetIsMemo = useSetAtom(isMemoAtom);

  return () => {
    resetMemo(() => createEmptyMemo()); // 初期化
    resetSelectedItem(() => ({ type: "task", id: "" }));
    resetChecklists([]);
    resetTask(() => createEmptyTask());
    resetIsMemo(false);
  };
};
