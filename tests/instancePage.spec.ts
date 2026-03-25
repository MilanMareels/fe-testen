import { test } from "../fixtures/page.fixtures";
import { HomePageActions } from "../actions/homePage.actions";
import { InstancePageAction } from "../actions/instancePage.actions";
import { InstancePageValidator } from "../validators/instancePage.validator";

test.describe("Instance Page Load Checks", () => {
  let homePageActions: HomePageActions;
  let instancePageActions: InstancePageAction;
  let instancePageValidator: InstancePageValidator;
  let viewport: any = null;

  test.beforeEach(async ({ instancePage, homePage }) => {
    instancePageActions = new InstancePageAction(instancePage);
    instancePageValidator = new InstancePageValidator(instancePage);
    homePageActions = new HomePageActions(homePage);

    viewport = instancePage.page.viewportSize();

    await homePageActions.navigateToHomePage();
    await instancePageActions.navigateToInstancePage();
  });

  test("Must successfully load instance page", async () => {
    await instancePageValidator.checkInstancePageLoaded();
  });

  test("Must successfully load instance grid", async () => {
    await instancePageValidator.checkIfInstanceGridIsLoaded();
  });

  test("Must successfully load instance name top text", async () => {
    await instancePageValidator.checkIfInstanceTopTextNameIsLoaded();
  });

  test("Must successfully load instance customer top text", async () => {
    await instancePageValidator.checkIfInstanceTopTextCustomerIsLoaded();
  });

  test("Must successfully load instance detials", async () => {
    await instancePageActions.clickInstanceSelectButton();
    await instancePageValidator.checkIfInstanceTopTextCustomerIsLoaded();
  });

  test("Must successfully load instance detials name", async () => {
    await instancePageActions.clickInstanceSelectButton();
    await instancePageValidator.checkIfInstanceDetailsNameIsLoaded();
  });

  test("Must successfully load instance detials admins list", async () => {
    await instancePageActions.clickInstanceSelectButton();
    await instancePageValidator.checkIfInstanceDetailsAdminsListIsLoaded();
  });

  test("Must successfully load instance detials users list", async () => {
    await instancePageActions.clickInstanceSelectButton();
    await instancePageValidator.checkIfInstanceDetailsAdminsListIsLoaded();
  });

  test("Must successfully load instance modal card", async () => {
    await instancePageActions.clickInstanceCreateButton();
    await instancePageValidator.checkIfInstanceModalCardIsLoaded();
  });

  test("Must successfully load instance modal card instance name input", async () => {
    await instancePageActions.clickInstanceCreateButton();
    await instancePageValidator.checkIfInstanceModalCardInstanceNameInputIsLoaded();
  });

  test("Must successfully load instance modal card instance customer input", async () => {
    await instancePageActions.clickInstanceCreateButton();
    await instancePageValidator.checkIfInstanceModalCardInstanceCustomerInputIsLoaded();
  });
});

test.describe("Instance Page Input Checks", () => {
  let homePageActions: HomePageActions;
  let instancePageActions: InstancePageAction;
  let instancePageValidator: InstancePageValidator;
  let viewport: any = null;

  let instanceToDelete: string | null = null;

  test.beforeEach(async ({ instancePage, homePage }) => {
    instancePageActions = new InstancePageAction(instancePage);
    instancePageValidator = new InstancePageValidator(instancePage);
    homePageActions = new HomePageActions(homePage);

    viewport = instancePage.page.viewportSize();

    await homePageActions.navigateToHomePage();
    await instancePageActions.navigateToInstancePage();
  });

  test.afterEach(async () => {
    if (instanceToDelete) {
      await instancePageActions.deleteInstance(instanceToDelete);
      instanceToDelete = null;
    }
  });

  test("Must not succesfully create instance without name and customer", async () => {
    await instancePageActions.clickInstanceCreateButton();
    await instancePageActions.clickModalConfirmButton();
    await instancePageValidator.checkIfErrorIsDisplayed("Please fill in all fields.");
  });

  test("Must not succesfully create instance without customer", async () => {
    const uniqueId = Math.random().toString(36).substring(2, 8);

    const uniqueInstanceName = `Inst-${uniqueId}`;

    await instancePageActions.clickInstanceCreateButton();
    await instancePageActions.fillInstanceNameInput(uniqueInstanceName);
    await instancePageActions.clickModalConfirmButton();
    await instancePageValidator.checkIfErrorIsDisplayed("Please fill in all fields.");
  });

  test("Must not succesfully create instance without name", async () => {
    const uniqueId = Math.random().toString(36).substring(2, 8);

    const uniqueInstanceCustomer = `Cust-${uniqueId}`;

    await instancePageActions.clickInstanceCreateButton();
    await instancePageActions.fillInstanceCustomerInput(uniqueInstanceCustomer);
    await instancePageActions.clickModalConfirmButton();
    await instancePageValidator.checkIfErrorIsDisplayed("Please fill in all fields.");
  });

  test("Must succesfully create instance with name and customer", async () => {
    const uniqueId = Math.random().toString(36).substring(2, 8);

    const uniqueInstanceName = `Inst-${uniqueId}`;
    const uniqueInstanceCustomer = `Cust-${uniqueId}`;

    instanceToDelete = uniqueInstanceName;

    await instancePageActions.clickInstanceCreateButton();
    await instancePageActions.fillInstanceNameInput(uniqueInstanceName);
    await instancePageActions.fillInstanceCustomerInput(uniqueInstanceCustomer);
    await instancePageActions.clickModalConfirmButton();
  });
});
