"use client";

import React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useMovies } from "@/hooks/useMovies";

export const BannerCarousel: React.FC = () => {
  const { movies, loading } = useMovies();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  if (loading) {
    return <div className="h-64 md:h-96 bg-ghibli-100 rounded-lg animate-pulse" />;
  }

  const filmes = movies.filter((m) => m.movie_banner);

  return (
    <div className="overflow-hidden rounded-lg" ref={emblaRef}>
      <div className="flex">
        {filmes.map((m) => (
          <Link
            key={m.id}
            href={`/movies/${m.id}`}
            className="relative flex-[0_0_100%] h-64 md:h-96"
          >
            <img
              src={m.movie_banner}
              alt={m.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ghibli-900/80 to-transparent" />
            <p className="absolute bottom-6 left-6 text-2xl font-bold text-white">
              {m.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
