export interface Movie {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

export interface FetchMoviesResponse {
  data: Movie[];
  error?: string;
  loading: boolean;
}

export interface FetchMovieResponse {
  data: Movie | null;
  error?: string;
  loading: boolean;
}
