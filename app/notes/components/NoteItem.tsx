"use client";
import { useNotesStore } from "@/app/providers/notes-stores-provider";
import { Note } from "@/app/types/note";
interface NotaProps {
  titulo: string;
  contenido: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
  favorita: boolean;
}
const NoteItem: React.FC<NotaProps> = ({
  titulo,
  contenido,
  fechaCreacion,
  fechaModificacion,
  favorita,
}) => {
  const actualizarFavorita = useNotesStore((state) => state.actualizarFavorita);
  const eliminarNota = useNotesStore((state) => state.eliminarNota);

  // const handleFavoritoClick = () => {
  //   actualizarFavorita(nota.id!, !nota.favorita);
  // };

  // const handleDeleteClick = () => {
  //   eliminarNota(nota.id!);
  // };

  return (
    <div>
      <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25">
        <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6 dark:bg-gray-900">
          <a href="#">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
              {titulo}
            </h3>
          </a>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{contenido}</p>
          <p>Creada: {new Date(fechaCreacion).toLocaleString()}</p>
          <p>Modificada: {new Date(fechaModificacion).toLocaleString()}</p>
          {/* <button onClick={handleFavoritoClick}>
          {favorita ? "Favorita" : ""}
          </button>
          <button onClick={handleDeleteClick}>Eliminar</button> */}
        </div>
      </article>
    </div>
  );
};

export default NoteItem;
