import { test, expect } from "@playwright/test";

test("deve criar uma conta, fazer login e logout", async ({ page }) => {
  // Captura qualquer erro não tratado no navegador (React crash, etc)
  page.on("pageerror", (error) => {
    console.log("ERRO NO NAVEGADOR:", error.message);
  });

  // Captura logs do console do navegador (útil pra ver os console.error do Firebase)
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log("CONSOLE.ERROR:", msg.text());
    }
  });

  const email = `teste.${Date.now()}@email.com`;
  const senha = "Senha@123";

  // Abre a tela de login
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /login de usuário/i })
  ).toBeVisible();

  // Preenche os dados para criar a conta
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/senha/i).fill(senha);

  // Cria a conta, mas continua na tela de login
  await page.getByRole("button", { name: /criar conta/i }).click();

  // Espera a confirmação (toast) de que o cadastro terminou.
  // Isso garante que createUserWithEmailAndPassword + addDoc + signOut já resolveram,
  // em vez de checar a tela antes da operação assíncrona terminar.
  await expect(
    page.getByText(/usuário cadastrado com sucesso/i)
  ).toBeVisible({ timeout: 15_000 });

  // Confirma que a tela de login continua visível
  await expect(
    page.getByRole("heading", { name: /login de usuário/i })
  ).toBeVisible();

  // Confirma que os campos foram limpos após o cadastro
  await expect(page.getByLabel(/email/i)).toHaveValue("");
  await expect(page.getByLabel(/senha/i)).toHaveValue("");

  // Preenche novamente com o usuário que acabou de ser criado
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/senha/i).fill(senha);

  // Agora faz login
  await page.getByRole("button", { name: /^entrar$/i }).click();

  // Confirma que foi para a lista de usuários
  await expect(page).toHaveURL(/\/usuarios/, { timeout: 15_000 });

  await expect(
    page.getByRole("heading", { name: /que bom ver você de volta/i })
  ).toBeVisible();

  // Faz logout
  await page.getByRole("button", { name: /^Voltar para a tela de login$/i }).click();

  // Confirma o retorno à tela de login
  await expect(
    page.getByRole("heading", { name: /login de usuário/i })
  ).toBeVisible();
});