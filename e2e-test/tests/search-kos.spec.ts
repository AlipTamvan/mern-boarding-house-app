import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //Get The Sign In Button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("alip@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Berhasil")).toBeVisible();
});
test("Should Show Hotel Search Result", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Mau Kemana?").fill("mataram");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Kos Ditemukan Di mataram")).toBeVisible();
  await expect(page.getByText("Alip")).toBeVisible();
});
