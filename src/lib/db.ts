import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("A variável de ambiente DATABASE_URL não está configurada.");
  }
  return neon(url);
}
