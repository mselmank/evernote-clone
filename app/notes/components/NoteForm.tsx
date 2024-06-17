// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { useNotesStore } from "@/app/providers/notes-stores-provider";
// import { useState } from "react";
// import { Note } from "@/app/types/note";

// const FormSchema = z.object({
//   titulo: z.string().min(1, {
//     message: "El título debe tener al menos 1 caracter.",
//   }),
//   contenido: z.string().min(1, {
//     message: "El contenido debe tener al menos 1 caracter.",
//   }),
//   favorita: z.boolean().default(false).optional(),
// });
// type FormData = z.infer<typeof FormSchema>;
// const NoteForm: React.FC = () => {
//   const { nuevaNota, actualizarTitulo, actualizarContenido, agregarNota } =
//     useNotesStore((state) => state);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const form = useForm<Note>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: nuevaNota,
//   });

//   const onSubmit = form.handleSubmit(async (data: FormData) => {
//     try {
//       setIsLoading(true);
//       actualizarTitulo(data.titulo);
//       actualizarContenido(data.contenido);
//       agregarNota();
//       form.reset();
//     } catch (err) {
//     } finally {
//       setIsLoading(false);
//     }
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={onSubmit} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="titulo"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {" "}
//                 <p className="mt-2 text-gray-500 dark:text-gray-400">Titulo</p>
//               </FormLabel>
//               <FormControl>
//                 <Input placeholder="Título de la nota" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="contenido"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {" "}
//                 <p className="mt-2 text-gray-500 dark:text-gray-400">
//                   Contenido
//                 </p>
//               </FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Escribe tu nota aqui..."
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 Puedes usar <span>@mention</span> para otros usuarios y
//                 organizaciones.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="favorita"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between">
//               <div className="space-y-0.5">
//                 <FormLabel>
//                   <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
//                     Marcar como favorita
//                   </h3>
//                 </FormLabel>
//                 <FormDescription></FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button
//           disabled={isLoading}
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           {isLoading ? "Guardando..." : "Guardar"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default NoteForm;
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useNotesStore } from "@/app/providers/notes-stores-provider";
import { useState } from "react";
import { Note } from "@/app/types/note";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const FormSchema = z.object({
  titulo: z.string().min(1, {
    message: "El título debe tener al menos 1 caracter.",
  }),
  contenido: z.string().min(1, {
    message: "El contenido debe tener al menos 1 caracter.",
  }),
  favorita: z.boolean().default(false).optional(),
});

type FormData = z.infer<typeof FormSchema>;

const NoteForm: React.FC = () => {
  const { nuevaNota, actualizarTitulo, actualizarContenido, agregarNota } =
    useNotesStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Note>({
    resolver: zodResolver(FormSchema),
    defaultValues: nuevaNota,
  });

  const onSubmit = form.handleSubmit(async (data: FormData) => {
    try {
      setIsLoading(true);

      const supabase = createClient();
      const { error } = await supabase.from("notes").insert({
        titulo: data.titulo,
        contenido: data.contenido,
        favorita: data.favorita,
      });

      if (error) {
        throw new Error(error.message);
      } else {
        actualizarTitulo(data.titulo);
        actualizarContenido(data.titulo);

        agregarNota();
        form.reset();
        redirect("/");
      }
    } catch (err) {
      console.error("Error al guardar la nota en Supabase:", err);
      //   toast.error("Error al guardar la nota. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Titulo</p>
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
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Contenido
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe tu nota aqui..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes usar <span>@mention</span> para otros usuarios y
                organizaciones.
              </FormDescription>
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
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Form>
  );
};

export default NoteForm;
