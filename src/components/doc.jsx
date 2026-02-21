import React, { useState, useEffect } from "react";
import mammoth from "mammoth";

export default function FigmaStyleComments() {
  const [docHtml, setDocHtml] = useState("");
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : {};
  });
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocHtml(result.value);
    }
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || !selection.toString().trim()) return;

    const range = selection.getRangeAt(0);
    const commentId = "c" + Date.now();

    // Create highlight span
    const span = document.createElement("span");
    span.style.backgroundColor = "#fff8b3";
    span.style.position = "relative";

    // Create icon
    const icon = document.createElement("span");
    icon.innerText = "💬";
    icon.setAttribute("data-id", commentId);
    icon.style.cursor = "pointer";
    icon.style.fontSize = "14px";
    icon.style.background = "#fff";
    icon.style.border = "1px solid #ccc";
    icon.style.borderRadius = "50%";
    icon.style.padding = "2px 4px";
    icon.style.marginLeft = "4px";
    icon.style.position = "relative";

    // Tooltip for hover
    icon.addEventListener("mouseenter", () => {
      if (comments[commentId]) {
        const tooltip = document.createElement("div");
        tooltip.innerText = comments[commentId];
        tooltip.style.position = "absolute";
        tooltip.style.top = "-30px";
        tooltip.style.left = "0px";
        tooltip.style.background = "#333";
        tooltip.style.color = "#fff";
        tooltip.style.padding = "4px 8px";
        tooltip.style.borderRadius = "4px";
        tooltip.style.fontSize = "12px";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.className = "comment-tooltip";
        icon.appendChild(tooltip);
      }
    });
    icon.addEventListener("mouseleave", () => {
      const tooltip = icon.querySelector(".comment-tooltip");
      if (tooltip) tooltip.remove();
    });

    // Icon click → open popover near icon
    icon.addEventListener("click", (e) => {
      const rect = e.target.getBoundingClientRect();
      setPopoverPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      setActiveCommentId(commentId);
    });

    span.appendChild(document.createTextNode(selection.toString()));
    span.appendChild(icon);

    range.deleteContents();
    range.insertNode(span);

    setDocHtml(document.querySelector(".doc-container").innerHTML);
    setComments((prev) => ({ ...prev, [commentId]: "" }));
    selection.removeAllRanges();
  };

  const saveComment = () => {
    setActiveCommentId(null);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <input type="file" accept=".docx" onChange={handleFileUpload} />

      <div
        className="doc-container"
        onMouseUp={handleMouseUp}
        dangerouslySetInnerHTML={{ __html: docHtml }}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          marginTop: "20px",
          lineHeight: "1.6",
          background: "#fff"
        }}
      />

      {activeCommentId && (
        <div
          style={{
            position: "absolute",
            top: popoverPos.top,
            left: popoverPos.left,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: "220px",
            zIndex: 1000
          }}
        >
          <textarea
            rows="3"
            style={{ width: "100%", fontSize: "14px" }}
            value={comments[activeCommentId] || ""}
            onChange={(e) =>
              setComments((prev) => ({ ...prev, [activeCommentId]: e.target.value }))
            }
            placeholder="Write your comment..."
          />
          <button
            style={{
              marginTop: "5px",
              background: "#007bff",
              color: "#fff",
              padding: "4px 8px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={saveComment}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
