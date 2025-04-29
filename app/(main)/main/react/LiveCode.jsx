"use client";

import React, { useState } from "react";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";
import sub from "../../../../styles/sub.module.css";

const customTheme = {
  plain: {
    color: "#111",
    backgroundColor: "#f5f2f0",
    fontFamily: "Pretendard",
    borderRadius: "8px",
    textShadow: "none",
    whiteSpace: "pre",
  },
  styles: [
    {
      types: ["keyword"],
      style: { color: "#07a", fontFamily: "Pretendard" },
    },
    {
      types: ["string", "char"],
      style: { color: "#220070" },
    },
  ],
};

export default function LiveCode({ initialCode, language }) {
  const [code, setCode] = useState(initialCode || null);

  return (
    <div className={sub.LiveCode}>

      <LiveProvider
        code={code}
        theme={customTheme}
        scope={{ React, useState: React.useState, useEffect: React.useEffect }}
        onChange={(newCode) => setCode(newCode)}
      >

        <LiveEditor
          value={code}
          onChange={(newCode) => setCode(newCode)}
          className={`${sub.LiveEditor} language-${language}`}
        />
        <LivePreview className={sub.LivePreview} />
      </LiveProvider>
    </div>
  );
}