import { Page, Locator } from "@playwright/test";

export class NavBar {
  readonly page: Page;

  // Sections
  readonly navBar_section: Locator;

  // Texts...
  readonly navBar_welcome_text: Locator;

  // Image
  readonly navBar_logo: Locator;

  // Errors

  // Links and buttons
  readonly navBar_hamburger_menu: Locator;
  readonly navBar_links: Locator;
  readonly narBar_cart_button: Locator;
  readonly narBar_logout_button: Locator;
  readonly navBar_home_link_desktop: Locator;
  readonly navBar_home_link_mobile: Locator;
  readonly navBar_contact_link_desktop: Locator;
  readonly navBar_contact_link_mobile: Locator;
  readonly navbar_dashboard_trigger_desktop: Locator;

  // Inputs

  // Naviagtion Check To Other Page

  constructor(page: Page) {
    this.page = page;

    // Sections
    this.navBar_section = page.locator("#home-navbar");

    // Errors

    // Texts...
    this.navBar_welcome_text = page.locator("#nav-welcome-message");

    // Image
    this.navBar_logo = page.locator("#nav-logo");

    // Links and buttons
    this.navBar_home_link_mobile = page.locator("#mobile-nav-home");
    this.navBar_contact_link_mobile = page.locator("#mobile-nav-contact");
    this.navBar_hamburger_menu = page.locator("#mobile-menu-trigger");
    this.navBar_links = page.locator("#desktop-nav-links");
    this.narBar_cart_button = page.locator("#nav-cart");
    this.narBar_logout_button = page.locator("#nav-logout");
    this.navBar_home_link_desktop = page.locator("#desktop-nav-home");
    this.navBar_contact_link_desktop = page.locator("#desktop-nav-contact");
    this.navbar_dashboard_trigger_desktop = page.locator("#desktop-nav-dashboard-trigger");

    // Inputs

    // Naviagtion Check To Other Page
  }

  navigateDashboardDesktop(link: string): Locator {
    return this.page.locator(`#desktop-nav-${link}`);
  }

  navigateDashboardMobile(link: string): Locator {
    return this.page.locator(`#mobile-nav-${link}`);
  }
}
