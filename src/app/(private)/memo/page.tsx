"use client";

import { getAllMemosActions } from "@/_server-actions/memo/getAllMemosActions";
import { Memo } from "@/type";
import React, { useEffect, useState } from "react";
import { CiEdit, RiDeleteBin6Line } from "@/react-icon";
import { deleteMemoActions } from "@/_server-actions/memo/deleteMemoActions";
import toast from "react-hot-toast";
import { detailMemoActions } from "@/_server-actions/memo/detailMemoActions";
import { useRouter } from "next/navigation";

const MemoPage = () => {
  const router = useRouter();

  const [memos, setMemos] = useState<Memo[]>([]);
  const [status, setStatus] = useState<
    "all" | "favorite" | "createdAt" | "updatedAt"
  >("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState<{ field: string; order: "asc" | "desc" }>({
    field: "createdAt",
    order: "desc",
  });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMemos = async () => {
      const result = await getAllMemosActions(status, page, limit, sort);
      if (result.success && result.data) {
        setMemos(result.data.memos);
        setTotalPages(result.data.totalPages);
      }
    };
    fetchMemos();
  }, [status, page, limit, sort]);

  const handleDeleteMemo = async (id: string) => {
    const result = await deleteMemoActions(id);
    if (result.success) {
      setMemos((prev) => prev.filter((memo) => memo.id !== id));
      toast.success(result.message);
    } else {
      toast.error(result.message);
      console.log(result.error);
    }
  };

  const handleDetailMemo = async (title: string) => {
    const result = await detailMemoActions(title);
    if (result.success) {
      console.log(result.data);
      router.push(`/memo/${result.data?.title}`);
    } else {
      toast.error(result.message);
      console.log(result.error);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [field, order] = value.split("-");
    setSort({ field, order: order as "asc" | "desc" });
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div className="bg-amber-100 w-full h-full rounded-lg p-4 overflow-hidden flex flex-col gap-3">
      <div className="flex justify-center items-center gap-4">
        <select className="p-2 rounded-md border-1 border-gray-300" onChange={handleSort}>
          <option value="all">全て</option>
          <option value="favorite">お気に入り</option>
          <option value="createdAt">作成日</option>
          <option value="updatedAt">更新日</option>
        </select>
        <div className="flex justify-center items-center gap-4">
          <span>
            {page} /{totalPages}
          </span>
          <div className="flex gap-2">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-4 gap-4">
        {memos?.map((memo) => (
          <li
            key={memo.id}
            className="bg-amber-200 shadow-md p-4 rounded-lg min-h-[200px] flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {memo.title.length > 10
                  ? memo.title.slice(0, 10) + "..."
                  : memo.title}
              </h3>
              <span className="text-sm text-gray-500">
                {memo.childMemos.length}件
              </span>
            </div>
            <p className="flex-1">
              {memo.content.length > 100
                ? memo.content.slice(0, 100) + "..."
                : memo.content}
            </p>
            <div className="mt-auto flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">
                  更新日:{memo.updatedAt?.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 items-center text-xl">
                <button
                  onClick={() => handleDetailMemo(memo.title)}
                  className="hover:text-blue-500 cursor-pointer"
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => handleDeleteMemo(memo.id)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoPage;
