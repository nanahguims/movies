"use client";

import React from "react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-footer border-t border-ghibli-800 mt-auto">
      <div className="w-full section-container flex items-center justify-center sm:justify-between flex-wrap sm:gap-4 py-8">
        <Link href="/" className="flex items-center">
          <img
            src={`${basePath}/susuwatari.png`}
            alt="Studio Ghibli"
            className="h-20 w-auto"
          />
        </Link>

        <div className="text-center">
          <p className="mb-2 font-semibold text-ghibli-100">
            Studio Ghibli Movies Catalog
          </p>
          <p className="text-sm text-ghibli-400">
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
          <p className="text-sm text-ghibli-400">
            Feito com ♡ para fâs do studio
          </p>
        </div>
      </div>
    </footer>
  );
};
