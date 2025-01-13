"use client";

import React from "react";
import { FilterProps } from "@/types/interfaces";
import "./styles.css";

export const Filter: React.FC<FilterProps> = ({
  directors,
  producers,
  yearRanges,
  selectedDirectors,
  selectedProducers,
  selectedYearRanges,
  toggleSelection,
  setSelectedDirectors,
  setSelectedProducers,
  setSelectedYearRanges,
}) => {
  return (
    <div className="filter-container">
      <h2>Filtrar</h2>
      <div className="filter">
        <div className="filter-item">
          <h3 className="filter-name">Diretor</h3>
          {directors.map((director, index) => (
            <label key={index} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedDirectors.includes(director)}
                onChange={() => toggleSelection(director, setSelectedDirectors)}
              />
              {director}
            </label>
          ))}
        </div>
        <div className="filter-item">
          <h3 className="filter-name">Produtor</h3>
          {producers.map((producer, index) => (
            <label key={index} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedProducers.includes(producer)}
                onChange={() => toggleSelection(producer, setSelectedProducers)}
              />
              {producer}
            </label>
          ))}
        </div>
        <div className="filter-item">
          <h3 className="filter-name">Ano de lançamento</h3>
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
  );
};
