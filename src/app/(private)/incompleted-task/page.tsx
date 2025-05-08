import TaskPageContainer from "@/components/taskPage/TaskPageContainer";
import React from "react";

const IncompletedTaskPage = () => {
  return (
    <>
      <TaskPageContainer status="incompleted" />
    </>
  );
};

export default IncompletedTaskPage;
