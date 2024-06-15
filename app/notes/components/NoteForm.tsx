"use client";

import React from "react";

import { FormProvider, useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../../../components/ui/form";
import { Textarea } from "../../../components/ui/textarea"
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
// import useStore from "@/lib/store/store";

interface NotaProps {
  titulo: string;
  contenido: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
  favorita: boolean;
}
const NoteForm: React.FC = () => {
  const form = useForm<NotaProps>({
    defaultValues: {
      titulo: "",
      contenido: "",
      fechaCreacion: new Date(),
      fechaModificacion: new Date(),
      favorita: false,
    },
  });
//   const { updateNoteInStore, saveNoteToSupabase } = useStore();

  const onSubmit = form.handleSubmit(async (data: NotaProps) => {
    // try {
    //   // 1. Actualizar Zustand (opcional, para UI optimista)
    //   updateNoteInStore(data); // Llama a la función del store para actualizar localmente

    //   // 2. Guardar en Supabase
    //   await saveNoteToSupabase(data); // Llama a la función del store para guardar en Supabase

    //   // 3. Manejar éxito (opcional)
    //   // toast.success("Nota guardada con éxito"); // Muestra una notificación de éxito (si usas toastify u otra librería)
    //   form.reset(); // Reinicia el formulario
    // } catch (error) {
    //   // Manejar errores
    //   console.error("Error al guardar la nota:", error);
    //   console.error("Error al guardar la nota");
    // }
  });

  return (
    <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25">
      <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6 dark:bg-gray-900">
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Titulo
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Título de la nota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contenido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Contenido
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="favorita"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>
                      {" "}
                      <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                        Marcar como favorita
                      </h3>
                    </FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </Button>
          </form>
        </FormProvider>
      </div>
    </article>
  );
};
export default NoteForm;