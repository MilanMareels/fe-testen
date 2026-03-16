import { expect } from "@playwright/test";
import { test } from "../fixtures/page.fixtures";

test.describe("Home Page", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); 
  });

  test("Must load the home page successfully", async ({ page }) => {
    await expect(page.locator(".home-page")).toBeVisible();
  });

   test("Must have title", async ({ page }) => {
    await expect(page.locator(".home-section-title")).toBeVisible();
  });
});