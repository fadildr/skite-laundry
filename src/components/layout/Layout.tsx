// src/components/layout/Layout.tsx
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="ml-64 flex-1 p-6 z-0">{children}</main>
    </div>
  );
};
