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

  test.fail("Must successfully navigate to product section", async () => {
    await homePageActions.navigateToProductSection();
    await homePageValidator.checkNavigationToProductSection();
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
    await homePageValidator.checkHomePageErrorMessage("No products found.");
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

  test("Must not filter products when min price is greater than max price", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.applyFilters({
      minPrice: MAX_PRICE, // 100
      maxPrice: MIN_PRICE, // 20
    });
    await homePageValidator.checkHomePageErrorMessage("Minimum price cannot be greater than maximum price.");
  });

  test("Must not filter products when min price and max price are extrramely high", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.applyFilters({
      minPrice: 500, // Fix naar een var doen
      maxPrice: 10000, // Fix naar een var doen
    });
    await homePageValidator.checkHomePageErrorMessage("No products found."); // Error message naar een var doen
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

  test("Must filter products by min/max price and sort High to Low with search term", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.applyFilters({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_DESC,
    });
    await homePageActions.searchForProduct("Bag");
    await homePageValidator.checkFilteredProducts({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      sort: SORT_ORDER_DESC,
    });
    await homePageValidator.checkSearchForProduct("Bag");
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

  test("Must not filter products when min price is negative", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.setMinPrice(-1);
    await homePageValidator.checkHomePageErrorMessage("Minimum price cannot be less than 0.");
  });

  test("Must not filter products when max price is negative", async () => {
    await homePageActions.clickFilterButton();
    await homePageActions.setMaxPrice(-1);
    await homePageValidator.checkHomePageErrorMessage("Maximum price cannot be less than 0.");
  });
});

test.describe("Value checks", () => {
  let homePageActions: HomePageActions;
  let homePageValidator: HomePageValidator;

  test.beforeEach(async ({ homePage }) => {
    homePageActions = new HomePageActions(homePage);
    homePageValidator = new HomePageValidator(homePage);

    await homePageActions.navigateToHomePage();
  });

  test("Products must have correct exchange rate (Euro sign)", async () => {
    await homePageValidator.checkProductPriceExchangeRate();
  });

  test("Products must have images", async () => {
    await homePageValidator.checkIfProductImagesAreVisible();
  });

  test("Products chip must correct amout of products", async () => {
    await homePageValidator.checkIfChipHasCorrectAmount(12); // Naar var doen
  });
});
