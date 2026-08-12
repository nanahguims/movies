"use client";

import React from "react";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section id="featured" className="section-container py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Conteúdo</h2>
        <div className="h-64 bg-ghibli-100 rounded-lg flex items-center justify-center text-ghibli-500">
          <p>conteúdo em destaque (em breve)</p>
        </div>
      </section>
    </>
  );
}
