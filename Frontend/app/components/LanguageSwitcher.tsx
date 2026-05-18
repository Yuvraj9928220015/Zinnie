"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../lib/useTranslate";

const API_BASE_URL = "https://api.zinniezeera.com";

interface Lang { code: string; name: string; }

// Navbar mein add karo: <LanguageSwitcher />
export default function LanguageSwitcher() {
  const { language, languageName, setLanguage, isLoading } = useLanguage();
  const [langs, setLangs] = useState<Lang[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/translate/languages`)
      .then((r) => r.json())
      .then((d) => d.success && setLangs(d.languages))
      .catch(console.error);
  }, []);

  // Outside click se close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (lang: Lang) => {
    setOpen(false);
    setLanguage(lang.code, lang.name);
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((p) => !p)}
        disabled={isLoading}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 13px", border: "1px solid #d0d0d0",
          borderRadius: 8, background: "#fff", cursor: isLoading ? "wait" : "pointer",
          fontSize: 14, fontWeight: 500, color: "#333",
        }}
      >
        <span>🌍</span>
        <span>{isLoading ? "Detecting..." : languageName}</span>
        <span style={{ fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "110%", right: 0,
          background: "#fff", border: "1px solid #e0e0e0",
          borderRadius: 10, boxShadow: "0 8px 28px rgba(0,0,0,0.11)",
          zIndex: 9999, minWidth: 175, maxHeight: 280,
          overflowY: "auto", padding: "5px 0",
        }}>
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => pick(l)}
              style={{
                display: "block", width: "100%", padding: "9px 15px",
                textAlign: "left", border: "none", cursor: "pointer",
                fontSize: 14, background: l.code === language ? "#f0f6ff" : "transparent",
                color: l.code === language ? "#0055cc" : "#333",
                fontWeight: l.code === language ? 600 : 400,
              }}
            >
              {l.code === language ? "✓ " : ""}{l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}