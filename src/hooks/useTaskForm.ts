import { checklistsAtom, selectedItemAtom, taskAtom } from "@/atoms/taskAtom";
import { createEmptyTask } from "@/lib/task/createEmptyTask";
import { updateTask } from "@/_server-actions/task/updateTask";
import { submitTaskAction } from "@/_server-actions/task/submitTaskAction";
import { Checklist, TaskWithChecklists } from "@/type";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMemoForm } from "./useMemoForm";

export const useTaskForm = (initialTask?: TaskWithChecklists) => {
  const [formTask, setFormTask] = useAtom(taskAtom);
  const [checklists, setChecklists] = useAtom(checklistsAtom);
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);

  const {setIsMemo} = useMemoForm();

  const router = useRouter();

  useEffect(() => {
    if (initialTask) {
      setFormTask(initialTask);
      setChecklists(initialTask.checklists);
      setIsMemo(false);
    } else {
      setFormTask(createEmptyTask());
      setChecklists([]);
      setIsMemo(false);
    }
  }, [initialTask]);

  // 削除されたチェックリストのIDを保存する配列
  const [deleteChecklists, setDeleteChecklists] = useState<string[]>([]);

  // trueなら日付をnullにする
  const [isDateNull, setIsDateNull] = useState(false);

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

  return {
    formTask,
    setFormTask,
    checklists,
    selectedItem,
    isDateNull,
    handleDateNull,
    getSelectedDescription,
    handleChangeDesc,
    handleAddChecklist,
    handleChangeChecklist,
    handleDeleteChecklist,
    handleFavorite,
    handleClickSubmit,
    setSelectedItem,
  };
};
