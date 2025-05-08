import { Task } from "@/type";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

interface TaskDatePickerProps {
  formTask: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  dateType: "startDate" | "endDate";
  isDateNull: boolean;
}

const TaskDatePicker = ({
  formTask,
  setTask,
  dateType,
  isDateNull,
}: TaskDatePickerProps) => {
  const formatDate = (date: Date | null) => {
    if (!date || !(date instanceof Date)) return "";

    // タイムゾーンオフセットを適用せず、ローカル時間のままフォーマット
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTask((prev) => ({
        ...prev,
        [dateType]: null,
      }));
    } else {
      const date = new Date(e.target.value);
      setTask((prev) => ({
        ...prev,
        [dateType]: date,
      }));
    }
  };

  return (
    <div
      className={`p-2 px-3 rounded-md border-2 border-gray-300 ${
        isDateNull ? "bg-gray-700/80" : ""
      }`}
    >
      <label htmlFor={dateType}>
        {dateType === "startDate" ? "開始日" : "終了日"}：
      </label>
      <input
        type="datetime-local"
        disabled={isDateNull}
        value={isDateNull ? "" : formatDate(formTask[dateType] ?? new Date())}
        className={`outline-none ${
          isDateNull ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onChange={(e) => {
          handleDateChange(e);
        }}
      />
    </div>
  );
};

export default TaskDatePicker;
