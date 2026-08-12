"use client";

import React, { useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { ErrorState } from "@/components/common/StateComponents";
import { MovieCardSkeleton } from "@/components/ui/Skeleton";
import { useMovies } from "@/hooks/useMovies";
import { useSearch } from "@/context/SearchContext";
import { useFilters } from "@/context/FiltersContext";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/Button";
import { moviesService } from "@/services/ghibli/movies";
import { sortMovies } from "@/utils/formatting";
import { YEAR_RANGES, SORT_OPTIONS } from "@/constants/config";
import { Footer } from "@/components/layout/Footer";

export default function MoviesPage() {
  const { movies, loading, error } = useMovies();
  const { searchTerm, setSearchTerm } = useSearch();
  const {
    selectedDirectors,
    setSelectedDirectors,
    selectedYearRanges,
    setSelectedYearRanges,
    sortBy,
    setSortBy,
    resetFilters,
  } = useFilters();

  // Filtrar filmes
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filtro por busca
    if (searchTerm) {
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.original_title_romanised
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Filtro por diretor
    if (selectedDirectors.length > 0) {
      result = result.filter((movie) =>
        selectedDirectors.includes(movie.director),
      );
    }

    // Filtro por ano
    if (selectedYearRanges.length > 0) {
      result = result.filter((movie) => {
        const movieYear = parseInt(movie.release_date, 10);
        const category = moviesService.categorizeYear(movieYear);
        return selectedYearRanges.includes(category);
      });
    }

    // Ordenação
    result = sortMovies(result, sortBy);

    return result;
  }, [movies, searchTerm, selectedDirectors, selectedYearRanges, sortBy]);

  // Paginação
  const {
    records,
    currentPage,
    totalPages,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    resetPage,
  } = usePagination({ items: filteredMovies, itemsPerPage: 12 });

  useEffect(() => {
    resetPage();
  }, [searchTerm, selectedDirectors, selectedYearRanges, resetPage]);

  const directors = useMemo(() => moviesService.getDirectors(movies), [movies]);

  const toggleDirector = (director: string) => {
    setSelectedDirectors((prev) =>
      prev.includes(director)
        ? prev.filter((d) => d !== director)
        : [...prev, director],
    );
  };

  const toggleYearRange = (range: string) => {
    setSelectedYearRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range],
    );
  };

  const clearFilters = () => {
    resetFilters();
    setSearchTerm("");
    resetPage();
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="section-container">
          <MovieCardSkeleton count={12} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="section-container">
          <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="section-container">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Catálogo de Filmes</h1>
          <p className="text-ghibli-600">
            Explore {filteredMovies.length} filme
            {filteredMovies.length !== 1 ? "s" : ""} do Studio Ghibli
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters (Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-semibold text-ghibli-900 mb-3">
                  Ordenar por
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-base text-sm"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Directors */}
              <div className="mb-6">
                <h3 className="font-semibold text-ghibli-900 mb-3">Diretor</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {directors.map((director) => (
                    <label
                      key={director}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDirectors.includes(director)}
                        onChange={() => toggleDirector(director)}
                        className="w-4 h-4 rounded border-ghibli-300 text-accent-forest cursor-pointer"
                      />
                      <span className="text-sm text-ghibli-700">
                        {director}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Ranges */}
              <div className="mb-6">
                <h3 className="font-semibold text-ghibli-900 mb-3">
                  Ano de Lançamento
                </h3>
                <div className="space-y-2">
                  {YEAR_RANGES.map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedYearRanges.includes(range)}
                        onChange={() => toggleYearRange(range)}
                        className="w-4 h-4 rounded border-ghibli-300 text-accent-forest cursor-pointer"
                      />
                      <span className="text-sm text-ghibli-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedDirectors.length > 0 ||
                selectedYearRanges.length > 0 ||
                searchTerm.trim().length > 0 ||
                sortBy !== "title") && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
              <p className="text-ghibli-600">
                Mostrando {records.length > 0 ? (currentPage - 1) * 12 + 1 : 0}-
                {Math.min(currentPage * 12, filteredMovies.length)} de{" "}
                {filteredMovies.length}
              </p>
            </div>

            {/* Movies Grid */}
            <MovieGrid
              movies={records}
              emptyMessage={
                searchTerm ||
                selectedDirectors.length > 0 ||
                selectedYearRanges.length > 0
                  ? "Nenhum filme encontrado com esses filtros"
                  : "Nenhum filme disponível"
              }
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  onClick={prevPage}
                  disabled={!hasPrevPage}
                  size="sm"
                >
                  Anterior
                </Button>

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`cursor-pointer px-3 py-2 rounded-lg font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-accent-forest text-white"
                        : "bg-ghibli-100 text-ghibli-900 hover:bg-ghibli-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <Button
                  variant="secondary"
                  onClick={nextPage}
                  disabled={!hasNextPage}
                  size="sm"
                >
                  Próximo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
