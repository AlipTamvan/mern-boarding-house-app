import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  //Get The Sign In Button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("alip@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Berhasil")).toBeVisible();
  await expect(page.getByRole("link", { name: "Kos Saya" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Booking Saya" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Daftar Sekarang" }).click();

  await expect(page.getByRole("heading", { name: "Buat Akun" })).toBeVisible();

  await page.locator("[name=firstName]").fill("aku");
  await page.locator("[name=lastName]").fill("kita");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "Buat Akun" }).click();

  await expect(page.getByText("Register Berhasil")).toBeVisible();
  await expect(page.getByRole("link", { name: "Kos Saya" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Booking Saya" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
