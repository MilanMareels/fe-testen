import { test } from "../fixtures/page.fixtures";
import { HomePageValidator } from "../validators/homePage.validator";
import { HomePageActions } from "../actions/homePage.actions";

const SEARCH_INPUT: string = "Notebook";
const SEARCH_INPUT_RESULT: string = "Notebook";
const MIN_PRICE: number = 20;
const MAX_PRICE: number = 100;
const SORT_ORDER_ASC: string = "asc";
const SORT_ORDER_DESC: string = "desc";

test.describe("Home Page Load Checks", () => {
  let homePageActions: HomePageActions;
  let homePageValidator: HomePageValidator;

  test.beforeEach(async ({ homePage }) => {
    homePageActions = new HomePageActions(homePage);
    homePageValidator = new HomePageValidator(homePage);

    await homePageActions.navigateToHomePage();
  });

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
});

test.describe("Home Page Naviagation checks", () => {
  let homePageActions: HomePageActions;
  let homePageValidator: HomePageValidator;

  test.beforeEach(async ({ homePage }) => {
    homePageActions = new HomePageActions(homePage);
    homePageValidator = new HomePageValidator(homePage);

    await homePageActions.navigateToHomePage();
  });

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

  test("Must navigate to product details via card", async () => {
    for (let i = 1; i <= 12; i++) {
      await homePageActions.navigateToProductDetailPageByCard(i);
      await homePageValidator.checkProductDetailPageLoaded();
      await homePageActions.navigateToHomePage();
    }
  });
  // todo propduct card check details nog doen!
});

test.describe("Home Page Search Checks", () => {
  let homePageActions: HomePageActions;
  let homePageValidator: HomePageValidator;

  test.beforeEach(async ({ homePage }) => {
    homePageActions = new HomePageActions(homePage);
    homePageValidator = new HomePageValidator(homePage);

    await homePageActions.navigateToHomePage();
  });

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

test.describe("Home Page Filter checks", () => {
  let homePageActions: HomePageActions;
  let homePageValidator: HomePageValidator;

  test.beforeEach(async ({ homePage }) => {
    homePageActions = new HomePageActions(homePage);
    homePageValidator = new HomePageValidator(homePage);

    await homePageActions.navigateToHomePage();
  });

  test("Must successfully open filter dropdown", async () => {
    await homePageActions.clickFilterButton();
    await homePageValidator.checkOpenFilterPanel();
  });

  test("Must successfully close filter dropdown", async () => {
    await homePageActions.clickFilterButton(); // Open click
    await homePageActions.clickFilterButton(); // Close click
    await homePageValidator.checkCloseFilterPanel();
  });

  test("Must successfully close filter dropdown when clear filters", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.clickClearFilterButton();
    await homePageValidator.checkCloseFilterPanel();
  });

  test("Must successfully filter products when min price is set", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.setMinPrice(MIN_PRICE);
    await homePageValidator.checkProductsMinPrice(MIN_PRICE);
  });

  test("Must successfully filter products when max price is set", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.setMaxPrice(MAX_PRICE);
    await homePageValidator.checkProductsMaxPrice(MAX_PRICE);
  });

  test("Must successfully filter products from high to low price", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.filterBy(SORT_ORDER_DESC);
    await homePageValidator.checkProductsSortedDesc();
  });

  test("Must successfully filter products from low to high price", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.filterBy(SORT_ORDER_ASC);
    await homePageValidator.checkProductsSortedAsc();
  });

  test("Must filter products by min/max price and sort Low to High", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.applyFilters({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_ASC,
    });
    await homePageValidator.checkFilteredProducts({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_ASC,
    });
  });

  test("Must filter products by min/max price and sort High to Low", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.applyFilters({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_DESC,
    });
    await homePageValidator.checkFilteredProducts({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_DESC,
    });
  });

  test("Must successfullyLow resert and close filter dropdown", async () => {
    await homePageActions.clickFilterButton(); // Open
    await homePageActions.applyFilters({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_DESC,
    });
    await homePageActions.clickClearFilterButton();
    await homePageActions.clickFilterButton(); // Terug open voor checks
    await homePageValidator.checkIfFiltersAreReset();
  });
});
