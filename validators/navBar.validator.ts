import { expect } from "@playwright/test";
import { NavBar } from "../pages/navBar";

export class NavBarValidator {
  readonly navBar: NavBar;

  constructor(navBar: NavBar) {
    this.navBar = navBar;
  }

  async checkIfNavBarIsLoaded(): Promise<void> {
    await expect(this.navBar.navBar_section).toBeVisible();
  }

  async checkIfNavBarHasHamburgerMenu(): Promise<void> {
    await expect(this.navBar.navBar_hamburger_menu).toBeVisible();
  }

  async checkIfNavBarHasWelcomeText(email: string): Promise<void> {
    await expect(this.navBar.navBar_welcome_text).toHaveText(`Welcome, ${email}`);
    await expect(this.navBar.navBar_welcome_text).toBeVisible();
  }

  async checkIfNavBarHasLogo(): Promise<void> {
    await expect(this.navBar.navBar_logo).toBeVisible();
  }

  async checkIfNavBarHasLinks(): Promise<void> {
    await expect(this.navBar.navBar_links).toBeVisible();
  }

  async checkIfNavBarHasCartButton(): Promise<void> {
    await expect(this.navBar.narBar_cart_button).toBeVisible();
  }

  async checkIfNavBarHasLogoutButton(): Promise<void> {
    await expect(this.navBar.narBar_logout_button).toBeVisible();
  }

  async checkIfNavBarCanNavigateToHomePage(): Promise<void> {
    await this.navBar.page.waitForURL("**/");
  }

  async checkIfNavBarCanNavigateToDashboard(val: string): Promise<void> {
    await this.navBar.page.waitForURL(`**/dashboard/${val}`);
  }

  async checkIfNavBarCanNavigateToContactPage(): Promise<void> {
    await this.navBar.page.waitForURL("**/contact");
  }

  async checkIfNavBarCanNavigateToCartPage(): Promise<void> {
    await this.navBar.page.waitForURL("**/cart");
  }

  async checkIfNavBarCanLogout(): Promise<void> {
    await this.navBar.page.waitForURL("**/login");
  }
}
