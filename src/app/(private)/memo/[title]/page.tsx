import { detailMemoActions } from "@/_server-actions/memo/detailMemoActions";
import MemoDetail from "@/components/detail/MemoDetail";

const DetailMemoPage = async({params}: {params:Promise<{title:string}>}) => {
    const {title} = await params
    const decodedTitle = decodeURIComponent(title)
    const {success, data} = await detailMemoActions(decodedTitle)

    if(!success) {
        return <div>エラーが発生しました</div>
    }

    if(!data) {
        return <div>メモが見つかりません</div>
    }

  return <MemoDetail memo={data} />;
};

export default DetailMemoPage;
