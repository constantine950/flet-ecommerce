"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiShoppingBag } from "react-icons/hi";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useCart } from "../_context/CartContext";
import { usePathname } from "next/navigation";

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
  const { cart } = useCart();
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 lg:px-16 py-4">
        {/* Left: Mobile Menu Button */}
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

        {/* Right: Cart Icon */}
        <div className="relative">
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="text-gray-700 hover:text-blue-600 transition relative"
          >
            <HiShoppingBag className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="lg:hidden px-6 pb-4 space-y-2 bg-white shadow-sm"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`${
                path === link.href ? "text-blue-600" : "text-gray-700"
              } block hover:text-blue-600 transition font-medium`}
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
            className={`${
              path === link.href ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition font-medium`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
