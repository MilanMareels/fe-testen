import { test } from "../fixtures/page.fixtures";
import { HomePageValidator } from "../validators/homePage.validator";
import { HomePageActions } from "../actions/homePage.actions";

const SEARCH_INPUT: string = "Notebook";
const SEARCH_INPUT_RESULT: string = "Notebook";

test.describe("Home Page", () => {
  let homePageActions: HomePageActions;
  let homePageValidator: HomePageValidator;

  test.beforeEach(async ({ homePage }) => {
    homePageActions = new HomePageActions(homePage);
    homePageValidator = new HomePageValidator(homePage);

    await homePageActions.navigateToHomePage();
  });

  // Load checks

  test("Must successfully load home page with valid token", async () => {
    await homePageValidator.checkHomePageLoaded();
  });

  test("Must successfully see hero section", async () => {
    await homePageValidator.checkIfHomePageHasHero();
  });

  test("Must successfully see search section", async () => {
    await homePageValidator.checkIfHomePageHasSearchSection();
  });

  test("Must successfully see products section", async () => {
    await homePageValidator.checkIfHomePageHasProductsSection();
  });

  // Naviagation checks
  test("Must successfully navigate to cart page", async () => {
    await homePageActions.navigateToCartPage();
    await homePageValidator.checkNavigationToCartPage();
  });

  test("Must navigate to product details via mini card", async () => {
    for (let i = 1; i <= 6; i++) {
      await homePageActions.navigateToProductDetailPageByMiniCard(i);
      await homePageValidator.checkProductDetailPageLoaded();
      await homePageActions.navigateToHomePage();
    }
  });

  // Filter checks
  test("Must successfully search for a product", async () => {
    await homePageActions.searchForProduct(SEARCH_INPUT);
    await homePageValidator.checkSearchForProduct(SEARCH_INPUT_RESULT);
  });

  test("Must successfully search for a product when search is in uppercase", async () => {
    await homePageActions.searchForProduct(SEARCH_INPUT.toUpperCase());
    await homePageValidator.checkSearchForProduct(SEARCH_INPUT_RESULT);
  });

  test("Must successfully search for a product when search is in lowercase", async () => {
    await homePageActions.searchForProduct(SEARCH_INPUT.toLocaleLowerCase());
    await homePageValidator.checkSearchForProduct(SEARCH_INPUT_RESULT);
  });

  test("Must successfully search for a product when search is minimal", async () => {
    await homePageActions.searchForProduct(SEARCH_INPUT.substring(0, 3)); // Not
    await homePageValidator.checkSearchForProduct(SEARCH_INPUT_RESULT);
  });

  test("Must not search when less than 3 characters are typed", async () => {
    await homePageActions.searchForProduct(SEARCH_INPUT.substring(0, 2)); // No
    await homePageValidator.checkSearchNotActivated();
  });

  test("Must show error message when no search products if found", async () => {
    await homePageActions.searchForProduct("blablablabla");
    await homePageValidator.checkHomePageErrorMessage();
  });

  test("Must update chip cound when searching for a product", async () => {
    await homePageActions.searchForProduct(SEARCH_INPUT);
    await homePageValidator.checkHomeChipSectionUpdates("1 items");
  });
});
