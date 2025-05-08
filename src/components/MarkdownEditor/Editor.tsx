"use client";

import React, { useEffect, useState } from "react";
import {
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  InsertCodeBlock,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface EditorProps {
  value: string;
  onChange: (markdown: string, initialMarkdownNormalize?: boolean) => void;
}

const plugins = [
  headingsPlugin(),
  listsPlugin(),
  markdownShortcutPlugin(),
  codeBlockPlugin({
    defaultCodeBlockLanguage: "js",
  }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "javascript",
      jsx: "javascript JSX",
      ts: "typescript",
      tsx: "typescript JSX",
      css: "css",
      html: "html",
      json: "json",
    },
  }),
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <BoldItalicUnderlineToggles />
          </div>
          <div className="flex gap-1">
            <ListsToggle />
          </div>
          <InsertCodeBlock />
        </div>
      </>
    ),
  }),
];

const Editor = ({ value, onChange }: EditorProps) => {

    const [markdownValue, setMarkdownValue] = useState(value);

    useEffect(() => {
        setMarkdownValue(value);
    }, [value]);

  return (
    <MDXEditor
      markdown={markdownValue}
      onChange={(markdown) => {
        setMarkdownValue(markdown);
        onChange(markdown);
      }}
      plugins={plugins}
      contentEditableClassName="prose max-w-none focus:outline-none"
      className="h-full"
      placeholder="ここにテキストを入力してください"
    />
  );
};

export default Editor;
