import React from "react";
import ChecklistArea from "./ChecklistArea";
import TaskDescriptionEditor from "./TaskDescriptionEditor";
import { RiMenuAddLine } from "@/react-icon";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useMemoForm } from "@/hooks/useMemoForm";

const TaskBodyForm = () => {
  const {
    selectedItem,
    handleAddChecklist,
    handleChangeDesc,
    getSelectedDescription,
  } = useTaskForm();

  const {isMemo,handleAddMemo,handleChangeMemo} = useMemoForm()

  return (
    <div className="flex gap-4 w-full h-full overflow-hidden">
      {/* Task CheckBoxList */}
      <div className="flex flex-col bg-amber-100 w-full h-full p-3 rounded-lg">
        {/* チェックリストを追加するボタン */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-green-500 p-2 rounded-md font-bold mb-2"
          onClick={isMemo ? handleAddMemo : handleAddChecklist}
        >
          {isMemo ? (
            <span>メモを追加する</span>
          ) : (
            <span>チェックリストを追加する</span>
          )}
          <RiMenuAddLine className="text-2xl" />
        </button>
        <ChecklistArea handleChangeMemo={handleChangeMemo} isMemo={isMemo} />
      </div>

      {/* メモ、コンテンツ */}
      <TaskDescriptionEditor
        selectedItem={selectedItem}
        getSelectedDescription={getSelectedDescription}
        handleChangeDesc={handleChangeDesc}
      />
    </div>
  );
};

export default TaskBodyForm;
