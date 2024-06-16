import type { FC, ReactNode } from "react";
import { NotesStoreProvider } from "../providers/notes-stores-provider";
import { Inter } from "next/font/google";
interface BalanceLayoutProps {
  children: ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const BalanceLayout: FC<BalanceLayoutProps> = ({ children }) => {
  return (
    <div>
      <body className={inter.className}>
        <NotesStoreProvider>{children}</NotesStoreProvider>
      </body>
    </div>
  );
};

export default BalanceLayout;
