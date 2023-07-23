"use client";
import MyEditor from "../components/editor";
import MyButton from "../components/button";
import MyAlert from "../components/alert";
import Dragbar from "../components/dragbar";
import styles from "./page.module.scss";
import { useRef, useState } from "react";

export default function Home() {
  const editorContainerRef = useRef(null);
  const [leftMsg, setLeftMsg] = useState("");
  const [rightMsg, setRightMsg] = useState("");
  const leftEditorRef = useRef(null);
  const rightEditorRef = useRef(null);

  return (
    <div className="gap-2 mx-5 my-2">
      <div id="playground-container" className="flex">
        <div
          id="editor-container"
          ref={editorContainerRef}
          className="flex flex-col	shrink min-w-fit basis-9/12 relative gap-2"
        >
          <div id="editor-toolbar" className="flex relative justify-between	clear-both">
            <ul className="flex space-x-2 items-center">
              <li>
                <FormatButton editorRef={leftEditorRef}></FormatButton>
              </li>
              <li>
                <MinifyButton editorRef={leftEditorRef}></MinifyButton>
              </li>
              <li>
                <EscapeButton editorRef={leftEditorRef}></EscapeButton>
              </li>
              <li>
                <UnescapeButton editorRef={leftEditorRef}></UnescapeButton>
              </li>
              <li>
                <MyAlert message={leftMsg}></MyAlert>
              </li>
            </ul>
            <ul className="flex right">
              <li>
                <a id="sidebar-toggle" href="#">
                  ⇥
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.editor}>
            <MyEditor name="leftEditor" editorRef={leftEditorRef} setAlertMsg={setLeftMsg}></MyEditor>
          </div>
        </div>
        <Dragbar id="playground-dragbar" containerRef={editorContainerRef}></Dragbar>
        <div id="playground-sidecar" className="flex flex-col grow shrink min-w-fit gap-2">
          <ul className="flex space-x-2 items-center">
            <li>
              <MyButton>比较</MyButton>
            </li>
            <li>
              <MyAlert message={rightMsg}></MyAlert>
            </li>
          </ul>
          <div className={styles.editor}>
            <MyEditor name="rightEditor" editorRef={rightEditorRef} setAlertMsg={setRightMsg}></MyEditor>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormatButton({ editorRef }) {
  return <MyButton onClick={() => editorRef.current.format()}>格式化</MyButton>;
}

function MinifyButton({ editorRef }) {
  return <MyButton onClick={() => editorRef.current.minify()}>最小化</MyButton>;
}

function EscapeButton({ editorRef }) {
  return <MyButton onClick={() => editorRef.current.escape()}>转义</MyButton>;
}

function UnescapeButton({ editorRef }) {
  return <MyButton onClick={() => editorRef.current.unescape()}>去转义</MyButton>;
}