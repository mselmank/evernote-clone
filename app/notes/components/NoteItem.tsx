"use client";
import { useNotesStore } from "@/app/providers/notes-stores-provider";
import { Note } from "@/app/types/note";

interface NoteItemProps {
  nota: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ nota }) => {
  const actualizarFavorita = useNotesStore((state) => state.actualizarFavorita);
  const eliminarNota = useNotesStore((state) => state.eliminarNota);

  const handleFavoritoClick = () => {
    actualizarFavorita(nota.id!, !nota.favorita);
  };

  const handleDeleteClick = () => {
    eliminarNota(nota.id!);
  };

  return (
    <div>
      <h3>{nota.titulo}</h3>
      <p>{nota.contenido}</p>
      <p>Creada: {new Date(nota.fechaCreacion).toLocaleString()}</p>
      <p>Modificada: {new Date(nota.fechaModificacion).toLocaleString()}</p>
      <button onClick={handleFavoritoClick}>
        {nota.favorita ? "Desmarcar como favorita" : "Marcar como favorita"}
      </button>
      <button onClick={handleDeleteClick}>Eliminar</button>
    </div>
  );
};

export default NoteItem;
