import React from "react";
import Editor from "../MarkdownEditor/Editor";
import { useAtomValue } from "jotai";
import { checklistsAtom } from "@/atoms/taskAtom";
import { useMemoForm } from "@/hooks/useMemoForm";

interface TaskDescriptionEditorProps {
  selectedItem: {
    type: "task" | "checklist";
    id: string;
  };
  getSelectedDescription: () => string;
  handleChangeDesc: (value: string) => void;
}

const TaskDescriptionEditor = ({
  selectedItem,
  getSelectedDescription,
  handleChangeDesc,
}: TaskDescriptionEditorProps) => {
  const handleEditorChange = (markdown: string) => {
    handleChangeDesc(markdown);
  };

  const {
    isMemo,
    selectedMemoItem,
    formMemo,
    getSelectedMemoContent,
    handleChangeContent,
  } = useMemoForm();
  const description = getSelectedDescription();
  const content = getSelectedMemoContent();
  const checklists = useAtomValue(checklistsAtom);

  return (
    <div className="w-full h-full bg-amber-100 rounded-lg p-3">
      {isMemo ? (
        <div className="w-full text-xl font-bold text-center border-b-2 border-gray-300 border-dotted pb-2">
          {selectedMemoItem.type === "memo"
            ? `メモの詳細`
            : `「${
                formMemo.childMemos.find((m) => m.id === selectedMemoItem.id)
                  ?.title ?? "（無題）"
              }」の詳細`}
        </div>
      ) : (
        <div className="w-full text-xl font-bold text-center border-b-2 border-gray-300 border-dotted pb-2">
          {selectedItem.type === "task"
            ? `タスクの詳細`
            : `チェックリスト「${
                checklists.find((c) => c.id === selectedItem.id)?.title || ""
              }」の詳細`}
        </div>
      )}
      <Editor
        value={isMemo ? content : description}
        onChange={isMemo ? handleChangeContent : handleEditorChange}
        key={isMemo ? selectedMemoItem.id : selectedItem.id}
      />
    </div>
  );
};

export default TaskDescriptionEditor;
