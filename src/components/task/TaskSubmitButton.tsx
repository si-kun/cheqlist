import { useMemoForm } from '@/hooks/useMemoForm';
import { useTaskForm } from '@/hooks/useTaskForm';
import React from 'react'



const TaskSubmitButton = () => {

  const { handleClickSubmit,} = useTaskForm();
  const { isMemo, handleClickMemoSubmit} = useMemoForm()
  
  return (
    <button
    onClick={isMemo ? handleClickMemoSubmit : handleClickSubmit}
    type="button"
    className="fixed bottom-15 right-15 bg-green-500 p-2 rounded-full font-bold"
  >
    {isMemo ? "メモを追加する" : "タスクを追加する"}
  </button>
  )
}

export default TaskSubmitButton