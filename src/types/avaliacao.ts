export interface Avaliacao {
  id: number;
  filme_id: string;
  filme_titulo: string;
  autor: string;
  nota: number;
  comentario: string;
  criado_em: string;
}

export type AvaliacaoInput = Pick<
  Avaliacao,
  "filme_id" | "filme_titulo" | "autor" | "nota" | "comentario"
>;

export type AvaliacaoUpdate = Pick<Avaliacao, "autor" | "nota" | "comentario">;
