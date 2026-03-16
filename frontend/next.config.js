/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera um site estático completo em /out — compatível com Google Cloud Storage
  output: 'export',
  // Garante que cada rota gere um index.html dentro de sua pasta
  trailingSlash: true,
  // Desabilita a otimização de imagens (não suportada em export estático)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
