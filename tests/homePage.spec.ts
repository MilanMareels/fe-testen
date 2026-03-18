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

  test("Must successfully open filter dropdown", async () => {
    await homePageActions.clickFilterButton();
    await homePageValidator.checkFilterPanel();
  });

  test("Must successfully filter products when min price is set", async () => {
    await homePageActions.clickFilterButton();

    await homePageActions.setMinPrice(50);
    await homePageValidator.checkProductsMinPrice(50);
  });

  test("Must successfully filter products when max price is set", async () => {
    await homePageActions.clickFilterButton();

    await homePageActions.setMaxPrice(50);
    await homePageValidator.checkProductsMaxPrice(50);
  });

  test("Must successfully filter products from high to low price", async () => {
    await homePageActions.clickFilterButton();

    await homePageActions.filterBy("desc");
    await homePageValidator.checkProductsSortedDesc();
  });

  test("Must successfully filter products from low to high price", async () => {
    await homePageActions.clickFilterButton();

    await homePageActions.filterBy("asc");
    await homePageValidator.checkProductsSortedAsc();
  });

  test("Must filter products by min/max price and sort Low to High", async () => {
    await homePageActions.clickFilterButton();

    await homePageActions.applyFilters({
      minPrice: 20,
      maxPrice: 100,
      sort: "asc",
    });

    await homePageValidator.checkFilteredProducts({
      minPrice: 20,
      maxPrice: 100,
      sort: "asc",
    });
  });
  test("Must filter products by min/max price and sort High to Low", async () => {
    await homePageActions.clickFilterButton();

    await homePageActions.applyFilters({
      minPrice: 20,
      maxPrice: 100,
      sort: "desc",
    });

    await homePageValidator.checkFilteredProducts({
      minPrice: 20,
      maxPrice: 100,
      sort: "desc",
    });
  });
});
