"use client";

import React from "react";
import { AvaliacaoForm } from "./AvaliacaoForm";
import { AvaliacaoItem } from "./AvaliacaoItem";
import type { UseAvaliacoes } from "@/hooks/useAvaliacoes";
import type { Movie } from "@/services/ghibli/types";

type Props = { movie: Movie } & UseAvaliacoes;

export const AvaliacoesDoFilme: React.FC<Props> = ({
  movie,
  avaliacoes,
  carregando,
  erro,
  criar,
  substituir,
  remover,
}) => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Avaliações</h2>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Avaliar este filme</h3>
          <AvaliacaoForm
            textoBotao="Publicar avaliação"
            onSalvar={(dados) =>
              criar({
                ...dados,
                filme_id: movie.id,
                filme_titulo: movie.title,
              })
            }
          />
        </div>

        <div className="space-y-4">
          {carregando && (
            <p className="text-ghibli-600">Carregando avaliações...</p>
          )}
          {erro && <p className="text-red-500">{erro}</p>}
          {!carregando && !erro && avaliacoes.length === 0 && (
            <p className="text-ghibli-600">
              Ninguém avaliou este filme ainda. Seja o primeiro!
            </p>
          )}
          {avaliacoes.map((a) => (
            <AvaliacaoItem
              key={a.id}
              avaliacao={a}
              onAtualizada={substituir}
              onRemovida={remover}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
