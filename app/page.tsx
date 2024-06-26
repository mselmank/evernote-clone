import Header from "../components/Header";
import { createClient } from "@/utils/supabase/server";
import NoteItem from "./notes/components/NoteItem";

export default async function Index() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="container mx-auto">
      <Header />
      <main className="flex">
        <div></div>
        <div className="grid grid-cols-4 gap-6 p-8">
          {notes?.map((nota, index) => {
            return <NoteItem key={index} {...nota} />;
          })}
        </div>
      </main>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        Powered by Supabase
      </footer>
    </div>
  );
}
