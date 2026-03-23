import { NavBar } from "../pages/navBar";

export class NavBarActions {
  readonly navBar: NavBar;

  constructor(navBar: NavBar) {
    this.navBar = navBar;
  }

  async openHamburgerMenu() {
    await this.navBar.navBar_hamburger_menu.click();
  }

  async navigateDashboardDesktop(val: string) {
    return this.navBar.navigateDashboardDesktop(val).click();
  }

  async navigateDashboardMobile(val: string) {
    return this.navBar.navigateDashboardMobile(val).click();
  }

  async navigateTriggerDashboard() {
    await this.navBar.navbar_dashboard_trigger_desktop.click();
  }

  async navigateToHomePageDesktop() {
    await this.navBar.navBar_home_link_desktop.click();
  }

  async navigateToContactPageDesktop() {
    await this.navBar.navBar_contact_link_desktop.click();
  }

  async navigateToHomePageMobile() {
    await this.navBar.navBar_home_link_mobile.click();
  }

  async navigateToContactPageMobile() {
    await this.navBar.navBar_contact_link_mobile.click();
  }

  async navigateToCartPage() {
    await this.navBar.narBar_cart_button.click();
  }

  async logout() {
    await this.navBar.narBar_logout_button.click();
  }
}
