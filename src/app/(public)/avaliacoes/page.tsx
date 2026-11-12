"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { AvaliacaoItem } from "@/components/avaliacoes/AvaliacaoItem";
import { LoadingState } from "@/components/common/StateComponents";
import { avaliacoesService } from "@/services/avaliacoes";
import type { Avaliacao } from "@/types/avaliacao";

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    avaliacoesService
      .listar()
      .then(setAvaliacoes)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return avaliacoes;
    return avaliacoes.filter(
      (a) =>
        a.filme_titulo.toLowerCase().includes(termo) ||
        a.autor.toLowerCase().includes(termo),
    );
  }, [avaliacoes, busca]);

  return (
    <>
      <Header />
      <div className="section-container py-12">
        <h1 className="text-3xl font-bold mb-2">Avaliações</h1>
        <p className="text-ghibli-600 mb-6">
          Todas as avaliações registradas. Para criar uma nova, abra um filme no{" "}
          <Link href="/movies" className="text-accent-forest underline">
            catálogo
          </Link>
          .
        </p>

        <input
          className="input-base mb-6 max-w-md"
          placeholder="Buscar por filme ou autor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {carregando && <LoadingState message="Carregando avaliações..." />}
        {erro && <p className="text-red-500">{erro}</p>}
        {!carregando && !erro && filtradas.length === 0 && (
          <p className="text-ghibli-600">Nenhuma avaliação encontrada.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtradas.map((a) => (
            <AvaliacaoItem
              key={a.id}
              avaliacao={a}
              mostrarFilme
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
    </>
  );
}
