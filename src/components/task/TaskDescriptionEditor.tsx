import { Checklist } from "@/type";
import React from "react";
import Editor from "../MarkdownEditor/Editor";

interface TaskDescriptionEditorProps {
  selectedItem: {
    type: "task" | "checklist";
    id: string;
  };
  checklists: Checklist[];
  getSelectedDescription: () => string;
  handleChangeDesc: (value: string) => void;
}

const TaskDescriptionEditor = ({
  selectedItem,
  checklists,
  getSelectedDescription,
  handleChangeDesc,
}: TaskDescriptionEditorProps) => {
  const handleEditorChange = (markdown: string) => {
    handleChangeDesc(markdown);
  };

  const description = getSelectedDescription();

  return (
    <div className="w-full h-full bg-amber-100 rounded-lg p-3">
      <div className="w-full text-xl font-bold text-center border-b-2 border-gray-300 border-dotted pb-2">
        {selectedItem.type === "task"
          ? `タスクの詳細`
          : `チェックリスト「${
              checklists.find((c) => c.id === selectedItem.id)?.title || ""
            }」の詳細`}
      </div>
      <Editor value={description} onChange={handleEditorChange} key={selectedItem.id} />
    </div>
  );
};

export default TaskDescriptionEditor;
