"use client";

import { TaskWithChecklists } from "@/type";
import React, { useState } from "react";
import ProgressBar from "@/components/progressBar/ProgressBar";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { CiEdit, FiCheckSquare, MdOutlineSquare, MdFavorite, MdFavoriteBorder } from "@/react-icon";
import DeleteButton from "@/components/ui/button/DeleteButton";
import { favoriteWithChecklistUpdate } from "@/_server-actions/task/checklistUpdate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MarkdownViewer from "./MarkdownViewer";

interface DetailClientProps {
  task: TaskWithChecklists;
}

const DetailClient = ({ task }: DetailClientProps) => {
  const router = useRouter();

  const [localTask, setLocalTask] = useState<TaskWithChecklists>(task);
  const [selectedDesc, setSelectedDesc] = useState<"title" | string>("title");

  const handleClickSelectedDesc = (desc: "title" | string) => {
    setSelectedDesc(desc);
  };

  const handleIsCompletedTask = (id: string) => {
    const updatedChecklist = localTask.checklists.map((checklist) => ({
      ...checklist,
      completed:
        checklist.id === id ? !checklist.completed : checklist.completed,
    }));
    setLocalTask({
      ...localTask,
      checklists: updatedChecklist,
    });
    console.log("押された");
  };

  const handleFavorite = () => {
    setLocalTask({...localTask, isFavorite: !localTask.isFavorite});
  }

  const handleUpdateChecklist = async () => {
    const res = await favoriteWithChecklistUpdate(localTask.checklists, localTask.id, localTask.isFavorite);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
      router.replace("/");
    } else {
      toast.error(res.message);
    }
  };

  const handleClickEdit = () => {
    router.push(`/task/${task.title}/edit`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 overflow-hidden">
      {/* タスク上部 */}
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="flex items-center justify-between gap-2 bg-amber-100 rounded-md p-4">
          <div className="flex items-center gap-2">
            <button type="button" className="text-2xl cursor-pointer" onClick={handleFavorite}>
              {localTask.isFavorite ? (
                <MdFavorite className="text-red-500" />
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
            <h2
              className="text-2xl font-bold cursor-pointer"
              onClick={() => handleClickSelectedDesc("title")}
            >
              {task.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <DeleteButton taskId={task.id} />
            <ButtonIcon
              onClick={handleClickEdit}
              icon={<CiEdit />}
              hoverClass="hover:text-blue-500"
            />
          </div>
        </div>

        <div className="bg-amber-100 rounded-md p-4 h-full flex items-center justify-center">
          {task.startDate && task.endDate ? (
            <p className="font-bold">
              期限:
              {task.startDate.toLocaleString()}～{task.endDate.toLocaleString()}
            </p>
          ) : (
            <p>期限なし</p>
          )}
        </div>
      </div>

      {/* タスク下部 */}
      <div className="w-full h-full grid grid-cols-2 gap-10 overflow-hidden">
        <div className="bg-amber-100 rounded-md flex-1 p-4 relative">
          <ul className="flex flex-col gap-4">
            <ProgressBar task={localTask} />
            {localTask.checklists.map((checklist) => (
              <li
                key={checklist.id}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleClickSelectedDesc(checklist.id)}
              >
                {checklist.completed ? (
                  <ButtonIcon
                    icon={<FiCheckSquare />}
                    onClick={() => handleIsCompletedTask(checklist.id)}
                  />
                ) : (
                  <ButtonIcon
                    icon={<MdOutlineSquare />}
                    onClick={() => handleIsCompletedTask(checklist.id)}
                  />
                )}
                <p>{checklist.title}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="absolute bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300"
            onClick={handleUpdateChecklist}
          >
            チェックリストの更新
          </button>
        </div>

        <div className="bg-amber-100 rounded-md flex h-full flex-col flex-1 p-4 overflow-hidden">
          {selectedDesc === "title" ? (
            <div className="flex flex-col h-full gap-3">
              <p className="text-xl font-bold text-center">
                「{task.title}」の詳細
              </p>
              <div className="overflow-y-auto flex-1">
                <MarkdownViewer content={task.description ?? ""} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full gap-3">
              <p className="text-xl font-bold text-center">
                「
                {localTask.checklists.find((c) => c.id === selectedDesc)?.title}
                」 の詳細
              </p>
              <div className="overflow-y-auto flex-1">
                <MarkdownViewer
                  content={
                    localTask.checklists.find((c) => c.id === selectedDesc)
                      ?.description ?? ""
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailClient;
