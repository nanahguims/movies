"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

type Movies = {
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
};

export const ListOfMovies = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movies[]>(
          "https://ghibliapi.vercel.app/films"
        );
        setMovies(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="movie-summary-container">
      <div className="movie-summary">
        {movies.length !== 0 ? (
          <>
            {movies.map((movie) => (
              <div className="movie-item" key={movie.id}>
                <img className="movie-image" src={movie.image} alt="" />
                <h1 className="movie-title">{movie.title}</h1>
              </div>
            ))}
          </>
        ) : (
          "carregando"
        )}
      </div>
    </section>
  );
};
