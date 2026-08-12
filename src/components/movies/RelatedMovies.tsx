"use client";

import React from "react";
import { Movie } from "@/services/ghibli/types";
import { MovieCard } from "./MovieCard";

interface RelatedMoviesProps {
  movies: Movie[];
}

export const RelatedMovies: React.FC<RelatedMoviesProps> = ({ movies }) => {
  if (movies.length === 0) return null;

  return (
    <section className="py-12 mt-20">
      <h2 className="text-3xl font-bold mb-8">Você também pode gostar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} variant="compact" />
        ))}
      </div>
    </section>
  );
};
