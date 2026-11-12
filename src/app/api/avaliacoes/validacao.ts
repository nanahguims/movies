export function validarCampos(body: Record<string, unknown>): string | null {
  const autor = typeof body.autor === "string" ? body.autor.trim() : "";
  const nota = Number(body.nota);

  if (!autor) return "Informe o seu nome.";
  if (!Number.isInteger(nota) || nota < 1 || nota > 5)
    return "A nota deve ser um número inteiro de 1 a 5.";
  if (body.comentario !== undefined && typeof body.comentario !== "string")
    return "Comentário inválido.";
  return null;
}
