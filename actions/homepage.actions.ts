import { HomePage } from "../pages/homePage";

export class HomePageActions {
  readonly homePage: HomePage;

  constructor(homePage: HomePage) {
    this.homePage = homePage;
  }

  async navigateToHomePage() {
    await this.homePage.page.goto("/");
  }

  async navigateToCartPage() {
    await this.homePage.home_cta_primary.click();
  }

  async navigateToProductDetailPageByMiniCard(index: number) {
    await this.homePage.getMiniCard(index).click();
  }

  async searchForProduct(productName: string) {
    await this.homePage.home_search_input.fill(productName);
  }

  async clickFilterButton() {
    await this.homePage.filter_button.click();
  }

  async filterBy(sort: string) {
    const select = this.homePage.filter_sort_select;
    await select.click();
    const label = sort === "asc" ? "Price: Low to High" : "Price: High to Low";
    await select.selectOption({ label });
  }

  async setMinPrice(value: number) {
    const input = this.homePage.filter_min_price_input;
    await input.fill("");
    await input.fill(value.toString());
    await input.dispatchEvent("change");
  }

  async setMaxPrice(value: number) {
    const input = this.homePage.filter_max_price_input;
    await input.fill("");
    await input.fill(value.toString());
    await input.dispatchEvent("change");
  }

  async applyFilters(options: { minPrice?: number; maxPrice?: number; sort?: "asc" | "desc" }) {
    if (options.minPrice !== undefined) {
      await this.setMinPrice(options.minPrice);
    }

    if (options.maxPrice !== undefined) {
      await this.setMaxPrice(options.maxPrice);
    }

    if (options.sort) {
      const select = this.homePage.filter_sort_select;
      await select.click();

      const label = options.sort === "asc" ? "Price: Low to High" : "Price: High to Low";
      await select.selectOption({ label });
    }
  }
}
