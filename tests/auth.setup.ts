import { test as setup } from '../fixtures/page.fixtures'; 
import { LoginPageActions } from '../actions/loginPage.actions';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ loginPage, page }) => {
  const loginPageActions = new LoginPageActions(loginPage);

  await loginPageActions.login('playwrighttester@gmail.com', 'test123');

  await page.waitForURL('**/');

  await page.context().storageState({ path: authFile });
});