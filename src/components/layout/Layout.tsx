import { Navbar } from "./Navbar";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { get } from "lodash";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const name = get(user, "name", "John Doe");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1">
        <div className="flex  justify-center items-center mb-6 p-6 bg-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                <FiUser />
              </span>
            </div>
            <span className="text-sm">{name}</span>
          </div>
        </div>
        <main className="lg:ml-64 p-6">{children}</main>
      </div>
    </div>
  );
};
