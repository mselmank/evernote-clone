import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NotesPage } from "./NotesPage";

export default async function Notes() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <NotesPage />
    </>
  );
}
