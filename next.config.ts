import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Aplica a todas las rutas del portal
        source: "/(.*)",
        headers: [
          // Previene que el portal sea embebido en un iframe externo (anti-clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Previene que el browser "adivine" el tipo MIME de un archivo subido
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controla qué información de referrer se comparte al navegar fuera del portal
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Bloquea acceso a cámara y micrófono por scripts de terceros
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
