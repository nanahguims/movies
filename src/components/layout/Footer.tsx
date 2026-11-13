"use client";

import React from "react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-footer mt-auto">
      <div className="w-full section-container flex items-center justify-center md:justify-between flex-wrap gap-4 py-8">
        <Link href="/" className="flex flex-col items-center">
          <img
            src={`${basePath}/susuwatari.png`}
            alt="Studio Ghibli"
            className="h-20 w-auto"
          />
        </Link>

        <div className="flex flex-col items-center gap-2">
          <p className="mb-2 font-semibold text-ghibli-100">
            Navegue pelo menu
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-ghibli-100">
              Home
            </Link>
            <Link href="/movies" className="text-ghibli-100">
              Catálogo
            </Link>
            <Link href="/avaliacoes" className="text-ghibli-100">
              Avaliações
            </Link>
          </nav>
        </div>

        <div className="text-center">
          <p className="mb-2 font-semibold text-ghibli-100">
            Studio Ghibli Movies Catalog
          </p>
          <p className="text-sm text-ghibli-100">
            Dados fornecidos pela{" "}
            <a
              href="https://ghibliapi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Ghibli API
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <img
            src={`${basePath}/totoro.png`}
            alt="Studio Ghibli"
            className="h-8 w-auto"
          />
        </div>
      </div>
    </footer>
  );
};
