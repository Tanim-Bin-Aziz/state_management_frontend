"use client";

import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="text-xl font-bold">MyBrand</div>
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link href={item.href} className="text-gray-700 font-medium">
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button className="text-gray-700 text-2xl">☰</button>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3 space-y-2">
        {navItems.map((item) => (
          <div key={item.name} className="relative group">
            <Link href={item.href} className="block py-2 text-gray-700">
              {item.name}
            </Link>
            <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </div>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
