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
}
