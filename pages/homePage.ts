import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // Sections
  readonly home_hero: Locator;
  readonly home_search_section: Locator;
  readonly home_products_section: Locator;
  readonly home_section_chip: Locator;
  readonly filer_panel: Locator;

  // Texts...
  readonly product_name: Locator;
  readonly product_price: Locator;

  // Image
  readonly product_image: Locator;

  // Errors
  readonly home_error_message: Locator;

  // Links and buttons
  readonly home_cta_primary: Locator;
  readonly home_cta_secondary: Locator;
  readonly filter_button: Locator;
  readonly filter_sort_select: Locator;
  readonly clear_filter_button: Locator;

  // Inputs
  readonly home_search_input: Locator;
  readonly filter_group_by_asc: Locator;
  readonly filter_group_by_desc: Locator;
  readonly filter_min_price_input: Locator;
  readonly filter_max_price_input: Locator;

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
    this.filer_panel = page.locator("#filter-panel");

    // Errors
    this.home_error_message = page.locator("#home-error-message");

    // Texts...
    this.product_name = page.locator("#product-name");
    this.product_price = page.locator("#product-price");

    // Image
    this.product_image = page.locator("#product-image");

    // Links and buttons
    this.home_cta_primary = page.locator("#home-cta-primary");
    this.home_cta_secondary = page.locator("#home-cta-secondary");
    this.filter_button = page.locator("#filter-button");
    this.filter_sort_select = page.locator("#filter-group-sort select");
    this.clear_filter_button = page.locator("#clear-filter-button");

    // Inputs
    this.home_search_input = page.locator("#home-search-input");
    this.filter_group_by_asc = page.locator("#filter-group-sort-asc");
    this.filter_group_by_desc = page.locator("#filter-group-sort-desc");
    this.filter_min_price_input = page.locator("#filter-group-min-price input");
    this.filter_max_price_input = page.locator("#filter-group-max-price input");

    // Naviagtion Check To Other Page
    this.card_page = page.locator("#card-page");
    this.product_detail_page = page.locator("#product-detail-page");
  }

  getMiniCard(index: number): Locator {
    return this.page.locator(`#home-mini-card-${index}`);
  }

  getCard(index: number): Locator {
    return this.page.locator(`#product-card-${index}`);
  }
}
