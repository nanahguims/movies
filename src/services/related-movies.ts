import { Movie } from "./ghibli/types";

export const relatedMoviesService = {
  /**
   * Encontra filmes relacionados usando critérios simples
   * Prioridade: mesmo diretor > ano próximo > pontuação similar > aleatórios
   */
  getRelatedMovies(movie: Movie, allMovies: Movie[], limit = 4): Movie[] {
    if (!movie || allMovies.length === 0) return [];

    // Filtrar o filme atual
    const otherMovies = allMovies.filter((m) => m.id !== movie.id);

    if (otherMovies.length === 0) return [];

    // Pontuação de relevância
    const scored = otherMovies.map((m) => {
      let score = 0;

      // Mesmo diretor (maior peso)
      if (m.director === movie.director) {
        score += 100;
      }

      // Ano próximo (entre -5 e +5 anos)
      const yearDiff = Math.abs(
        parseInt(m.release_date, 10) - parseInt(movie.release_date, 10),
      );
      if (yearDiff <= 5) {
        score += 50 - yearDiff * 5;
      }

      // Pontuação RT similar
      const scoreDiff = Math.abs(
        parseInt(m.rt_score, 10) - parseInt(movie.rt_score, 10),
      );
      if (scoreDiff <= 20) {
        score += 30 - scoreDiff;
      }

      // Adicionar aleatoriedade pequena para variar resultados
      score += Math.random() * 5;

      return { movie: m, score };
    });

    // Ordenar por pontuação e retornar limite
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.movie);
  },
};
