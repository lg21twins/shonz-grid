"use client";

import { useEffect } from "react";

export function useScrollRestore(key: string) {
  useEffect(() => {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem(key);
    }
  }, [key]);

  return () => sessionStorage.setItem(key, String(window.scrollY));
}
