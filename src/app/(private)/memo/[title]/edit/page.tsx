import { detailMemoActions } from '@/_server-actions/memo/detailMemoActions'
import TaskForm from '@/components/task/TaskForm'
import React from 'react'

const EditMemoPage = async({params}: {params:Promise<{title:string}>}) => {
    const {title} = await params
    const decodedTitle = decodeURIComponent(title)
    const {success, data} = await detailMemoActions(decodedTitle)

    if(!success) {
        return <div>エラーが発生しました</div>
    }

    return <TaskForm initialMemo={data} />
}

export default EditMemoPage