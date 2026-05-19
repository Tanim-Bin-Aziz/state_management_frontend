"use client";

import Link from "next/link";
import {
  Home,
  Briefcase,
  Phone,
  Menu,
  Shield,
  LogOut,
  X,
  LogIn,
} from "lucide-react";
import { useSyncExternalStore, useState } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Properties", href: "/hero", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

function useLocalStorage(key: string) {
  return useSyncExternalStore(
    () => () => {},
    () => (typeof window !== "undefined" ? localStorage.getItem(key) : null),
    () => null,
  );
}

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
    document.cookie = "token=; path=/; max-age=0";

    setOpen(false);
    router.push("/");
  };

  const handleScroll = (href: string) => {
    setOpen(false);

    if (href === "hero") {
      document.getElementById("hero")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      router.push(href);
    }
  };

  const allNavItems = [
    ...navItems,
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: Shield }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-white/10 backdrop-blur-xl shadow-md">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/">
          <h3 className="text-black text-[12px] lg:text-2xl font-bold italic tracking-wide">
            Bismillah Royal House Developer LTD
          </h3>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {allNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <button
                  onClick={() => handleScroll(item.href)}
                  className={`flex items-center gap-2 text-sm font-medium transition ${
                    item.name === "Admin"
                      ? "text-black"
                      : "text-black/80 hover:text-teal-500"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </button>
              </li>
            );
          })}

          {/* Login / Logout */}
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 text-black/80 hover:text-teal-500 transition"
              >
                <LogIn size={16} />
                Login
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-white/10 backdrop-blur-xl px-6 py-4 space-y-3">
          {allNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => handleScroll(item.href)}
                className={`flex items-center gap-2 w-full text-left py-2 transition ${
                  item.name === "Admin"
                    ? "text-black"
                    : "text-black/80 hover:text-teal-500"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 py-2 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                router.push("/login");
              }}
              className="flex items-center gap-2 text-black/80 hover:text-teal-500 py-2 transition"
            >
              <LogIn size={18} />
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
