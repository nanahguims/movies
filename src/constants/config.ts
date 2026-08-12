export const YEAR_RANGES = [
  "1980–1990",
  "1991–2000",
  "2001–2005",
  "2006–2010",
  "2011–2020",
];

export const SORT_OPTIONS = [
  { value: "title", label: "Título (A-Z)" },
  { value: "title-desc", label: "Título (Z-A)" },
  { value: "year-desc", label: "Ano (Mais recentes)" },
  { value: "year-asc", label: "Ano (Mais antigos)" },
  { value: "score", label: "Pontuação (Maior)" },
];

export const API_BASE_URL = "https://ghibliapi.vercel.app";
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const ITEMS_PER_PAGE = 12;
export const FEATURED_MOVIES_COUNT = 6;
export const RELATED_MOVIES_COUNT = 4;
