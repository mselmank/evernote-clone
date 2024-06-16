"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type NotesStore,
  createNotesStore,
  defaultInitialState,
} from "../stores/notes-store";

export type NotesStoreApi = ReturnType<typeof createNotesStore>;

export const NotesStoreContext = createContext<NotesStoreApi | undefined>(
  undefined
);

export interface NotesStoreProviderProps {
  children: ReactNode;
}

export const NotesStoreProvider = ({ children }: NotesStoreProviderProps) => {
  const storeRef = useRef<NotesStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createNotesStore(defaultInitialState);
  }
  return (
    <NotesStoreContext.Provider value={storeRef.current}>
      {children}
    </NotesStoreContext.Provider>
  );
};
export const useNotesStore = <T,>(selector: (store: NotesStore) => T): T => {
  const notesStoreContext = useContext(NotesStoreContext);

  if (!notesStoreContext) {
    throw new Error("useNotesStore must be used within NotesStoreProvider");
  }
  return useStore(notesStoreContext, selector);
};
