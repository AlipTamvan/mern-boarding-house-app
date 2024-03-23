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
test("Should Show Kos Search Result", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Mau Kemana?").fill("mataram");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Kos Ditemukan Di mataram")).toBeVisible();
  await expect(page.getByText("Alip")).toBeVisible();
});

test("Should Show Kos Detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Mau Kemana?").fill("mataram");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Alip").click();
  await expect(page).toHaveURL(
    "http://localhost:5173/detail/65f29e24f2596ff5c9190841"
  );
  await expect(
    page.getByRole("button", { name: "Sewa Sekarang" })
  ).toBeVisible();
});

test("Should Sewa Hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Mau Kemana?").fill("mataram");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Tanggal Check-Out").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Alip").click();
  await expect(page).toHaveURL(
    "http://localhost:5173/detail/65f29e24f2596ff5c9190841"
  );
  await page.getByRole("button", { name: "Sewa Sekarang" }).click();

  await expect(page.getByText("Total Pembayaran : Rp.45000000")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12425");

  await page.getByRole("button", { name: "Konfirmasi Sewa" }).click();
  // await expect(page.getByText("Sewa Berhasil")).toBeVisible();
  await page.getByRole("link", { name: "Booking Saya" }).click();
  await expect(page.getByText("Alip")).toBeVisible();
});
