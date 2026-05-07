"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Info,
  Briefcase,
  Phone,
  Menu,
  Shield,
  LogOut,
} from "lucide-react";
import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

// ── localStorage helpers ──────────────────────────────────────────────────────

function useLocalStorage(key: string) {
  return useSyncExternalStore(
    () => () => {}, // কোনো subscription নেই
    () => localStorage.getItem(key), // client এ এটা চলবে
    () => null, // server এ এটা চলবে
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const router = useRouter();

  const token = useLocalStorage("token");
  const userRaw = useLocalStorage("user");

  const isLoggedIn = !!token;
  const isAdmin = (() => {
    try {
      const user = userRaw ? JSON.parse(userRaw) : null;
      return user?.role === "admin";
    } catch {
      return false;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const allNavItems = [
    ...navItems,
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: Shield }] : []),
  ];

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl flex justify-between mx-auto items-center h-16 px-4">
        <Image src="/BuildCrop.svg" alt="MyBrand" width={150} height={60} />

        <ul className="hidden md:flex space-x-8 items-center">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 font-medium ${
                    item.name === "Admin" ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </li>
            );
          })}

          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <button className="text-gray-700">
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 pb-3 space-y-3">
        {allNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center gap-2 py-2 ${
                  item.name === "Admin" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </div>
          );
        })}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 text-red-500 hover:text-red-600 w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
