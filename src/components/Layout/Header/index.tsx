"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "./Logo";
import { headerData } from "./Navigation/menuData";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-soft dark:shadow-slate-900/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {headerData.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* CTA Button - Desktop */}
            <a
              href="https://forms.gle/5PdAx98uKhGQEzJE7"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              <span>Daftar</span>
              <Icon icon="solar:arrow-right-linear" className="text-lg" />
            </a>

            {/* Theme Toggler */}
            <ThemeToggler />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Icon
                icon={isMobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"}
                className="text-2xl"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <nav className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft-lg dark:shadow-slate-900/50 p-4 space-y-2">
            {headerData.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://forms.gle/5PdAx98uKhGQEzJE7"
              target="_blank"
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-xl font-semibold mt-4"
            >
              <span>Daftar Sekarang</span>
              <Icon icon="solar:arrow-right-linear" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
