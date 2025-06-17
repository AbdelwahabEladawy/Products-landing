"use client";

import Link from "next/link";
import { useCartContext } from "@/Hooks/useCartContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { totalItems } = useCartContext();
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4 py-4 gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
          🛍️ ShopEasy
        </Link>

        {/* Navigation */}
        <nav className="flex gap-4 items-center">
          <Link 
            href="/" 
            className={`text-white hover:text-blue-100 font-medium transition-colors duration-200 hover:scale-105 px-3 py-2 rounded-lg ${
              pathname === "/" ? "bg-white/20 backdrop-blur-sm" : ""
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/cart" 
            className={`relative text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 flex items-center gap-2 ${
              pathname === "/cart" ? "bg-white/20 backdrop-blur-sm" : ""
            }`}
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}