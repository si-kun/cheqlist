"use client"

import TaskForm from "@/components/task/TaskForm";
import { useResetFormState } from "@/hooks/useResetFormState";
import { useEffect } from "react";

const AddTaskPage = () => {
  const resetFormState = useResetFormState();
  
  useEffect(() => {
    resetFormState();
  }, [resetFormState]);

  return <TaskForm />;
};

export default AddTaskPage;
