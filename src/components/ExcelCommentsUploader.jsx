import React, { useState, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function ExcelCommentsUploader() {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({});
  const [hoverCell, setHoverCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [commentText, setCommentText] = useState("");
  const tableRef = useRef(null);

  // 1. Upload file to backend
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      console.log("File URL:", res.data.url);
      fetchExcelFromUrl(res.data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // 2. Fetch Excel from given URL
  const fetchExcelFromUrl = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    setData(jsonData);
  };

  const saveComment = () => {
    if (!editingCell) return;
    const key = `${editingCell.row}-${editingCell.col}`;
    setComments({ ...comments, [key]: commentText });
    setEditingCell(null);
    setCommentText("");
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
      {data.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table ref={tableRef} border="1" style={{ borderCollapse: "collapse" }}>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    return (
                      <td
                        key={colIndex}
                        style={{
                          position: "relative",
                          padding: "8px",
                          minWidth: "80px",
                        }}
                        onMouseEnter={() =>
                          setHoverCell({ row: rowIndex, col: colIndex })
                        }
                        onMouseLeave={() => setHoverCell(null)}
                      >
                        {cell}

                        {/* Hover comment icon */}
                        {hoverCell &&
                          hoverCell.row === rowIndex &&
                          hoverCell.col === colIndex && (
                            <span
                              onClick={() => {
                                setEditingCell({ row: rowIndex, col: colIndex });
                                setCommentText(comments[key] || "");
                              }}
                              style={{
                                position: "absolute",
                                top: 2,
                                right: 2,
                                cursor: "pointer",
                                background: "#ffeb3b",
                                borderRadius: "50%",
                                padding: "2px 4px",
                                fontSize: "12px",
                              }}
                            >
                              💬
                            </span>
                          )}

                        {/* Small dot if comment exists */}
                        {comments[key] && (
                          <span
                            title={comments[key]}
                            style={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              background: "orange",
                              borderRadius: "50%",
                              width: "8px",
                              height: "8px",
                            }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inline comment box */}
      {editingCell && (
        <div
          style={{
            position: "absolute",
            top:
              tableRef.current?.querySelectorAll("tr")[
                editingCell.row
              ]?.children[editingCell.col]?.getBoundingClientRect().top -
              tableRef.current?.getBoundingClientRect().top +
              30,
            left:
              tableRef.current?.querySelectorAll("tr")[
                editingCell.row
              ]?.children[editingCell.col]?.getBoundingClientRect().left -
              tableRef.current?.getBoundingClientRect().left,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "6px",
            borderRadius: "4px",
            zIndex: 100,
            width: "200px",
          }}
        >
          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ width: "100%" }}
          />
          <div style={{ marginTop: "4px", textAlign: "right" }}>
            <button onClick={saveComment}>Save</button>
            <button
              onClick={() => {
                setEditingCell(null);
                setCommentText("");
              }}
              style={{ marginLeft: "4px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
