import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { validarCampos } from "./validacao";

// READ — GET /api/avaliacoes            → lista todas
//        GET /api/avaliacoes?filme_id=x → lista as de um filme
export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    const filmeId = request.nextUrl.searchParams.get("filme_id");

    const rows = filmeId
      ? await sql`SELECT * FROM avaliacoes WHERE filme_id = ${filmeId} ORDER BY criado_em DESC`
      : await sql`SELECT * FROM avaliacoes ORDER BY criado_em DESC`;

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao listar avaliações." }, { status: 500 });
  }
}

// CREATE — POST /api/avaliacoes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const erro = validarCampos(body);
    if (erro) return NextResponse.json({ error: erro }, { status: 400 });

    if (!body.filme_id || !body.filme_titulo) {
      return NextResponse.json({ error: "Filme não informado." }, { status: 400 });
    }

    const sql = getSql();
    const rows = await sql`
      INSERT INTO avaliacoes (filme_id, filme_titulo, autor, nota, comentario)
      VALUES (${body.filme_id}, ${body.filme_titulo}, ${body.autor.trim()},
              ${Number(body.nota)}, ${body.comentario ?? ""})
      RETURNING *`;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar avaliação." }, { status: 500 });
  }
}
