import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // toda qualidade usada em algum next/image precisa estar listada aqui,
    // senão o Next avisa no console e serve a imagem na qualidade padrão
    qualities: [60, 70, 75, 80, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
