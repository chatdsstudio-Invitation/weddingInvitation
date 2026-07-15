"use client";

import { useEffect } from "react";

// Best-effort deterrent against casual right-click "Inspect" and the common
// DevTools keyboard shortcuts. This does NOT provide real security — anyone
// who wants to open DevTools can still do so (browser menu, mobile browser
// dev mode, etc.), it only removes the obvious one-click affordances so
// casual visitors don't stumble into viewing page source.
export default function DevToolsBlocker() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key;
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      const isF12 = key === "F12";
      const isInspect = ctrlOrCmd && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(key);
      const isViewSource = ctrlOrCmd && ["U", "u"].includes(key);
      const isSavePage = ctrlOrCmd && ["S", "s"].includes(key);

      if (isF12 || isInspect || isViewSource || isSavePage) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys, true);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys, true);
    };
  }, []);

  return null;
}
