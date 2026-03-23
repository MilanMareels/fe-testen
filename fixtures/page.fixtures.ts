import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { NavBar } from "../pages/navBar";

type PageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  navBar: NavBar;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
});
