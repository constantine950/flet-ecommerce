"use client";

import { useState } from "react";
import Link from "next/link";
import { HiSearch, HiShoppingBag } from "react-icons/hi";
import { HiBars3, HiXMark } from "react-icons/hi2";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 lg:px-16 py-4">
        {/* Left: Menu Icon (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 hover:text-blue-600 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <HiXMark className="h-7 w-7" />
          ) : (
            <HiBars3 className="h-7 w-7" />
          )}
        </button>

        {/* Center: Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          FLET
        </Link>

        {/* Right: Icons / Search Field */}
        <div className="flex items-center space-x-3 min-w-[80px] justify-end">
          {!searchActive ? (
            <>
              <button
                aria-label="Search"
                onClick={() => setSearchActive(true)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <HiSearch className="h-6 w-6" />
              </button>
              <button
                aria-label="Shopping bag"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <HiShoppingBag className="h-6 w-6" />
              </button>
            </>
          ) : (
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-40 sm:w-60 border border-gray-300 rounded-full px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setSearchActive(false);
                  setQuery("");
                }}
                className="text-gray-500 hover:text-blue-600 transition"
                aria-label="Close search"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-2 bg-white shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-center space-x-8 py-2 bg-gray-50">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
