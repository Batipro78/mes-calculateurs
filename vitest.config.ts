import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    // Reproduit l'alias "@/*" de tsconfig pour que les tests importent
    // comme le reste du code (ex: "@/app/lib/fmt").
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
