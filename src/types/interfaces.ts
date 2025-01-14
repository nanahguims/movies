export type Movies = {
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

export interface FilterProps {
  directors: string[];
  yearRanges: string[];
  selectedDirectors: string[];
  selectedYearRanges: string[];
  toggleSelection: (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  setSelectedDirectors: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedYearRanges: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: () => void;
}

export interface SelectedMovie {
  selectedMovie: Movies | null;
}
