import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Note } from "../types/note";

export type NotesState = {
  notas: Note[];
  nuevaNota: Note;
};

export type NotesActions = {
  actualizarTitulo: (titulo: string) => void;
  actualizarContenido: (contenido: string) => void;
  agregarNota: () => void;
  cargarNotas: (notasIniciales: Note[]) => void;
  actualizarFavorita: (id: number, favorita: boolean) => void;
  eliminarNota: (id: number) => void;
};

export type NotesStore = NotesState & NotesActions;

export const defaultInitialState: NotesState = {
  notas: [],
  nuevaNota: {
    titulo: "",
    contenido: "",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    favorita: false,
  },
};

export const createNotesStore = (
  initState: NotesState = defaultInitialState
) => {
  return createStore<NotesStore>()(
    devtools(
      persist(
        (set, get) => ({
          ...initState,
          nuevaNota: {
            titulo: "",
            contenido: "",
            fechaCreacion: new Date(),
            fechaModificacion: new Date(),
            favorita: false,
          },
          actualizarTitulo: (titulo) =>
            set({ nuevaNota: { ...get().nuevaNota, titulo } }),
          actualizarContenido: (contenido) =>
            set({ nuevaNota: { ...get().nuevaNota, contenido } }),
          agregarNota: () => {
            set((state) => ({
              notas: [...state.notas, state.nuevaNota],
              nuevaNota: {
                titulo: "",
                contenido: "",
                fechaCreacion: new Date(),
                fechaModificacion: new Date(),
                favorita: false,
              },
            }));
          },
          cargarNotas: (notasIniciales) => set({ notas: notasIniciales }),
          actualizarFavorita: (id, favorita) => {
            set((state) => ({
              notas: state.notas.map((nota) =>
                nota.id === id ? { ...nota, favorita } : nota
              ),
            }));
          },
          eliminarNota: (id) => {
            set((state) => ({
              notas: state.notas.filter((nota) => nota.id !== id),
            }));
          },
        }),
        {
          name: "notas-storage",
        }
      )
    )
  );
};
