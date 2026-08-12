"use client";

import React from "react";
import Link from "next/link";
import { Movie } from "@/services/ghibli/types";
import { Badge } from "../ui/Badge";

interface MovieCardProps {
  movie: Movie;
  variant?: "compact" | "full";
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = "full",
}) => {
  const year = new Date(movie.release_date).getFullYear();
  const score = parseInt(movie.rt_score, 10);
  const isHighScore = score >= 80;

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="card group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden h-80 bg-ghibli-100">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Score Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={isHighScore ? "success" : "default"}
              className="shadow-lg"
            >
              ★ {score}
            </Badge>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col grow">
          <div className="grow">
            <h3 className="font-bold text-lg text-ghibli-900 mb-1 group-hover:text-accent-forest transition-colors line-clamp-1">
              {movie.title}
            </h3>

            {variant === "full" && (
              <>
                <p className="text-sm text-ghibli-600 mb-2 line-clamp-1 ">
                  {movie.original_title_romanised}
                </p>
                <p className="text-xs text-ghibli-500 mb-3">
                  {movie.director} • {year}
                </p>
                {movie.description && (
                  <p className="text-sm text-ghibli-600 line-clamp-3 mb-4">
                    {movie.description}
                  </p>
                )}
              </>
            )}

            {variant === "compact" && (
              <p className="text-xs text-ghibli-500 mb-5">
                {movie.director} • {year}
              </p>
            )}
          </div>

          {/* Button */}
          <button className="btn-primary">Ver detalhes</button>
        </div>
      </div>
    </Link>
  );
};
