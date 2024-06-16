"use client";

import { FC, useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";

export const NotesPage: FC = () => {
  return (
    <main>
      <section>
        <div></div>
        <div></div>
      </section>
      <section>
        <NoteForm />
      </section>
    </main>
  );
};
