"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { TaskWithChecklists } from "@/type";
import { useAtom } from "jotai";
import { tasksAtom } from "@/atoms/taskAtom";
import TaskCard from "@/components/Card/TaskCard";
import TabButton from "@/components/ui/button/TabButton";
import { getTaskForHomePage } from "@/_server-actions/task/getTaskForHomePage";
export default function Home() {
  const [tasks, setTasks] = useAtom<TaskWithChecklists[]>(tasksAtom);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTaskForHomePage();

      if (result && result.success) {
        setTasks(result.tasks ?? []);
      } else {
        console.log(result.error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, [setTasks]);

  const [selectedTab, setSelectedTab] = useState<"today" | "tomorrow" | "week">(
    "today"
  );

  const filteredTasks = tasks.filter((task) => {
    const today = new Date();
    const startDate = task.startDate ? new Date(task.startDate) : null;

    if (selectedTab === "today") {
      return startDate && startDate.toDateString() === today.toDateString();
    } else if (selectedTab === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return startDate && startDate.toDateString() === tomorrow.toDateString();
    } else if (selectedTab === "week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      return startDate && startDate >= startOfWeek && startDate <= endOfWeek;
    }
    return false;
  });

  return (
    <div className="w-full h-full flex gap-4 overflow-hidden ">
      {/* タスク表示エリア */}
      <div className="w-[40%] h-full flex flex-col bg-amber-100 rounded-md p-4 overflow-hidden">
        {/* タブ一覧 */}
        <div className="flex">
          <TabButton
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            label="今日のタスク"
            tab="today"
          />
          <TabButton
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            label="明日のタスク"
            tab="tomorrow"
          />
          <TabButton
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            label="今週のタスク"
            tab="week"
          />
        </div>
        <ul className="flex flex-col flex-1 gap-4 overflow-y-auto">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      </div>
      {/* カレンダーエリア */}
      <div className="w-[60%] h-full bg-blue-200 rounded-md p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={tasks.map((task) => ({
            title: task.title,
            start: task.startDate ?? undefined,
            end: task.endDate ?? undefined,
          }))}
        />
      </div>
    </div>
  );
}
