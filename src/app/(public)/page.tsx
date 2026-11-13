"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { BannerCarousel } from "@/components/movies/BannerCarousel";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <>
      <Header />
      <section id="featured" className="section-container py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Filmes do Studio Ghibli
        </h2>
        <BannerCarousel />

        <h2 className="text-4xl font-bold text-center my-12">
          Sobre o Studio Ghibli
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg mb-12">
              Em 1985, Hayao Miyazaki e Isao Takahata fundaram o Studio Ghibli,
              um estúdio de animação japonês que se tornou mundialmente famoso
              por seus filmes encantadores e visualmente deslumbrantes. <br /> O
              estúdio é conhecido por suas histórias envolventes, personagens
              memoráveis e animação de alta qualidade.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <img
              src={`${basePath}/info1.jpg`}
              alt="Studio Ghibli"
              className="w-full h-auto"
            />
            <img
              src={`${basePath}/info2.jpg`}
              alt="Studio Ghibli"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex items-center gap-4 p-4 bg-ghibli-200 rounded-sm">
            <img src={`${basePath}/icon1.png`} alt="Pincel" className="h-15" />
            <div className="flex flex-col mt-4">
              <h4 className="text-xl font-bold">Animação tradicional</h4>
              <p>
                O Studio Ghibli é conhecido por sua animação tradicional, feita
                à mão, que dá vida a mundos imaginativos e personagens
                cativantes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-ghibli-200 rounded-sm">
            <img src={`${basePath}/icon2.png`} alt="Pincel" className="h-15" />
            <div className="flex flex-col mt-4">
              <h4 className="text-xl font-bold">Trilhas sonoras marcantes</h4>
              <p>
                Trilha sonoras de Joe Hisaishi e outros compositores renomados,
                que complementam perfeitamente a narrativa e a atmosfera dos
                filmes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-ghibli-200 rounded-sm">
            <img src={`${basePath}/icon3.png`} alt="Pincel" className="h-15" />
            <div className="flex flex-col mt-4">
              <h4 className="text-xl font-bold">Mundos de fantasia</h4>
              <p>
                Os filmes do Studio Ghibli transportam os espectadores para
                mundos de fantasia, cheios de criaturas mágicas, paisagens
                deslumbrantes e aventuras emocionantes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
