"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import { Movies } from "@/types/movies";

export const MovieSummary = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15);
  const [selectedDirectors, setSelectedDirectors] = useState<string[]>([]);
  const [selectedProducers, setSelectedProducers] = useState<string[]>([]);
  const [selectedYearRanges, setSelectedYearRanges] = useState<string[]>([]);
  const [activePrePage, setActivePrePage] = useState(true);
  const [activeCurrentPage, setActiveCurrentPage] = useState(true);

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

  console.log(movies);

  // Filtro

  const yearRanges = [
    "1980–1990",
    "1991–2000",
    "2001–2005",
    "2006–2010",
    "2011–2020",
  ];

  const categorizeYear = (year: number) => {
    if (year >= 1980 && year <= 1990) return "1980–1990";
    if (year >= 1991 && year <= 2000) return "1991–2000";
    if (year >= 2001 && year <= 2005) return "2001–2005";
    if (year >= 2006 && year <= 2010) return "2006–2010";
    if (year >= 2011 && year <= 2020) return "2011–2020";
    return "Outros";
  };

  const toggleSelection = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredMovies = movies.filter((movie) => {
    const movieYear = parseInt(movie.release_date);
    const movieCategory = categorizeYear(movieYear);

    return (
      (selectedYearRanges.length === 0 ||
        selectedYearRanges.includes(movieCategory)) &&
      (selectedDirectors.length === 0 ||
        selectedDirectors.includes(movie.director)) &&
      (selectedProducers.length === 0 ||
        selectedProducers.includes(movie.producer))
    );
  });

  const directors = [...new Set(filteredMovies.map((movie) => movie.director))];
  const producers = [...new Set(filteredMovies.map((movie) => movie.producer))];

  // Pagination
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredMovies.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredMovies.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const updateRecordsPerPage = () => {
      const width = window.innerWidth;

      if (width > 990) {
        setRecordsPerPage(8);
      } else {
        setRecordsPerPage(5);
      }
    };

    updateRecordsPerPage();
    window.addEventListener("resize", updateRecordsPerPage);

    return () => {
      window.removeEventListener("resize", updateRecordsPerPage);
    };
  }, []);

  useEffect(() => {
    if (currentPage == 1) {
      setActivePrePage(false);
    } else {
      setActivePrePage(true);
    }
    if (currentPage == npage) {
      setActiveCurrentPage(false);
    } else {
      setActiveCurrentPage(true);
    }
  });

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id: number) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <section className="movie-summary-container">
      <div className="filter">
        <div>
          <h2>Filtrar</h2>
          <div>
            <h3>Diretor</h3>
            {directors.map((director, index) => (
              <label key={index} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={selectedDirectors.includes(director)}
                  onChange={() =>
                    toggleSelection(director, setSelectedDirectors)
                  }
                />
                {director}
              </label>
            ))}
          </div>
          <div>
            <h3>Produtor</h3>
            {producers.map((producer, index) => (
              <label key={index} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={selectedProducers.includes(producer)}
                  onChange={() =>
                    toggleSelection(producer, setSelectedProducers)
                  }
                />
                {producer}
              </label>
            ))}
          </div>
          <div>
            <h3>Ano de lançamento</h3>
            {yearRanges.map((range, index) => (
              <label key={index} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={selectedYearRanges.includes(range)}
                  onChange={() => toggleSelection(range, setSelectedYearRanges)}
                />
                {range}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="movie-summary">
        <div className="movie-summary-item">
          {records.length !== 0 ? (
            <>
              {records.map((movie) => (
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
        <ul className="pagination">
          <li className="page-item" onClick={prePage}>
            <button className="page-link" disabled={!activePrePage}>
              Anterior
            </button>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
              onClick={() => changeCPage(n)}
            >
              <a className="page-link" href="#">
                {n}
              </a>
            </li>
          ))}
          <li className="page-item" onClick={nextPage}>
            <button className="page-link" disabled={!activeCurrentPage}>
              Próximo
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};
