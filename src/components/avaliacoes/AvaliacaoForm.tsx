"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { AvaliacaoUpdate } from "@/types/avaliacao";

interface Props {
  inicial?: AvaliacaoUpdate;
  textoBotao: string;
  onSalvar: (dados: AvaliacaoUpdate) => Promise<void>;
  onCancelar?: () => void;
}

export const AvaliacaoForm: React.FC<Props> = ({
  inicial,
  textoBotao,
  onSalvar,
  onCancelar,
}) => {
  const [autor, setAutor] = useState(inicial?.autor ?? "");
  const [nota, setNota] = useState(inicial?.nota ?? 5);
  const [comentario, setComentario] = useState(inicial?.comentario ?? "");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!autor.trim()) {
      setErro("Informe o seu nome.");
      return;
    }
    setSalvando(true);
    try {
      await onSalvar({ autor, nota, comentario });
      if (!inicial) {
        setAutor("");
        setNota(5);
        setComentario("");
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <Input
        label="Seu nome"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Ex.: Fernanda"
        maxLength={60}
      />

      <div>
        <label className="block mb-2 text-sm font-semibold text-ghibli-800">
          Nota
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNota(n)}
              aria-label={`Nota ${n}`}
              className={`text-3xl cursor-pointer transition-transform hover:scale-110 ${
                n <= nota ? "text-yellow-500" : "text-ghibli-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-ghibli-800">
          Comentário
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={3}
          maxLength={500}
          className="input-base resize-none"
          placeholder="O que você achou do filme?"
        />
      </div>

      {erro && <p className="text-sm text-red-500">{erro}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={salvando}>
          {salvando ? "Salvando..." : textoBotao}
        </Button>
        {onCancelar && (
          <Button type="button" variant="secondary" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
