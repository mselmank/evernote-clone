"use client";
import NoteItem from "./NoteItem";
import { useNotesStore } from "@/app/providers/notes-stores-provider";

const NoteList: React.FC = () => {
  const notas = useNotesStore((state) => state.notas);

  return (
    <div>
      <h2>Lista de Notas</h2>
      <ul>
        {notas.map((nota) => (
          <li key={nota.id}>
            <NoteItem nota={nota} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
