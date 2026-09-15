import { test, expect } from "@playwright/test";

test("deve criar uma conta, fazer login e logout", async ({ page }) => {

  page.on("pageerror", (error) => {
    console.log("ERRO NO NAVEGADOR:", error.message);
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log("CONSOLE.ERROR:", msg.text());
    }
  });

  const email = `teste.${Date.now()}@email.com`;
  const senha = "Senha@123";

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /login de usuário/i })
  ).toBeVisible();

  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/senha/i).fill(senha);

  await page.getByRole("button", { name: /criar conta/i }).click();

  await expect(
    page.getByText(/usuário cadastrado com sucesso/i)
  ).toBeVisible({ timeout: 15_000 });

  await expect(
    page.getByRole("heading", { name: /login de usuário/i })
  ).toBeVisible();

  await expect(page.getByLabel(/email/i)).toHaveValue("");
  await expect(page.getByLabel(/senha/i)).toHaveValue("");

  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/senha/i).fill(senha);

  await page.getByRole("button", { name: /^entrar$/i }).click();

  await expect(page).toHaveURL(/\/usuarios/, { timeout: 15_000 });

  await expect(
    page.getByRole("heading", { name: /que bom ver você de volta/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /^Voltar para a tela de login$/i }).click();

  await expect(
    page.getByRole("heading", { name: /login de usuário/i })
  ).toBeVisible();
});