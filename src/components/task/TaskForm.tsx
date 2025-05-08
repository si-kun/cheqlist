"use client";

import React, { useState } from "react";
import { Checklist, Task, TaskWithChecklists } from "@/type";
import { v4 as uuidv4 } from "uuid";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineCheckBox,
  MdOutlineSquare,
  RiMenuAddLine,
} from "@/react-icon";

import "react-datepicker/dist/react-datepicker.css";
import TaskTitleInput from "@/components/task/TaskTitleInput";
import TaskDatePicker from "@/components/task/TaskDatePicker";
import ChecklistArea from "@/components/task/ChecklistArea";
import TaskDescriptionEditor from "@/components/task/TaskDescriptionEditor";
import { submitTaskAction } from "@/_server-actions/task/submitTaskAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createEmptyTask } from "@/lib/task/createEmptyTask";
import { updateTask } from "@/_server-actions/task/updateTask";

interface TaskFormProps {
  initialTask?: TaskWithChecklists;
  isMemo?: boolean;
}

const TaskForm = ({ initialTask, isMemo = false }: TaskFormProps) => {
  const router = useRouter();

  const [formTask, setFormTask] = useState<Task>(
    initialTask ?? createEmptyTask()
  );
  const [checklists, setChecklists] = useState<Checklist[]>(
    initialTask?.checklists ?? []
  );

  // 削除されたチェックリストのIDを保存する配列
  const [deleteChecklists, setDeleteChecklists] = useState<string[]>([]);

  // trueなら日付をnullにする
  const [isDateNull, setIsDateNull] = useState(false);

  // 選択中のアイテム、テキストエリアに表示するアイテム
  const [selectedItem, setSelectedItem] = useState<{
    type: "task" | "checklist";
    id: string;
  }>({
    type: "task",
    id: formTask.id,
  });

  // 日付設定
  const handleDateNull = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDateNull((prev) => !prev);
  };

  //テキストエリアの内容を表示する関数
  const handleChangeDesc = (value: string) => {
    // 選択中のアイテムのtypeによって、taskかchecklistのdescriptionを更新
    if (selectedItem.type === "task") {
      setFormTask({ ...formTask, description: value });
    } else {
      // mapで展開して、selectedItem.idと同じidなら、descriptionを更新
      setChecklists((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, description: value } : item
        )
      );
    }
  };

  // useMemoを使わず、関数として定義する
  const getSelectedDescription = () => {
    if (selectedItem.type === "task") {
      return formTask.description ?? "";
    } else {
      const selectedChecklist = checklists.find(
        (item) => item.id === selectedItem.id
      );
      return selectedChecklist?.description ?? "";
    }
  };

  //チェックリスト追加の関数
  const handleAddChecklist = () => {
    // someでタイトルが空のものがあるかどうか確認
    if (checklists.some((item) => item.title === "")) {
      return;
    }
    setChecklists([
      ...checklists,
      {
        id: uuidv4(),
        title: "",
        description: "",
        completed: false,
      },
    ]);
  };

  // チェックリストの内容を更新する関数
  // extendsでkeyの型を指定
  const handleChangeChecklist = <K extends keyof Checklist>(
    id: string,
    key: K,
    // valueの型はChecklist[K]のみ入るようにする
    value: Checklist[K]
  ) => {
    // mapで展開して、編集したいidと同じidなら、編集したいkeyを更新
    // 引数で渡されたkeyを使って、編集したいkeyをvalueに更新
    setChecklists((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  // チェックリストを削除する関数
  const handleDeleteChecklist = (id: string) => {
    setDeleteChecklists((prev) => [...prev, id]);
    console.log("deleteChecklists", deleteChecklists);
    setChecklists((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFavorite = () => {
    setFormTask({ ...formTask, isFavorite: !formTask.isFavorite });
  };

  // タスク追加、更新関数
  const handleClickSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const lastChecklist = checklists[checklists.length - 1];
    let sendChecklists = checklists;

    if (lastChecklist && lastChecklist.title === "") {
      sendChecklists = checklists.slice(0, -1);
      setChecklists(sendChecklists);
    }

    if (checklists.every((item) => item.completed === true)) {
      formTask.completed = true;
    } else {
      formTask.completed = false;
    }

    console.log("タスクの内容", formTask);
    console.log("チェックリストの内容", checklists);

    if (initialTask) {
      const result = await updateTask(
        initialTask.id,
        formTask,
        sendChecklists,
        deleteChecklists
      );
      if (result.success) {
        toast.success(result.message);
        router.replace("/");
      } else {
        toast.error(result.message);
        console.error(result.error);
      }
    } else {
      const result = await submitTaskAction(formTask, checklists);
      if (result.success) {
        toast.success(result.message);
        router.replace("/");
      } else {
        toast.error(result.message);
        console.error(result.error);
      }
    }
  };

  return (
    <form className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* 上側 */}
      <div className="w-full flex items-center gap-4 justify-between">
        {/* Task Input */}
        <div className="flex items-center gap-1 w-full">
          <button type="button" className="text-2xl cursor-pointer" onClick={handleFavorite}>
            {formTask.isFavorite ? <MdFavorite className="text-red-500" /> : <MdFavoriteBorder />}
          </button>
          <TaskTitleInput
            formTask={formTask}
            setFormTask={setFormTask}
            setSelectedItem={setSelectedItem}
          />
        </div>

        {/* 日付 */}
        <div className="flex items-center gap-2 w-full">
          <button className="flex items-center gap-2" onClick={handleDateNull}>
            {isDateNull ? (
              <MdOutlineCheckBox className="text-2xl" />
            ) : (
              <MdOutlineSquare className="text-2xl" />
            )}
            日付を設定しない
          </button>
          <TaskDatePicker
            formTask={formTask}
            setTask={setFormTask}
            dateType="startDate"
            isDateNull={isDateNull}
          />
          <TaskDatePicker
            formTask={formTask}
            setTask={setFormTask}
            dateType="endDate"
            isDateNull={isDateNull}
          />
        </div>
      </div>

      {/* 下 */}
      <div className="flex gap-4 w-full h-full overflow-hidden">
        {/* Task CheckBoxList */}
        <div className="flex flex-col bg-amber-100 w-full h-full p-3 rounded-lg">
          {/* チェックリストを追加するボタン */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-green-500 p-2 rounded-md font-bold mb-2"
            onClick={handleAddChecklist}
          >
            <span>チェックリストを追加する</span>
            <RiMenuAddLine className="text-2xl" />
          </button>
          <ChecklistArea
            checklists={checklists}
            handleChangeChecklist={handleChangeChecklist}
            setSelectedItem={setSelectedItem}
            handleDeleteChecklist={handleDeleteChecklist}
          />
        </div>

        {/* メモ、コンテンツ */}
        <TaskDescriptionEditor
          selectedItem={selectedItem}
          checklists={checklists}
          getSelectedDescription={getSelectedDescription}
          handleChangeDesc={handleChangeDesc}
        />
      </div>
      <button
        onClick={handleClickSubmit}
        type="button"
        className="fixed bottom-15 right-15 bg-green-500 p-2 rounded-full font-bold"
      >
        タスクを追加する
      </button>
    </form>
  );
};

export default TaskForm;
