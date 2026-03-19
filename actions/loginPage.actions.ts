import { LoginPage } from "../pages/loginPage";

export class LoginPageActions {
  readonly loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  async gotToLoginPage() {
    await this.loginPage.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.gotToLoginPage();
    await this.loginPage.userNameInput.fill(username);
    await this.loginPage.passwordInput.fill(password);

    await this.clickLoginButton();
  }

  async loginWithEnter(username: string, password: string): Promise<void> {
    await this.gotToLoginPage();
    await this.loginPage.userNameInput.fill(username);
    await this.loginPage.passwordInput.fill(password);

    await this.loginPage.passwordInput.press("Enter");
  }

  async clickLoginButton(): Promise<void> {
    await this.loginPage.loginButton.click();
  }

  async loginWithoutValidation(username: string, password: string) {
    await this.gotToLoginPage();

    await this.loginPage.userNameInput.fill(username);
    await this.loginPage.passwordInput.fill(password);

    await this.loginPage.page.evaluate(() => {
      const form = document.querySelector("form");
      if (form) form.setAttribute("novalidate", "true");
    });

    await this.clickLoginButton();
  }

  async loginWithRemovedRequiredEmailAttribute(password: string) {
    await this.gotToLoginPage();

    await this.loginPage.userNameInput.fill("");
    await this.loginPage.passwordInput.fill(password);

    await this.loginPage.userNameInput.evaluate((node: HTMLInputElement) => {
      node.removeAttribute("required");
    });

    await this.loginPage.page.evaluate(() => {
      const form = document.querySelector("form");
      if (form) form.setAttribute("novalidate", "true");
    });

    await this.clickLoginButton();
  }

  async loginWithRemovedRequiredPasswordAttribute(email: string) {
    await this.gotToLoginPage();

    await this.loginPage.userNameInput.fill(email);
    await this.loginPage.passwordInput.fill("");

    await this.loginPage.passwordInput.evaluate((node: HTMLInputElement) => {
      node.removeAttribute("required");
    });

    await this.loginPage.page.evaluate(() => {
      const form = document.querySelector("form");
      if (form) form.setAttribute("novalidate", "true");
    });

    await this.clickLoginButton();
  }

  async loginWithRemovedRequiredAttributes(email: string, password: string) {
    await this.gotToLoginPage();

    await this.loginPage.userNameInput.fill(email);
    await this.loginPage.passwordInput.fill(password);

    await this.loginPage.userNameInput.evaluate((node: HTMLInputElement) => {
      node.removeAttribute("required");
    });

    await this.loginPage.passwordInput.evaluate((node: HTMLInputElement) => {
      node.removeAttribute("required");
    });

    await this.loginPage.page.evaluate(() => {
      const form = document.querySelector("form");
      if (form) form.setAttribute("novalidate", "true");
    });

    await this.clickLoginButton();
  }
}
