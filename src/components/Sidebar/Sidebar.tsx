"use client";

import React from "react";
import { sidebarLists } from "./sidebarlists";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // 不要なコードブロックを削除（マッピング結果を使用していない）
  
  return (
    <nav className="w-[250px] h-full bg-gray-100 pt-10" aria-label="メインナビゲーション">
      <ul className="flex flex-col px-2">
        {sidebarLists.map((list) => {
          const isHome = list.href === "/";
          const isActive = isHome ? pathname === "/" : pathname.startsWith(list.href);
          
          return (
            <li
              key={list.id}
              className={`py-2 rounded-md transition-all duration-300 hover:bg-gray-200 hover:font-bold ${isActive ? "bg-gray-200 font-bold" : ""}`}
            >
              <Link href={list.href} className="w-full block text-center" aria-current={isActive ? "page" : undefined}>
                {list.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;