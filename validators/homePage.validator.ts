import { expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

const GLOBAL_WAIT_TIME: number = 2000;

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

  async checkNavigationToProductSection(): Promise<void> {
    await expect(this.homePage.page).toHaveURL("/#products");
    await expect(this.homePage.home_products_section).toBeVisible();
  }

  async checkProductDetailPageLoaded(): Promise<void> {
    await expect(this.homePage.page).toHaveURL(/.*product/);
    await expect(this.homePage.product_detail_page).toBeVisible();
  }

  async checkSearchForProduct(productName: string): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.homePage.product_name).toHaveText(productName);
  }

  async checkSearchNotActivated(): Promise<void> {
    const products = this.homePage.product_name;
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(products).toHaveCount(12);
  }

  async checkHomePageErrorMessage(errorMessage: string): Promise<void> {
    await expect(this.homePage.home_error_message).toBeVisible();
    await expect(this.homePage.home_error_message).toHaveText(errorMessage);
  }

  async checkHomeChipSectionUpdates(text: string): Promise<void> {
    await expect(this.homePage.home_section_chip).toBeVisible();
    await expect(this.homePage.home_section_chip).toHaveText(text);
  }

  async checkOpenFilterPanel(): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.homePage.filer_panel).toBeVisible();
  }
  async checkCloseFilterPanel(): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.homePage.filer_panel).not.toBeVisible();
  }

  async checkProductsSortedAsc(): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async checkProductsSortedDesc(): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  async checkProductsMinPrice(minPrice: number): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    const prices = await this.getProductPrices();

    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(minPrice);
    }
  }

  async checkProductsMaxPrice(maxPrice: number): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    const prices = await this.getProductPrices();

    for (const price of prices) {
      expect(price).toBeLessThanOrEqual(maxPrice);
    }
  }

  async checkFilteredProducts(options: { minPrice?: number; maxPrice?: number; sort?: string }) {
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

  async checkIfFiltersAreReset(): Promise<void> {
    await this.homePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    const minFilter = await this.homePage.filter_min_price_input;
    const maxFilter = await this.homePage.filter_max_price_input;
    const sortFilter = await this.homePage.filter_sort_select;

    await expect(minFilter).toHaveValue(""); // Geen waarden meer in select
    await expect(maxFilter).toHaveValue(""); // Geen waarden meer in select
    await expect(sortFilter).toHaveValue("asc"); // Standaard gesorteerd naar asc
    await this.checkProductsSortedAsc(); // Standaard gesorteerd naar asc
  }

  async checkProductPriceExchangeRate(): Promise<void> {
    const priceLocators = this.homePage.product_price;

    await priceLocators.first().waitFor();

    const count = await priceLocators.count();
    expect(count).toBe(12);

    for (let i = 0; i < count; i++) {
      await expect(priceLocators.nth(i)).toContainText("€");
    }
  }

  async checkIfProductImagesAreVisible(): Promise<void> {
    const imageLocators = this.homePage.product_image;

    await imageLocators.first().waitFor();

    const count = await imageLocators.count();
    expect(count).toBe(12);

    for (let i = 0; i < count; i++) {
      await expect(imageLocators.nth(i)).toBeVisible();
    }
  }

  async checkIfChipHasCorrectAmount(amount: number): Promise<void> {
    const products = this.homePage.product_name;

    await products.first().waitFor();

    const count = await products.count();

    expect(count).toBe(amount);

    await expect(this.homePage.home_section_chip).toHaveText(`${amount} items`);
  }

  // helpers
  private async getProductPrices(): Promise<number[]> {
    const prices = await this.homePage.product_price.allTextContents();
    return prices.map((price) => parseFloat(price.replace("€", "").replace(",", ".")));
  }
}
