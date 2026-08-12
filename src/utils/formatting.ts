import { Movie } from "@/services/ghibli/types";

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const formatYear = (dateString: string): string => {
  try {
    const year = parseInt(dateString, 10);
    return year.toString();
  } catch {
    return dateString;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export const sortMovies = (movies: Movie[], sortBy: string): Movie[] => {
  const sorted = [...movies];

  switch (sortBy) {
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "year-desc":
      sorted.sort(
        (a, b) => parseInt(b.release_date, 10) - parseInt(a.release_date, 10),
      );
      break;
    case "year-asc":
      sorted.sort(
        (a, b) => parseInt(a.release_date, 10) - parseInt(b.release_date, 10),
      );
      break;
    case "score":
      sorted.sort(
        (a, b) => parseInt(b.rt_score, 10) - parseInt(a.rt_score, 10),
      );
      break;
    default:
      break;
  }

  return sorted;
};
