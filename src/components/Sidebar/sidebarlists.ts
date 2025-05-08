interface SidebarItem {
    id: string;
    name: string;
    href: string;
}

export const sidebarLists: SidebarItem[] = [
    {
        id: "home",
        name: "ホーム",
        href: "/",
    },
    {
        id: "add-task",
        name: "タスクを追加",
        href: "/add-task",
    },
    {
        id: "memo",
        name: "メモ",
        href: "/memo",
    },
    {
        id: "task-list",
        name: "タスク一覧",
        href: "/all-task",
    },
    {
        id: "incompleted-task",
        name: "未完了タスク",
        href: "/incompleted-task",
    },
    {
        id: "completed-task",
        name: "完了タスク",
        href: "/completed-task",
    },
    {
        id: "favorite-task",
        name: "お気に入り",
        href: "/favorite-task",
    },
    
]