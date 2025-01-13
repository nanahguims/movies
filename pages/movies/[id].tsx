import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Movies } from "@/types/interfaces";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movies | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const response = await axios.get<Movies>(
          `https://ghibliapi.vercel.app/films/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!movie) return <div>Filme não encontrado!</div>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} />
      <p>
        <strong>Descrição:</strong> {movie.description}
      </p>
      <p>
        <strong>Diretor:</strong> {movie.director}
      </p>
      <p>
        <strong>Produtor:</strong> {movie.producer}
      </p>
      <p>
        <strong>Ano de Lançamento:</strong> {movie.release_date}
      </p>
    </div>
  );
};

export default MovieDetails;
