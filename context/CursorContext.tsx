"use client";

import React, { createContext, useContext, useState } from "react";

type CursorState = "default" | "hover" | "view" | "magnetic" | "text" | "nexus" | "link";

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: "default",
  setCursorState: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>("default");

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
