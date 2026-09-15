
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Tempo máximo para cada teste inteiro (padrão é 30s, aumentando por segurança)
  timeout: 30_000,

  expect: {
    // Tempo máximo para cada expect() individual (padrão é 5s)
    timeout: 10_000,
  },

  use: {
    baseURL: "http://127.0.0.1:5173",
    headless: true,

    // Guarda trace/screenshot quando o teste falha, pra facilitar debug depois
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
});