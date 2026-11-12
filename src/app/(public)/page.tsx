"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { BannerCarousel } from "@/components/movies/BannerCarousel";

export default function Home() {
  return (
    <>
      <Header />
      <section id="featured" className="section-container py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Filmes do Studio Ghibli
        </h2>
        <BannerCarousel />
      </section>
    </>
  );
}
