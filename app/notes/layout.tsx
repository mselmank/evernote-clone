import type { FC, ReactNode } from "react";
import { NotesStoreProvider } from "../providers/notes-stores-provider";
import { Inter } from "next/font/google";
interface BalanceLayoutProps {
  children: ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const BalanceLayout: FC<BalanceLayoutProps> = ({ children }) => {
  return (
    <html>
      <body className="bg-background text-foreground">
        <NotesStoreProvider>{children}</NotesStoreProvider>
      </body>
    </html>
  );
};

export default BalanceLayout;
