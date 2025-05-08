import React from 'react'
import { TaskWithChecklists } from '@/type'

interface CardFooterProps {
  task: TaskWithChecklists;
}

const CardFooter = ({ task }: CardFooterProps) => {
  return (
    <div className="flex items-center justify-between">
    {task.startDate && task.endDate ? (
      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-500">
          開始日:{task.startDate.toLocaleDateString()}
        </span>
        <span className="text-sm text-gray-500">
          終了日:{task.endDate.toLocaleDateString()}
        </span>
      </div>
    ) : (
      <span className="text-sm text-gray-500">日付が未設定</span>
    )}
    <span className="text-sm text-gray-500">
      最終更新日:{task.updatedAt.toLocaleDateString()}
    </span>
  </div>
  )
}

export default CardFooter