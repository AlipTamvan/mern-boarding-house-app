import { test, expect } from "@playwright/test";
import path from "path";

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

test("Should Allow User To Add A Hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="phoneNumber"]').fill("081");
  await page.locator('[name="city"]').fill("Mataram");
  await page.locator('[name="country"]').fill("Pagutan");
  await page.locator('[name="description"]').fill("Jaya Jaya Jaya");

  await page.locator('[name="price"]').fill("123");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("3");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
    path.join(__dirname, "files", "3.jpg"),
  ]);

  await page.getByRole("button", { name: "Simpan" }).click();
  await expect(page.getByRole("button", { name: "Menyimpan" })).toBeVisible();
  await expect(page.getByText("Hotel Berhasil Di Tambahkan")).toBeVisible({
    timeout: 25000,
  });
});
