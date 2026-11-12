import type { NextConfig } from "next";

// Antes: output "export" (site estático para o GitHub Pages).
// Agora o app roda no Vercel com back-end (rotas em src/app/api).
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
