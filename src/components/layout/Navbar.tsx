import { useState } from "react";
import {
  HiHome,
  HiShoppingBag,
  HiChartPie,
  HiCog,
  HiLogout,
} from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { get } from "lodash";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const name = get(user, "name");

  const navItems = [
    { icon: HiHome, label: "Home", path: "/" },
    { icon: HiHome, label: "Dashboard", path: "/admin" },
    { icon: HiShoppingBag, label: "Products", path: "/admin/products" },
    { icon: HiChartPie, label: "Sales", path: "/admin/sales" },
    { icon: HiCog, label: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-[100vh]">
      {/* Hamburger Menu */}

      {/* Navbar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[#2D9CDB] text-white flex flex-col z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-3 border-b border-white/20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#2D9CDB] font-bold">B</span>
            </div>
            <span className="text-xl font-bold">BeLaundry</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                 flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                 ${isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"}
               `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/20">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium">
                  {name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{name || "User"}</p>
                <p className="text-sm text-white/70 truncate">
                  {"user@example.com"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <HiLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div className=" z-50  flex justify-end p-3 ">
        <button
          className=" p-2 bg-[#2D9CDB] text-white rounded-full  "
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};
