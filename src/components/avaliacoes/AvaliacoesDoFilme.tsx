"use client";

import React, { useEffect, useState } from "react";
import { AvaliacaoForm } from "./AvaliacaoForm";
import { AvaliacaoItem } from "./AvaliacaoItem";
import { avaliacoesService } from "@/services/avaliacoes";
import type { Avaliacao } from "@/types/avaliacao";
import type { Movie } from "@/services/ghibli/types";

export const AvaliacoesDoFilme: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    avaliacoesService
      .listar(movie.id)
      .then(setAvaliacoes)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [movie.id]);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Avaliações</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Avaliar este filme</h3>
          <AvaliacaoForm
            textoBotao="Publicar avaliação"
            onSalvar={async (dados) => {
              const nova = await avaliacoesService.criar({
                ...dados,
                filme_id: movie.id,
                filme_titulo: movie.title,
              });
              setAvaliacoes((atual) => [nova, ...atual]);
            }}
          />
        </div>

        <div className="space-y-4">
          {carregando && <p className="text-ghibli-600">Carregando avaliações...</p>}
          {erro && <p className="text-red-500">{erro}</p>}
          {!carregando && !erro && avaliacoes.length === 0 && (
            <p className="text-ghibli-600">Ninguém avaliou este filme ainda. Seja o primeiro!</p>
          )}
          {avaliacoes.map((a) => (
            <AvaliacaoItem
              key={a.id}
              avaliacao={a}
              onAtualizada={(nova) =>
                setAvaliacoes((atual) => atual.map((x) => (x.id === nova.id ? nova : x)))
              }
              onRemovida={(id) =>
                setAvaliacoes((atual) => atual.filter((x) => x.id !== id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
