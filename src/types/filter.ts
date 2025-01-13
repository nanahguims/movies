export interface FilterProps {
  directors: string[];
  producers: string[];
  yearRanges: string[];
  selectedDirectors: string[];
  selectedProducers: string[];
  selectedYearRanges: string[];
  toggleSelection: (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  setSelectedDirectors: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedProducers: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedYearRanges: React.Dispatch<React.SetStateAction<string[]>>;
}
