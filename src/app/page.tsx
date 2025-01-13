"use client";

import { MovieSummary } from "@/components/movie-summary/movieSummary";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <MovieSummary />
    </div>
  );
}
