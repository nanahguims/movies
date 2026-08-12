import type { ReactNode } from "react";
import type { Movie } from "@/services/ghibli/types";
import { API_BASE_URL } from "@/constants/config";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(`${API_BASE_URL}/films`);

  if (!response.ok) {
    throw new Error(
      `Não foi possível obter os filmes para o build (${response.status}).`,
    );
  }

  const movies = (await response.json()) as Movie[];

  return movies.map(({ id }) => ({ id }));
}

export default function MovieDetailsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
