"use client";

import TaskCard from "../Card/TaskCard";
import { useEffect, useState } from "react";
import { getTaskWithPagenation } from "@/_server-actions/task/getTaskWithPagenation";
import { TaskWithChecklists } from "@/type";
import { FcPrevious, FcNext } from "@/react-icon";

interface TaskPageContainerProps {
  status: "completed" | "incompleted" | "all" | "favorite";
}

const TaskPageContainer = ({ status }: TaskPageContainerProps) => {
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState<{ field: string; order: "desc" | "asc" }>({
    field: "createdAt",
    order: "desc",
  });
  const [tasks, setTasks] = useState<TaskWithChecklists[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTaskWithPagenation(status, pages, limit, sort);

      if (result && result.success) {
        setTasks(result.tasks ?? []);
        setTotalPages(result.totalPages ?? 0);
      } else {
        console.log(result.error);
      }
    };
    fetchTasks();
  }, [pages, limit, status, sort]);

  const handlePrev = () => {
    if (pages > 1 && pages <= totalPages) {
      setPages((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (pages < totalPages) {
      setPages((prev) => prev + 1);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [field, order] = value.split("-");
    setSort({ field, order: order as "asc" | "desc" });
  };

  return (
    <div className="bg-amber-100 w-full h-full rounded-lg p-4 overflow-hidden flex flex-col gap-3">
      <div className="mx-auto flex gap-4 items-center">
        <div>
          <button onClick={handlePrev}>
            <FcPrevious />
          </button>
          <span>
            {pages} / {totalPages}
          </span>
          <button onClick={handleNext}>
            <FcNext />
          </button>
        </div>
        <select
          className="focus: outline-none border-1 border-gray-300 rounded-md p-2"
          onChange={handleSort}
        >
          <option value="createdAt-desc">新しい順</option>
          <option value="createdAt-asc">古い順</option>
          <option value="startDate-desc">開始日</option>
          <option value="startDate-asc">終了日</option>
          <option value="isFavorite-desc">お気に入り</option>
        </select>
      </div>
      <ul className="grid grid-cols-2 gap-4">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskPageContainer;
