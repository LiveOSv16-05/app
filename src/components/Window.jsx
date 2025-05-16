import React from "react";

export default function Window({ title, onClose, children, style }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 100,
        backgroundColor: "#111",
        border: "1px solid #444",
        borderRadius: 8,
        boxShadow: "0 0 10px #00f",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: 800,            // fixed width
        height: "100vh",       // fixed height relative to viewport
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          backgroundColor: "#222",
          padding: "4px 12px",
          borderBottom: "1px solid #444",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#0ff",
          fontFamily: "Courier New, monospace",
          fontSize: 14,
        }}
      >
        <span>{title}</span>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#f66",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
          }}
          title="Close window"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: 16,
          overflowY: "hidden",  // Allow vertical scrolling if needed
        }}
      >
        {children}
      </div>
    </div>
  );
}
