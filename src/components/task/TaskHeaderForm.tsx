import React from "react";
import {
  MdOutlineSquare,
  MdOutlineCheckBox,
  MdFavorite,
  MdFavoriteBorder,
} from "@/react-icon";
import TaskTitleInput from "./TaskTitleInput";
import TaskDatePicker from "./TaskDatePicker";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useMemoForm } from "@/hooks/useMemoForm";
import { usePathname } from "next/navigation";

const TaskHeaderForm = () => {

  const pathname = usePathname()
  const isEdit = pathname.includes("edit")

  const { formTask } = useTaskForm();

  const { handleFavorite, handleDateNull, isDateNull} =
    useTaskForm();

    const {isMemo, setIsMemo} = useMemoForm()

  return (
    <div className="w-full flex items-center gap-4 justify-between">
      {/* Task Input */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center"
              onClick={() => setIsMemo(false)}
              disabled={isEdit}
          >
            {isMemo ? (
              <MdOutlineSquare className="text-2xl" />
            ) : (
              <MdOutlineCheckBox className="text-2xl" />
            )}
            チェックリスト
          </button>
            <button
              type="button"
              className={`flex items-center`}
            onClick={() => setIsMemo(true)}
            disabled={isEdit}
          >
            {isMemo ? (
              <MdOutlineCheckBox className="text-2xl" />
            ) : (
              <MdOutlineSquare className="text-2xl" />
            )}
            メモ
          </button>
        </div>
        <div className="flex items-center gap-1 w-full">
          <button
            type="button"
            className="text-2xl cursor-pointer"
            onClick={handleFavorite}
          >
            {formTask.isFavorite ? (
              <MdFavorite className="text-red-500" />
            ) : (
              <MdFavoriteBorder />
            )}
          </button>
          <TaskTitleInput isMemo={isMemo} />
        </div>
      </div>

      {/* 日付 */}
      {!isMemo ? (
        <div className="flex items-center gap-2 w-full">
          <button className="flex items-center gap-2" onClick={handleDateNull}>
          {isDateNull ? (
            <MdOutlineCheckBox className="text-2xl" />
          ) : (
            <MdOutlineSquare className="text-2xl" />
          )}
          日付を設定しない
        </button>
        <TaskDatePicker dateType="startDate" />
          <TaskDatePicker dateType="endDate" />
        </div>
      ) : null}
    </div>
  );
};

export default TaskHeaderForm;
