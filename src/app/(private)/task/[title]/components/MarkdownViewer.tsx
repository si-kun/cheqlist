import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";

const MarkdownViewer = ({ content }: { content?: string | null }) => {
  console.log("📦 content:", content);
  const components: Components = {
    code({
      className,
      children,
      ...props
    }: {
      className?: string;
      children?: ReactNode;
    }) {
      const match = /language-(\w+)/.exec(className || "");
      const copyToClipbord = async () => {
        const text =
          typeof children === "string"
            ? children
            : Array.isArray(children)
            ? children.map((c) => (typeof c === "string" ? c : "")).join("")
            : "";

        await navigator.clipboard.writeText(text);

        try {
          toast.success("コピーしました");
        } catch (error) {
          toast.error("コピーに失敗しました");
          console.error(error);
        }
      };

      const codeText =
        typeof children === "string"
          ? children
          : Array.isArray(children)
          ? children.map((c) => (typeof c === "string" ? c : "")).join("")
          : "";

      return (
        <div className="relative">
          <div className="flex justify-end">
            <button
              onClick={copyToClipbord}
              className="rounded-md bg-gray-100 px-2 py-1 mb-[-10px] text-sm text-gray-500 hover:bg-gray-200"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={match ? match[1] : "javascript"} // ← デフォルト"javascript"にしちゃう！
            style={materialLight}
            PreTag="div"
            {...props}
          >
            {codeText}
          </SyntaxHighlighter>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content ?? "詳細がありません"}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
