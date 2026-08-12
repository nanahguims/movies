"use client";

import { useCallback, useState, useEffect } from "react";

export interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export const usePagination = <T>({
  items,
  itemsPerPage = 12,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(itemsPerPage);

  // Atualizar recordsPerPage baseado na largura da tela
  useEffect(() => {
    const updateRecordsPerPage = () => {
      const width = window.innerWidth;

      if (width > 1280) {
        setRecordsPerPage(12); // 4 colunas em desktop
      } else if (width > 768) {
        setRecordsPerPage(9); // 3 colunas em tablet
      } else {
        setRecordsPerPage(6); // 2 colunas em mobile
      }
    };

    updateRecordsPerPage();
    window.addEventListener("resize", updateRecordsPerPage);

    return () => {
      window.removeEventListener("resize", updateRecordsPerPage);
    };
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = items.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(items.length / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    records,
    currentPage,
    totalPages,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};
