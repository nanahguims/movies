"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/services/ghibli/types";
import { moviesService } from "@/services/ghibli/movies";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await moviesService.getAllMovies();
        setMovies(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar filmes",
        );
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
