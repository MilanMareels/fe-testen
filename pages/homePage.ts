import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // Sections
  readonly home_hero: Locator;
  readonly home_search_section: Locator;
  readonly home_products_section: Locator;
  readonly home_section_chip: Locator;

  // Texts...
  readonly product_name: Locator;

  // Errors
  readonly home_error_message: Locator;

  // Links and buttons
  readonly home_cta_primary: Locator;
  readonly home_cta_secondary: Locator;

  // Inputs
  readonly home_search_input: Locator;

  // Naviagtion Check To Other Page
  readonly card_page: Locator;
  readonly product_detail_page: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sections
    this.home_hero = page.locator("#home-hero");
    this.home_search_section = page.locator("#home-search-section");
    this.home_products_section = page.locator("#home-products-section");
    this.home_section_chip = page.locator("#home-section-chip");

    // Errors
    this.home_error_message = page.locator("#home-error-message");

    // Texts...
    this.product_name = page.locator("#product-name");

    // Links and buttons
    this.home_cta_primary = page.locator("#home-cta-primary");
    this.home_cta_secondary = page.locator("#home-cta-secondary");

    // Inputs
    this.home_search_input = page.locator("#home-search-input");

    // Naviagtion Check To Other Page
    this.card_page = page.locator("#card-page");
    this.product_detail_page = page.locator("#product-detail-page");
  }

  getMiniCard(index: number): Locator {
    return this.page.locator(`#home-mini-card-${index}`);
  }
}
