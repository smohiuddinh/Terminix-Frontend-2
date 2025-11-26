import React, { useState, useRef, useCallback, useEffect } from "react"
import { Bold, Underline, List } from "lucide-react"
import { memo } from 'react';

 function RichTextEditor({ placeholder = "Start typing...", value = "", onChange }) {
  const editorRef = useRef(null)
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    underline: false,
    bulletList: false,
  })

  // When `value` prop changes, update editor content
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const checkActiveFormats = useCallback(() => {
    if (!editorRef.current) return
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      underline: document.queryCommandState("underline"),
      bulletList: document.queryCommandState("insertUnorderedList"),
    })
  }, [])

  const handleFormat = (command) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    if (command === "insertUnorderedList") {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        document.execCommand("insertUnorderedList", false)
      }
    } else {
      document.execCommand(command, false)
    }
    setTimeout(() => {
      checkActiveFormats()
    }, 10)
  }

  const handleKeyUp = () => {
    checkActiveFormats()
  }
  const handleMouseUp = () => {
    checkActiveFormats()
  }
  const handleContentChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML)
    }
  }

  useEffect(() => {
    const editor = editorRef.current
    if (editor) {
      editor.addEventListener("keyup", handleKeyUp)
      editor.addEventListener("mouseup", handleMouseUp)
      return () => {
        editor.removeEventListener("keyup", handleKeyUp)
        editor.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [])

  return (
    <div className="max-w-full border rounded-md shadow-sm">
      <style>{`
        [contenteditable] ul {
          list-style-type: disc;
          margin-left: 20px;
          padding-left: 20px;
        }
        [contenteditable] li {
          margin: 4px 0;
        }
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
        }
      `}</style>

      {/* Toolbar */}
      <div className="border-b bg-gray-100 p-3 flex gap-2">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          aria-label="Bold"
          className={`h-8 w-8 flex items-center justify-center rounded ${
            activeFormats.bold ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("underline")}
          aria-label="Underline"
          className={`h-8 w-8 flex items-center justify-center rounded ${
            activeFormats.underline ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          <Underline className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("insertUnorderedList")}
          aria-label="Bullet List"
          className={`h-8 w-8 flex items-center justify-center rounded ${
            activeFormats.bulletList ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          <List className="h-4 w-4" />
        </button>
      </div>

      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none"
        style={{ lineHeight: "1.6", fontSize: "16px" }}
        suppressContentEditableWarning={true}
        onFocus={checkActiveFormats}
        onInput={handleContentChange}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default memo(RichTextEditor)
