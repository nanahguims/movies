"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/services/ghibli/types";
import { moviesService } from "@/services/ghibli/movies";

export const useMovieById = (id: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await moviesService.getMovieById(id);
        setMovie(data);
        if (!data) {
          setError("Filme não encontrado");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar filme");
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
};
