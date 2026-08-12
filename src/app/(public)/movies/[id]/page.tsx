"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  LoadingState,
  ErrorState,
  MovieNotFound,
} from "@/components/common/StateComponents";
import { RelatedMovies } from "@/components/movies/RelatedMovies";
import { useMovieById } from "@/hooks/useMovieById";
import { useMovies } from "@/hooks/useMovies";
import { relatedMoviesService } from "@/services/related-movies";
import { formatYear } from "@/utils/formatting";
import { Footer } from "@/components/layout/Footer";

export default function MovieDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { movie, loading, error } = useMovieById(params.id);
  const { movies: allMovies } = useMovies();

  const relatedMovies = useMemo(() => {
    if (!movie || allMovies.length === 0) return [];
    return relatedMoviesService.getRelatedMovies(movie, allMovies, 4);
  }, [movie, allMovies]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="section-container">
          <LoadingState message="Carregando detalhes do filme..." />
        </div>
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Header />
        <div className="section-container min-h-screen flex items-center">
          <MovieNotFound onBack={() => router.back()} />
        </div>
      </>
    );
  }

  const year = formatYear(movie.release_date);
  const score = parseInt(movie.rt_score, 10);
  const runtime = movie.running_time;

  return (
    <>
      <Header />

      {/* Hero Banner */}
      <div className="relative h-96 bg-ghibli-900 overflow-hidden">
        <img
          src={movie.movie_banner}
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ghibli-900 via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-lg transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <p className="text-xl text-ghibli-100">
            {movie.original_title_romanised}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="w-full max-w-sm">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full rounded-lg shadow-ghibli-lg"
              />
              {/* Info Cards Below Poster */}
            </div>
          </div>

          {/* Details */}

          <div className="lg:col-span-3">
            {/* Metadata */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="success">★ {score}</Badge>
              <Badge>{year}</Badge>
              <Badge>{runtime} min</Badge>
            </div>

            {/* Director & Producer */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-ghibli-600 mb-2">
                    Diretor
                  </h3>
                  <p className="text-lg font-semibold text-ghibli-900">
                    {movie.director}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ghibli-600 mb-2">
                    Produtor
                  </h3>
                  <p className="text-lg font-semibold text-ghibli-900">
                    {movie.producer}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Sinopse</h2>
              <p className="text-lg text-ghibli-700 leading-relaxed">
                {movie.description}
              </p>

              <div className="mt-6 space-y-4 flex p-4">
                <div>
                  <p className="text-sm text-ghibli-600 mb-1">Pontuação</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-accent-forest">
                      {score}
                    </span>
                    <span className="text-2xl">★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && <RelatedMovies movies={relatedMovies} />}
      </div>
    </>
  );
}
