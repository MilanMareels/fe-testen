import { expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

export class HomePageValidator {
  readonly homePage: HomePage;

  constructor(homePage: HomePage) {
    this.homePage = homePage;
  }

  async checkHomePageLoaded(): Promise<void> {
    await expect(this.homePage.page).toHaveURL(/\/$/);

    const cookies = await this.homePage.page.context().cookies();
    const tokenCookie = cookies.find((cookie) => cookie.name === "token");

    expect(tokenCookie).toBeDefined();
  }

  async checkIfHomePageHasHero(): Promise<void> {
    await expect(this.homePage.home_hero).toBeVisible();
  }

  async checkIfHomePageHasSearchSection(): Promise<void> {
    await expect(this.homePage.home_search_section).toBeVisible();
  }

  async checkIfHomePageHasProductsSection(): Promise<void> {
    await expect(this.homePage.home_products_section).toBeVisible();
  }

  async checkNavigationToCartPage(): Promise<void> {
    await expect(this.homePage.page).toHaveURL(/.*cart/);
    await expect(this.homePage.card_page).toBeVisible();
  }

  async checkProductDetailPageLoaded(): Promise<void> {
    await expect(this.homePage.page).toHaveURL(/.*product/);
    await expect(this.homePage.product_detail_page).toBeVisible();
  }

  async checkSearchForProduct(productName: string): Promise<void> {
    await this.homePage.page.waitForTimeout(2000);
    await expect(this.homePage.product_name).toHaveText(productName);
  }

  async checkSearchNotActivated(): Promise<void> {
    const products = this.homePage.page.locator("#product-name");
    await this.homePage.page.waitForTimeout(500);
    await expect(products).toHaveCount(12);
  }

  async checkHomePageErrorMessage(): Promise<void> {
    await expect(this.homePage.home_error_message).toBeVisible();
    await expect(this.homePage.home_error_message).toHaveText("No products found.");
  }

  async checkHomeChipSectionUpdates(text: string): Promise<void> {
    await expect(this.homePage.home_section_chip).toBeVisible();
    await expect(this.homePage.home_section_chip).toHaveText(text);
  }
}
