"use client";

import "react-datepicker/dist/react-datepicker.css";
import TaskHeaderForm from "./TaskHeaderForm";
import TaskBodyForm from "./TaskBodyForm";
import TaskSubmitButton from "./TaskSubmitButton";

const TaskForm = () => {
  return (
    <form className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* 上側 */}
      <TaskHeaderForm />

      {/* 下 */}
      <TaskBodyForm />
      <TaskSubmitButton />
    </form>
  );
};

export default TaskForm;
