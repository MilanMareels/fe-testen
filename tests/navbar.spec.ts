import { test } from "../fixtures/page.fixtures";
import { NavBarActions } from "../actions/navbar.actions";
import { NavBarValidator } from "../validators/navBar.validator";
import { HomePageActions } from "../actions/homePage.actions";

const VALID_EMAIL = "playwrighttester@gmail.com";

const dasboardNavLinksDesktop = [
  {
    val: "bugs",
  },
  {
    val: "users",
  },
  {
    val: "instances",
  },
  {
    val: "admins",
  },
];

const dasboardNavLinksMobile = [
  {
    val: "bugs",
  },
  {
    val: "users",
  },
  {
    val: "instances",
  },
  {
    val: "admins",
  },
];

test.describe("NavBar Load Checks", () => {
  let homePageActions: HomePageActions;
  let navBarActions: NavBarActions;
  let navBarValidator: NavBarValidator;
  let viewport: any = null;

  test.beforeEach(async ({ navBar, homePage }) => {
    navBarActions = new NavBarActions(navBar);
    navBarValidator = new NavBarValidator(navBar);
    homePageActions = new HomePageActions(homePage);

    viewport = navBar.page.viewportSize();

    await homePageActions.navigateToHomePage();
  });

  test("Must successfully load navbar", async () => {
    await navBarValidator.checkIfNavBarIsLoaded();
  });

  test("Must successfully load hamburger menu when mobile", async () => {
    test.skip(!!viewport && viewport.width > 768, "Skipping on desktop");

    await navBarValidator.checkIfNavBarHasHamburgerMenu();
  });

  test("Must successfully show welcome text on desktop", async ({ page }) => {
    test.skip(!!viewport && viewport.width < 768, "Skipping on mobile");

    await navBarValidator.checkIfNavBarHasWelcomeText(VALID_EMAIL);
  });

  test("Must successfully show logo", async () => {
    await navBarValidator.checkIfNavBarHasLogo();
  });

  test("Must successfully show links", async () => {
    test.skip(!!viewport && viewport.width < 768, "Skipping on mobile");

    await navBarValidator.checkIfNavBarHasLinks();
  });

  test("Must successfully show cart button", async () => {
    await navBarValidator.checkIfNavBarHasCartButton();
  });

  test("Must successfully show logout button", async () => {
    await navBarValidator.checkIfNavBarHasLogoutButton();
  });
});

test.describe("NavBar Navigation Checks Desktop", () => {
  let homePageActions: HomePageActions;
  let navBarActions: NavBarActions;
  let navBarValidator: NavBarValidator;
  let viewport: any = null;

  test.beforeEach(async ({ navBar, homePage }) => {
    navBarActions = new NavBarActions(navBar);
    navBarValidator = new NavBarValidator(navBar);
    homePageActions = new HomePageActions(homePage);

    viewport = navBar.page.viewportSize();

    await homePageActions.navigateToHomePage();
  });

  test("Must successfully navigate to home page", async () => {
    test.skip(!!viewport && viewport.width < 768, "Skipping on mobile");

    await navBarActions.navigateToHomePageDesktop();
    await navBarValidator.checkIfNavBarCanNavigateToHomePage();
  });

  dasboardNavLinksDesktop.forEach((link) => {
    test(`Must successfully navigate to ${link.val} page`, async () => {
      test.skip(!!viewport && viewport.width < 768, "Skipping on mobile");

      await navBarActions.navigateTriggerDashboard();
      await navBarActions.navigateDashboardDesktop(link.val);
      await navBarValidator.checkIfNavBarCanNavigateToDashboard(link.val);
    });
  });

  test("Must successfully navigate to contact page", async () => {
    test.skip(!!viewport && viewport.width < 768, "Skipping on mobile");

    await navBarActions.navigateToContactPageDesktop();
    await navBarValidator.checkIfNavBarCanNavigateToContactPage();
  });

  test("Must successfully navigate to cart page", async () => {
    await navBarActions.navigateToCartPage();
    await navBarValidator.checkIfNavBarCanNavigateToCartPage();
  });

  test("Must successfully logout", async () => {
    await navBarActions.logout();
    await navBarValidator.checkIfNavBarCanLogout();
  });
});

test.describe("NavBar Navigation Checks Mobile", () => {
  let homePageActions: HomePageActions;
  let navBarActions: NavBarActions;
  let navBarValidator: NavBarValidator;
  let viewport: any = null;

  test.beforeEach(async ({ navBar, homePage }) => {
    navBarActions = new NavBarActions(navBar);
    navBarValidator = new NavBarValidator(navBar);
    homePageActions = new HomePageActions(homePage);

    viewport = navBar.page.viewportSize();

    await homePageActions.navigateToHomePage();
    if (!!viewport && viewport.width < 768) {
      await navBarActions.openHamburgerMenu();
    }
  });

  test("Must successfully navigate to home page", async () => {
    test.skip(!!viewport && viewport.width > 768, "Skipping on desktop");

    await navBarActions.navigateToHomePageMobile();
    await navBarValidator.checkIfNavBarCanNavigateToHomePage();
  });

  dasboardNavLinksMobile.forEach((link) => {
    test(`Must successfully navigate to ${link.val} page`, async () => {
      test.skip(!!viewport && viewport.width > 768, "Skipping on desktop");

      await navBarActions.navigateDashboardMobile(link.val);
      await navBarValidator.checkIfNavBarCanNavigateToDashboard(link.val);
    });
  });

  test("Must successfully navigate to contact page", async () => {
    test.skip(!!viewport && viewport.width > 768, "Skipping on desktop");

    await navBarActions.navigateToContactPageMobile();
    await navBarValidator.checkIfNavBarCanNavigateToContactPage();
  });

  test("Must successfully navigate to cart page", async () => {
    await navBarActions.navigateToCartPage();
    await navBarValidator.checkIfNavBarCanNavigateToCartPage();
  });

  test("Must successfully logout", async () => {
    await navBarActions.logout();
    await navBarValidator.checkIfNavBarCanLogout();
  });
});
