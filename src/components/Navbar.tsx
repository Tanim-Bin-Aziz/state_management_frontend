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

function useLocalStorage(key: string) {
  return useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem(key),
    () => null,
  );
}

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
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/BuildCrop.svg"
            alt="MyBrand"
            width={150}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {allNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 font-medium transition-colors duration-300 ${
                    item.name === "Admin"
                      ? "text-blue-300"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
              </li>
            );
          })}

          {/* Logout */}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-medium text-red-300 hover:text-red-200 transition-colors duration-300"
              >
                <LogOut size={16} />
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white/80 hover:text-white transition-colors duration-300">
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-4 py-4 space-y-3">
        {allNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center gap-2 py-2 transition-colors duration-300 ${
                  item.name === "Admin"
                    ? "text-blue-300"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>

              <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </div>
          );
        })}

        {/* Mobile Logout */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 text-red-300 hover:text-red-200 transition-colors duration-300 w-full"
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
