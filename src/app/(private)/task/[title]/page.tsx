import { detailTask } from "@/_server-actions/task/detailTask";
import DetailClient from "./components/DetailClient";

const DetailPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
}) => {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const { success, task } = await detailTask(decodedTitle);

  if (!success) {
    return <div>エラーが発生しました</div>;
  }

  if (!task) {
    return <div>タスクが見つかりません</div>;
  }

  console.log("Task object:", task);

  return <DetailClient task={task} />;
};

export default DetailPage;
