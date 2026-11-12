import type { Avaliacao, AvaliacaoInput, AvaliacaoUpdate } from "@/types/avaliacao";

async function tratar<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Erro na requisição.");
  return data as T;
}

export const avaliacoesService = {
  listar(filmeId?: string) {
    const query = filmeId ? `?filme_id=${encodeURIComponent(filmeId)}` : "";
    return fetch(`/api/avaliacoes${query}`, { cache: "no-store" }).then((r) =>
      tratar<Avaliacao[]>(r),
    );
  },

  criar(dados: AvaliacaoInput) {
    return fetch("/api/avaliacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    }).then((r) => tratar<Avaliacao>(r));
  },

  atualizar(id: number, dados: AvaliacaoUpdate) {
    return fetch(`/api/avaliacoes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    }).then((r) => tratar<Avaliacao>(r));
  },

  remover(id: number) {
    return fetch(`/api/avaliacoes/${id}`, { method: "DELETE" }).then((r) =>
      tratar<{ ok: boolean }>(r),
    );
  },
};
