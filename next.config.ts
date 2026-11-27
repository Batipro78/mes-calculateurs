import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sur le PC (8 Go) : un seul processus de generation des pages, sinon le build est tue faute de
  // memoire. Sur un serveur de build (GitHub Actions, CI=true) : reglage par defaut.
  experimental: { cpus: process.env.CI ? undefined : 1 },
};

export default nextConfig;
