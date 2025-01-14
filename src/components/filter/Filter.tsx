"use client";

import React from "react";
import { FilterProps } from "@/types/interfaces";
import { useMediaQuery } from "react-responsive";
import BurgerMenuComponent from "../buger-menu/BugerMenu";

import "./styles.css";

export const Filter: React.FC<FilterProps> = ({
  directors,
  yearRanges,
  selectedDirectors,
  selectedYearRanges,
  toggleSelection,
  setSelectedDirectors,
  setSelectedYearRanges,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <>
      {!isTabletOrMobile ? (
        <div className="filter-container">
          <h2 className="filter-title">Filtrar</h2>
          <div className="filter">
            <div className="filter-item">
              <h3 className="filter-name">Diretor</h3>
              {directors.map((director, index) => (
                <label key={index}>
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

            <div className="filter-item">
              <h3 className="filter-name">Ano de lançamento</h3>
              {yearRanges.map((range, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={selectedYearRanges.includes(range)}
                    onChange={() =>
                      toggleSelection(range, setSelectedYearRanges)
                    }
                  />
                  {range}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <BurgerMenuComponent>
          <h2>Filtrar</h2>
          <div className="filter-mobile">
            <div className="filter-item">
              <h3 className="filter-name">Diretor</h3>
              {directors.map((director, index) => (
                <label key={index}>
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

            <div className="filter-item">
              <h3 className="filter-name">Ano de lançamento</h3>
              {yearRanges.map((range, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={selectedYearRanges.includes(range)}
                    onChange={() =>
                      toggleSelection(range, setSelectedYearRanges)
                    }
                  />
                  {range}
                </label>
              ))}
            </div>
          </div>
        </BurgerMenuComponent>
      )}
    </>
  );
};
