"use client"

import { Memo } from "@/type";
import React, { useState } from "react";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { CiEdit,} from "@/react-icon";
import DeleteButton from "@/components/ui/button/DeleteButton";
import { useRouter } from "next/navigation";
import MarkdownViewer from "@/app/(private)/task/[title]/components/MarkdownViewer";

interface DetailClientProps {
  memo: Memo;
}

const MemoDetail = ({ memo }: DetailClientProps) => {
  const router = useRouter();

  const [localMemo] = useState<Memo>(memo);
  const [selectedDesc, setSelectedDesc] = useState<"title" | string>("title");

  const handleClickSelectedDesc = (desc: "title" | string) => {
    setSelectedDesc(desc);
  };


  const handleClickEdit = () => {
    router.push(`/memo/${memo.title}/edit`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 overflow-hidden">
      {/* タスク上部 */}
      <div className="">
        <div className="flex items-center justify-between gap-2 bg-amber-100 rounded-md p-4">
          <div className="flex items-center gap-2">
            <h2
              className="text-2xl font-bold cursor-pointer"
              onClick={() => handleClickSelectedDesc("title")}
            >
              {memo.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <DeleteButton taskId={memo.id} />
            <ButtonIcon
              onClick={handleClickEdit}
              icon={<CiEdit />}
              hoverClass="hover:text-blue-500"
            />
          </div>
        </div>

      </div>

      {/* タスク下部 */}
      <div className="w-full h-full grid grid-cols-2 gap-10 overflow-hidden">
        <div className="bg-amber-100 rounded-md flex-1 p-4 relative">
          <ul className="flex flex-col gap-4">
            {localMemo.childMemos.map((childMemo) => (
              <li
                key={childMemo.id}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleClickSelectedDesc(childMemo.id)}
              >
                <span className="font-bold">{childMemo.order ? childMemo.order + 1 : 1}.</span>
                <p>{childMemo.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-100 rounded-md flex h-full flex-col flex-1 p-4 overflow-hidden">
          {selectedDesc === "title" ? (
            <div className="flex flex-col h-full gap-3">
              <p className="text-xl font-bold text-center">
                「{memo.title}」の詳細
              </p>
              <div className="overflow-y-auto flex-1">
                <MarkdownViewer content={memo.content ?? ""} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full gap-3">
              <p className="text-xl font-bold text-center">
                「
                {localMemo.childMemos.find((c) => c.id === selectedDesc)?.title}
                」 の詳細
              </p>
              <div className="overflow-y-auto flex-1">
                <MarkdownViewer
                  content={
                    localMemo.childMemos.find((c) => c.id === selectedDesc)
                      ?.content ?? ""
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

export default MemoDetail;
