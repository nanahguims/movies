import React from "react";
import type { Avaliacao } from "@/types/avaliacao";
import { calcularEstatisticas } from "@/utils/estatisticas";

interface Props {
  avaliacoes: Avaliacao[];
  carregando: boolean;
}

export const NotaDoSite: React.FC<Props> = ({ avaliacoes, carregando }) => {
  const { total, media, distribuicao } = calcularEstatisticas(avaliacoes);

  return (
    <div>
      <p className="text-sm text-ghibli-600 mb-1">Avaliação dos usuários</p>

      {carregando ? (
        <p className="text-ghibli-600">Carregando...</p>
      ) : total === 0 ? (
        <p className="text-ghibli-600">Sem avaliações ainda</p>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-accent-forest">
              {media.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
            </span>
            <span className="text-2xl">★</span>
            <span className="text-sm text-ghibli-600">
              / 5 · {total} {total === 1 ? "avaliação" : "avaliações"}
            </span>
          </div>

          <ul className="mt-2 space-y-1">
            {distribuicao.map(({ nota, qtd }) => (
              <li
                key={nota}
                className="flex items-center gap-2 text-xs text-ghibli-600"
              >
                <span className="w-5">{nota}★</span>
                <div className="h-2 w-42 bg-ghibli-100 rounded overflow-hidden">
                  <div
                    className="h-2 bg-accent-forest rounded"
                    style={{ width: `${(qtd / total) * 100}%` }}
                  />
                </div>
                <span>{qtd}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
