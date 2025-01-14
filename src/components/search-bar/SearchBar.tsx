"use client";

import React from "react";
import { SearchBarProps } from "@/types/interfaces";
import "./styles.css";

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <button onClick={onSearch} className="search-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 16 16"
        >
          <path
            id="Uni\xE3o_653"
            data-name="Uni\xE3o 653"
            d="M14.321,15.709l-4.151-4.15a6.409,6.409,0,1,1,1.391-1.393l4.151,4.152a.984.984,0,1,1-1.391,1.391ZM1.968,6.4A4.429,4.429,0,1,0,6.4,1.969,4.435,4.435,0,0,0,1.968,6.4Z"
            fill="#926836"
          />
        </svg>
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Digite o nome do filme..."
        className="search-input"
      />
    </div>
  );
};
