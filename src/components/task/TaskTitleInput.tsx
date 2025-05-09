import { taskAtom } from "@/atoms/taskAtom";
import { useMemoForm } from "@/hooks/useMemoForm";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useAtom } from "jotai";
import React from "react";

const TaskTitleInput = () => {
  const [formTask, setFormTask] = useAtom(taskAtom);
  const { setSelectedItem } = useTaskForm();
  const { setFormMemo, formMemo, handleClickMemoTitle, isMemo } = useMemoForm();

  return (
    <input
      className="w-full p-2 rounded-md border-2 border-gray-300"
      type="text"
      name="task"
      placeholder={isMemo ? "メモタイトルを入力" : "タスクタイトルを入力"}
      value={isMemo ? formMemo.title : formTask.title}
      onChange={(e) =>
        isMemo
          ? setFormMemo({ ...formMemo, title: e.target.value })
          : setFormTask({ ...formTask, title: e.target.value })
      }
      onClick={
        isMemo
          ? handleClickMemoTitle
          : () => setSelectedItem({ type: "task", id: formTask.id })
      }
    />
  );
};

export default TaskTitleInput;
