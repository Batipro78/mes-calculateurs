import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sur le PC (8 Go) : un seul processus de generation des pages, sinon le build est tue faute de
  // memoire. Chez Cloudflare (Workers Builds, WORKERS_CI=1) : reglage par defaut.
  experimental: { cpus: process.env.WORKERS_CI ? undefined : 1 },
};

export default nextConfig;
