import { detailTask } from '@/_server-actions/task/detailTask'
import TaskForm from '@/components/task/TaskForm'
import React from 'react'

const EditPage = async({params}:{params:Promise<{title:string}>}) => {
    const {title} = await params
    const decodedTitle = decodeURIComponent(title)
    const {success, task} = await detailTask(decodedTitle)

    if(!success) {
        return <div>エラーが発生しました</div>
    }

    if(!task) {
        return <div>タスクが見つかりません</div>
    }

  return (
    <TaskForm initialTask={task} />
  )
}

export default EditPage