"use client";

import React from "react";
import { Button } from "../ui/Button";

export const LoadingState: React.FC<{ message?: string }> = ({
  message = "Carregando...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin">
        <svg
          className="w-12 h-12 text-accent-forest"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <p className="mt-4 text-ghibli-600">{message}</p>
    </div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Ocorreu um erro ao carregar os dados.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4v2m0-6a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-ghibli-900 mb-2">
        Erro ao carregar
      </h3>
      <p className="text-ghibli-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nenhum resultado encontrado",
  message = "Tente ajustar seus filtros ou a busca.",
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <svg
        className="w-16 h-16 text-ghibli-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 className="text-xl font-semibold text-ghibli-900 mb-2">{title}</h3>
      <p className="text-ghibli-600 text-center mb-6 max-w-md">{message}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

interface MovieNotFoundProps {
  onBack?: () => void;
}

export const MovieNotFound: React.FC<MovieNotFoundProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <svg
        className="w-20 h-20 text-ghibli-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 4v16m10-16v16M7 4h10m0 0l3-3m-3 3l-3-3m0 16l3 3m-3-3l-3 3"
        />
      </svg>
      <h1 className="text-3xl font-bold text-ghibli-900 mb-2">
        Filme não encontrado
      </h1>
      <p className="text-ghibli-600 text-center mb-8 max-w-md">
        Desculpe, o filme que você procura não existe ou foi removido.
      </p>
      <div className="flex gap-3">
        {onBack && (
          <Button variant="secondary" onClick={onBack}>
            Voltar
          </Button>
        )}
        <Button variant="primary" onClick={() => (window.location.href = "/")}>
          Ir para Home
        </Button>
      </div>
    </div>
  );
};
