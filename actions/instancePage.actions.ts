import { InstancePage } from "../pages/instancePage";

export class InstancePageAction {
  readonly instancePage: InstancePage;

  constructor(instancePage: InstancePage) {
    this.instancePage = instancePage;
  }

  async navigateToInstancePage() {
    await this.instancePage.page.goto("/dashboard/instances");
  }

  async clickInstanceSelectButton() {
    await this.instancePage.instance_select_button.click();
  }

  async clickInstanceCreateButton() {
    await this.instancePage.instance_create_button.click();
  }

  async clickInstanceUpdateButton(name: string) {
    const instanceCard = this.instancePage.page.locator(".instance-card").filter({ hasText: name });
    await instanceCard.waitFor({ state: "visible" });

    const editButton = instanceCard.locator(".instance-edit");
    await editButton.click();
  }

  async clickModalConfirmButton() {
    await this.instancePage.instance_modal_confirm_button.click();
  }

  async clickModalCancelButton() {
    await this.instancePage.instance_modal_cancel_button.click();
  }

  async fillInstanceNameInput(name: string) {
    await this.instancePage.instance_input_name.fill(name);
  }

  async fillInstanceCustomerInput(customer: string) {
    await this.instancePage.instance_input_customer.fill(customer);
  }

  async deleteInstance(name: string) {
    const instanceCard = this.instancePage.page.locator(".instance-card").filter({ hasText: name });
    await instanceCard.waitFor({ state: "visible" });

    const deleteButton = instanceCard.locator(".instance-delete");
    await deleteButton.click();

    const confirmDeleteButton = this.instancePage.page.locator("#delete-confirm-btn");
    await confirmDeleteButton.waitFor({ state: "visible" });
    await confirmDeleteButton.click();

    await confirmDeleteButton.waitFor({ state: "hidden" });
  }
}
