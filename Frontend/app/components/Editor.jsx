"use client";

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Editor({ value, setValue }) {
  return (
    <div data-color-mode="light" style={{ marginTop: "8px" }}>
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        height={380}
        preview="live"  
        visibleDragbar={false}
        style={{
          borderRadius: 8,
          border: "1px solid #e2e8f0",
          fontSize: "0.95rem",
        }}
      />
    </div>
  );
}