"use client";

import { useCallback, useEffect, useState } from "react";
import { avaliacoesService } from "@/services/avaliacoes";
import type { Avaliacao, AvaliacaoInput } from "@/types/avaliacao";

export function useAvaliacoes(filmeId: string) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!filmeId) return;
    setCarregando(true);
    setErro(null);
    avaliacoesService
      .listar(filmeId)
      .then(setAvaliacoes)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [filmeId]);

  const criar = useCallback(async (dados: AvaliacaoInput) => {
    const nova = await avaliacoesService.criar(dados);
    setAvaliacoes((atual) => [nova, ...atual]);
  }, []);

  const substituir = useCallback((nova: Avaliacao) => {
    setAvaliacoes((atual) => atual.map((x) => (x.id === nova.id ? nova : x)));
  }, []);

  const remover = useCallback((id: number) => {
    setAvaliacoes((atual) => atual.filter((x) => x.id !== id));
  }, []);

  return { avaliacoes, carregando, erro, criar, substituir, remover };
}

export type UseAvaliacoes = ReturnType<typeof useAvaliacoes>;
