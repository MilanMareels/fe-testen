import { expect, Locator } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

export class LoginPageValidator {
  readonly loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  async checkSuccessfulLogin(): Promise<void> {
    await this.loginPage.page.waitForURL("**/");

    const cookies = await this.loginPage.page.context().cookies();
    const tokenCookie = cookies.find((cookie) => cookie.name === "token");

    expect(tokenCookie).toBeDefined();
  }

  async checkErrorMessageAfterBadLogin(expectedMessage: string): Promise<void> {
    await expect(this.loginPage.errorMessage).toHaveText(expectedMessage);
  }

  async checkNativeValidationMessage(inputLocator: Locator): Promise<void> {
    const validationMessage = await inputLocator.evaluate((element: HTMLInputElement) => element.validationMessage);

    await expect(validationMessage).toBeDefined();
  }
}
