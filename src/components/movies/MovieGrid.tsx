"use client";

import React from "react";
import { Movie } from "@/services/ghibli/types";
import { MovieCard } from "./MovieCard";
import { EmptyState } from "../common/StateComponents";

interface MovieGridProps {
  movies: Movie[];
  variant?: "compact" | "full";
  emptyMessage?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  variant = "full",
  emptyMessage = "Nenhum filme encontrado",
}) => {
  if (movies.length === 0) {
    return (
      <EmptyState
        title={emptyMessage}
        message="Tente ajustar seus filtros ou a busca."
      />
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        variant === "full"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
      }`}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant={variant} />
      ))}
    </div>
  );
};
