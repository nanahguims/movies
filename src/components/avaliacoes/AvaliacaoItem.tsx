"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AvaliacaoForm } from "./AvaliacaoForm";
import { avaliacoesService } from "@/services/avaliacoes";
import type { Avaliacao } from "@/types/avaliacao";

interface Props {
  avaliacao: Avaliacao;
  mostrarFilme?: boolean;
  onAtualizada: (a: Avaliacao) => void;
  onRemovida: (id: number) => void;
}

export const AvaliacaoItem: React.FC<Props> = ({
  avaliacao,
  mostrarFilme = false,
  onAtualizada,
  onRemovida,
}) => {
  const [editando, setEditando] = useState(false);
  const [removendo, setRemovendo] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function remover() {
    setRemovendo(true);
    setErro(null);
    try {
      await avaliacoesService.remover(avaliacao.id);
      onRemovida(avaliacao.id);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao remover.");
      setRemovendo(false);
      setConfirmando(false);
    }
  }

  if (editando) {
    return (
      <AvaliacaoForm
        inicial={avaliacao}
        textoBotao="Salvar alterações"
        onCancelar={() => setEditando(false)}
        onSalvar={async (dados) => {
          const atualizada = await avaliacoesService.atualizar(avaliacao.id, dados);
          onAtualizada(atualizada);
          setEditando(false);
        }}
      />
    );
  }

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {mostrarFilme && (
            <Link
              href={`/movies/${avaliacao.filme_id}`}
              className="text-lg font-bold text-accent-forest hover:underline"
            >
              {avaliacao.filme_titulo}
            </Link>
          )}
          <p className="font-semibold text-ghibli-900">{avaliacao.autor}</p>
          <p className="text-yellow-500 text-xl" aria-label={`Nota ${avaliacao.nota}`}>
            {"★".repeat(avaliacao.nota)}
            <span className="text-ghibli-300">{"★".repeat(5 - avaliacao.nota)}</span>
          </p>
          <p className="text-xs text-ghibli-500">
            {new Date(avaliacao.criado_em).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div className="flex gap-2">
          {confirmando ? (
            <>
              <button
                type="button"
                onClick={remover}
                disabled={removendo}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {removendo ? "Removendo..." : "Confirmar exclusão"}
              </button>
              <Button size="sm" variant="secondary" onClick={() => setConfirmando(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="secondary" onClick={() => setEditando(true)}>
                Editar
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirmando(true)}
                className="text-red-600">
                Excluir
              </Button>
            </>
          )}
        </div>
      </div>

      {avaliacao.comentario && (
        <p className="mt-3 text-ghibli-700 whitespace-pre-line">{avaliacao.comentario}</p>
      )}
      {erro && <p className="mt-2 text-sm text-red-500">{erro}</p>}
    </div>
  );
};
