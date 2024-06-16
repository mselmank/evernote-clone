"use client";
import { useNotesStore } from "../providers/notes-stores-provider";

const { actualizarContenido, agregarNota } = useNotesStore((state) => state);

export default async function NotesPage() {
  return (
    <>
      <NotesPage />
    </>
  );
}
