-- Tabela usada pelo CRUD de avaliações.
-- Rode este script uma vez no SQL Editor do Neon (ou Supabase).
CREATE TABLE IF NOT EXISTS avaliacoes (
  id           SERIAL PRIMARY KEY,
  filme_id     TEXT        NOT NULL,
  filme_titulo TEXT        NOT NULL,
  autor        TEXT        NOT NULL,
  nota         INTEGER     NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario   TEXT        NOT NULL DEFAULT '',
  criado_em    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
