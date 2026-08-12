"use client";

import React, { createContext, useContext, useState } from "react";

export interface FiltersContextType {
  selectedDirectors: string[];
  setSelectedDirectors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedYearRanges: string[];
  setSelectedYearRanges: React.Dispatch<React.SetStateAction<string[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDirectors, setSelectedDirectors] = useState<string[]>([]);
  const [selectedYearRanges, setSelectedYearRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("title");

  const resetFilters = () => {
    setSelectedDirectors([]);
    setSelectedYearRanges([]);
    setSortBy("title");
  };

  return (
    <FiltersContext.Provider
      value={{
        selectedDirectors,
        setSelectedDirectors,
        selectedYearRanges,
        setSelectedYearRanges,
        sortBy,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
