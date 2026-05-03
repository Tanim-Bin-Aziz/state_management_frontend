"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, Info, Briefcase, Phone, Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl flex justify-between mx-auto items-center h-16 px-4">
        <Image src="/BuildCrop.svg" alt="MyBrand" width={150} height={60} />
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-gray-700 font-medium"
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            );
          })}
        </ul>
        <div className="md:hidden">
          <button className="text-gray-700">
            <Menu size={26} />
          </button>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-2 py-2 text-gray-700"
              >
                <Icon size={18} />
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
