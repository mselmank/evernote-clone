import "./globals.css";
import { Inter } from "next/font/google";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

import { NotesStoreProvider } from "./providers/notes-stores-provider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body className={inter.className}>
        <NotesStoreProvider>{children}</NotesStoreProvider>
      </body>
    </div>
  );
}
