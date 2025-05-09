import { isMemoAtom, memoAtom, selectedMemoItemAtom } from "@/atoms/taskAtom";
import { useAtom } from "jotai";
import { useEffect} from "react";
import { createEmptyMemo } from "@/lib/task/createEmptyTask";
import { ChildMemo, Memo } from "@/type";
import { v4 as uuidv4 } from "uuid";
import { submitMemoAction } from "@/_server-actions/task/submitMemoAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useMemoForm = (initialMemo?: Memo) => {
  const router = useRouter();
  const [formMemo, setFormMemo] = useAtom(memoAtom);
  const [isMemo, setIsMemo] = useAtom(isMemoAtom);
  const [selectedMemoItem, setSelectedMemoItem] = useAtom(selectedMemoItemAtom)

  const handleClickMemoTitle = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedMemoItem({ type: "memo", id: formMemo.id });
  };

  const handleChangeContent = (content: string) => {
    if (selectedMemoItem.type === "memo") {
      setFormMemo({ ...formMemo, content });
    } else {
      setFormMemo({
        ...formMemo,
        childMemos: formMemo.childMemos.map((m) =>
          m.id === selectedMemoItem.id ? { ...m, content } : m
        ),
      });
    }
  };

  useEffect(() => {
    if (initialMemo) {
      setFormMemo(initialMemo);
    } else {
      setFormMemo(createEmptyMemo());
    }
  }, [initialMemo, setFormMemo]);

  // メモ追加の関数
  const handleAddMemo = () => {
    if (formMemo.childMemos.some((item) => item.title === "")) {
      return;
    }

    setFormMemo({
      ...formMemo,
      childMemos: [
        ...formMemo.childMemos,
        {
          id: uuidv4(),
          title: "",
          content: "",
          order: formMemo.childMemos.length,
          memoId: formMemo.id,
        },
      ],
    });
  };

  const getSelectedMemoContent = () => {
    if (selectedMemoItem.type === "memo") {
      return formMemo.content;
    } else {
      return (
        formMemo.childMemos.find((m) => m.id === selectedMemoItem.id)
          ?.content || ""
      );
    }
  };

  // メモの内容を更新する関数
  const handleChangeMemo = <K extends keyof ChildMemo>(
    id: string,
    key: K,
    value: ChildMemo[K]
  ) => {
    setFormMemo((prev) => {
      if (!prev) return createEmptyMemo();
      return {
        ...prev,
        childMemos: prev.childMemos.map((item) =>
          item.id === id ? { ...item, [key]: value } : item
        ),
      };
    });
  };

  const handleClickMemoSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const lastChildMemo = formMemo.childMemos[formMemo.childMemos.length - 1];
    let sendChildMemos = formMemo.childMemos;

    if (lastChildMemo && lastChildMemo.title === "") {
      sendChildMemos = formMemo.childMemos.slice(0, -1);
      setFormMemo({ ...formMemo, childMemos: sendChildMemos });
    }

    try {
      const result = await submitMemoAction(formMemo);

      if (result.success) {
        toast.success(result.message);
        router.replace("/");
        setIsMemo(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("メモの作成に失敗しました");
    }
  };

  return {
    formMemo,
    setFormMemo,
    isMemo,
    setIsMemo,
    handleAddMemo,
    handleChangeMemo,
    handleClickMemoSubmit,
    handleClickMemoTitle,
    selectedMemoItem,
    setSelectedMemoItem,
    getSelectedMemoContent,
    handleChangeContent,
  };
};
