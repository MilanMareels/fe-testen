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
    await this.homePage.page.waitForTimeout(2000);
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

  async checkFilterPanel(): Promise<void> {
    await this.homePage.page.waitForTimeout(2000);
    await expect(this.homePage.filer_panel).toBeVisible();
  }

  async checkProductsSortedAsc(): Promise<void> {
    await this.homePage.page.waitForTimeout(2000);
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async checkProductsSortedDesc(): Promise<void> {
    await this.homePage.page.waitForTimeout(2000);
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  async checkProductsMinPrice(minPrice: number): Promise<void> {
    await this.homePage.page.waitForTimeout(2000);
    const prices = await this.getProductPrices();

    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(minPrice);
    }
  }

  async checkProductsMaxPrice(maxPrice: number): Promise<void> {
    await this.homePage.page.waitForTimeout(2000);
    const prices = await this.getProductPrices();

    for (const price of prices) {
      expect(price).toBeLessThanOrEqual(maxPrice);
    }
  }

  async checkFilteredProducts(options: { minPrice?: number; maxPrice?: number; sort?: "asc" | "desc" }) {
    if (options.minPrice !== undefined) {
      await this.checkProductsMinPrice(options.minPrice);
    }

    if (options.maxPrice !== undefined) {
      await this.checkProductsMaxPrice(options.maxPrice);
    }

    if (options.sort) {
      if (options.sort === "asc") {
        await this.checkProductsSortedAsc();
      } else {
        await this.checkProductsSortedDesc();
      }
    }
  }

  // helpers
  private async getProductPrices(): Promise<number[]> {
    const prices = await this.homePage.product_price.allTextContents();
    return prices.map((price) => parseFloat(price.replace("€", "").replace(",", ".")));
  }
}
