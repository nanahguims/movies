import type { Avaliacao } from "@/types/avaliacao";

export function calcularEstatisticas(avaliacoes: Avaliacao[]) {
  const total = avaliacoes.length;
  const distribuicao = [5, 4, 3, 2, 1].map((nota) => ({
    nota,
    qtd: avaliacoes.filter((a) => a.nota === nota).length,
  }));
  const media = total
    ? avaliacoes.reduce((soma, a) => soma + a.nota, 0) / total
    : 0;

  return { total, media, distribuicao };
}
