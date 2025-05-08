import React from "react";

interface TabButtonProps {
  selectedTab: "today" | "tomorrow" | "week";
  setSelectedTab: (tab: "today" | "tomorrow" | "week") => void;
  label: "今日のタスク" | "明日のタスク" | "今週のタスク";
  tab: "today" | "tomorrow" | "week";
}

const TabButton = ({ selectedTab, setSelectedTab, label, tab }: TabButtonProps) => {
  return (
    <button
      className={`bg-gray-200 rounded-t-md p-2 cursor-pointer ${
        selectedTab === tab ? "bg-white text-black font-bold" : ""
      }`}
      onClick={() => setSelectedTab(tab)}
    >
      {label}
    </button>
  );
};

export default TabButton;
