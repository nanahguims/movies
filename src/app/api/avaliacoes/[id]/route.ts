import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { validarCampos } from "../validacao";

type Context = { params: Promise<{ id: string }> };

async function lerId(context: Context): Promise<number | null> {
  const { id } = await context.params;
  const numero = Number(id);
  return Number.isInteger(numero) ? numero : null;
}

// UPDATE — PUT /api/avaliacoes/:id
export async function PUT(request: NextRequest, context: Context) {
  try {
    const id = await lerId(context);
    if (id === null) return NextResponse.json({ error: "ID inválido." }, { status: 400 });

    const body = await request.json();
    const erro = validarCampos(body);
    if (erro) return NextResponse.json({ error: erro }, { status: 400 });

    const sql = getSql();
    const rows = await sql`
      UPDATE avaliacoes
      SET autor = ${body.autor.trim()}, nota = ${Number(body.nota)},
          comentario = ${body.comentario ?? ""}
      WHERE id = ${id}
      RETURNING *`;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Avaliação não encontrada." }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar avaliação." }, { status: 500 });
  }
}

// DELETE — DELETE /api/avaliacoes/:id
export async function DELETE(_request: NextRequest, context: Context) {
  try {
    const id = await lerId(context);
    if (id === null) return NextResponse.json({ error: "ID inválido." }, { status: 400 });

    const sql = getSql();
    const rows = await sql`DELETE FROM avaliacoes WHERE id = ${id} RETURNING id`;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Avaliação não encontrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao remover avaliação." }, { status: 500 });
  }
}
