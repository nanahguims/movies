import { ghibliAPI } from "./api";
import { Movie } from "./types";

export const moviesService = {
  async getAllMovies(): Promise<Movie[]> {
    try {
      const movies = await ghibliAPI.get<Movie[]>("/films");
      return movies || [];
    } catch (error) {
      console.error("Error fetching all movies:", error);
      throw error;
    }
  },

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      const movie = await ghibliAPI.get<Movie>(`/films/${id}`);
      return movie || null;
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error);
      return null;
    }
  },

  getDirectors(movies: Movie[]): string[] {
    const directors = movies.map((movie) => movie.director);
    return [...new Set(directors)].filter(Boolean).sort();
  },

  getYears(movies: Movie[]): number[] {
    const years = movies.map((movie) => parseInt(movie.release_date, 10));
    return [...new Set(years)].filter(Boolean).sort();
  },

  getYearRanges(): string[] {
    return ["1980–1990", "1991–2000", "2001–2005", "2006–2010", "2011–2020"];
  },

  categorizeYear(year: number): string {
    if (year >= 1980 && year <= 1990) return "1980–1990";
    if (year >= 1991 && year <= 2000) return "1991–2000";
    if (year >= 2001 && year <= 2005) return "2001–2005";
    if (year >= 2006 && year <= 2010) return "2006–2010";
    if (year >= 2011 && year <= 2020) return "2011–2020";
    return "Outros";
  },
};
