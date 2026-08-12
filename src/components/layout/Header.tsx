"use client";

import React, { useState } from "react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-card sticky top-0 z-50">
      <div className="section-container flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-4 shrink-0">
          <img
            src={`${basePath}/ghibli-logo.png`}
            alt="Studio Ghibli"
            className="h-12 sm:h-20 w-auto"
          />

          <img
            src={`${basePath}/logo.svg`}
            alt="Studio Ghibli"
            className="h-12 sm:h-20 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-ghibli-700 hover:text-accent-forest transition-colors"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="text-ghibli-700 hover:text-accent-forest transition-colors"
          >
            Catálogo
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-ghibli-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-ghibli-200 md:hidden">
            <nav className="flex flex-col gap-4 p-4">
              <Link
                href="/"
                className="text-ghibli-700 hover:text-accent-forest transition-colors"
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="text-ghibli-700 hover:text-accent-forest transition-colors"
              >
                Catálogo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
