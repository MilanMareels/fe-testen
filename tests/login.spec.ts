import { test } from "../fixtures/page.fixtures";
import { LoginPageActions } from "../actions/loginPage.actions";
import { LoginPageValidator } from "../validators/loginPage.validator";

const VALID_USER = "playwrighttester@gmail.com";
const VALID_PASSWORD = "test123";

const INVALID_USER = "invaliduser@gmail.com";
const INVALID_PASSWORD = "invalidpassword";

const INVALID_CREDENTIALS_MESSAGE = "Invalid login credentials.";
const USER_NOT_FOUND_MESSAGE = "User not found.";
const REQUIRED_FIELDS_MESSAGE = "Please enter an email and password.";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Page", () => {
  let loginPageActions: LoginPageActions;
  let loginPageValidator: LoginPageValidator;

  test.beforeEach(async ({ loginPage }) => {
    loginPageActions = new LoginPageActions(loginPage);
    loginPageValidator = new LoginPageValidator(loginPage);
  });

  // HAPPY PATH

  test("Must successfully login with valid standard user credentials and navigate to the inventory page", async () => {
    await loginPageActions.login(VALID_USER, VALID_PASSWORD);
    await loginPageValidator.checkSuccessfulLogin();
  });

  test("Must successfully login by pressing the Enter key instead of clicking the button", async () => {
    await loginPageActions.loginWithEnter(VALID_USER, VALID_PASSWORD);
    await loginPageValidator.checkSuccessfulLogin();
  });

  test.skip("Must successfully login when email has leading and trailing spaces", async () => {
    await loginPageActions.login(`   ${VALID_USER}   `, VALID_PASSWORD);
    await loginPageValidator.checkSuccessfulLogin();
  });

    test("Must successfully login when email is in uppercase", async () => {
    await loginPageActions.login(VALID_USER.toUpperCase(), VALID_PASSWORD);
    await loginPageValidator.checkSuccessfulLogin();
  });

  // EMPTY FIELDS

  test("Must show native browser validation when both fields are empty", async ({ loginPage }) => {
    await loginPageActions.login("", "");
    await loginPageValidator.checkNativeValidationMessage(loginPage.userNameInput);
  });

  test("Must show native browser validation when only email is empty", async ({ loginPage }) => {
    await loginPageActions.login("", VALID_PASSWORD);
    await loginPageValidator.checkNativeValidationMessage(loginPage.userNameInput);
  });

  test("Must show native browser validation when only password is empty", async ({ loginPage }) => {
    await loginPageActions.login(VALID_USER, "");
    await loginPageValidator.checkNativeValidationMessage(loginPage.passwordInput);
  });

  // INVALID CREDENTIALS

  test("Must show error message when login with invalid email", async () => {
    await loginPageActions.login(INVALID_USER, VALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(USER_NOT_FOUND_MESSAGE);
  });

  test("Must show error message when login with invalid password", async () => {
    await loginPageActions.login(VALID_USER, INVALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(INVALID_CREDENTIALS_MESSAGE);
  });

  test("Must show error message when password contains accidental trailing space", async () => {
    await loginPageActions.login(VALID_USER, `${VALID_PASSWORD} `);
    await loginPageValidator.checkErrorMessageAfterBadLogin(INVALID_CREDENTIALS_MESSAGE);
  });

  // UPPERCASE / LOWERCASE TESTING

  test("Must show error message when login with invalid email is in uppercase", async () => {
    await loginPageActions.login(INVALID_USER.toUpperCase(), VALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(USER_NOT_FOUND_MESSAGE);
  });

  test("Must show error message when login with invalid password is in uppercase", async () => {
    await loginPageActions.login(VALID_USER, INVALID_PASSWORD.toUpperCase());
    await loginPageValidator.checkErrorMessageAfterBadLogin(INVALID_CREDENTIALS_MESSAGE);
  });

  test("Must show error message when login with valid password is in uppercase", async () => {
    await loginPageActions.login(VALID_USER, VALID_PASSWORD.toUpperCase());
    await loginPageValidator.checkErrorMessageAfterBadLogin(INVALID_CREDENTIALS_MESSAGE);
  });

  // SECURITY & EDGE CASES

  test("Must reject SQL injection attempts in the email field gracefully", async () => {
    const sqlInjectionAttempt = "OR 1=1 --";
    await loginPageActions.loginWithoutValidation(sqlInjectionAttempt, VALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(USER_NOT_FOUND_MESSAGE);
  });

  test("Must reject XSS string in the email field gracefully", async () => {
    const xssAttempt = "<script>alert('xss')</script>";
    await loginPageActions.loginWithoutValidation(xssAttempt, VALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(USER_NOT_FOUND_MESSAGE);
  });

  test("Must handle extremely long inputs gracefully", async () => {
    const longString = "a".repeat(300) + "@gmail.com";
    await loginPageActions.login(longString, VALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(USER_NOT_FOUND_MESSAGE);
  });

  // Nog naar backend doen.
  test.skip("Must lock account or show rate limit message after 5 failed attempts", async () => {
    for (let i = 0; i < 5; i++) {
      await loginPageActions.login(VALID_USER, INVALID_PASSWORD);
    }
    await loginPageActions.login(VALID_USER, INVALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin("Too many failed attempts. Please try again later.");
  });

  test("Must reject login when 'required' attribute is removed and email is left empty", async () => {
    await loginPageActions.loginWithRemovedRequiredEmailAttribute(VALID_PASSWORD);
    await loginPageValidator.checkErrorMessageAfterBadLogin(REQUIRED_FIELDS_MESSAGE);
  });

  test("Must reject login when 'required' attribute is removed and password is left empty", async () => {
    await loginPageActions.loginWithRemovedRequiredPasswordAttribute(VALID_USER);
    await loginPageValidator.checkErrorMessageAfterBadLogin(REQUIRED_FIELDS_MESSAGE);
  });
});
