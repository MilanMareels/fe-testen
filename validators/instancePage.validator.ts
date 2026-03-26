import { expect } from "@playwright/test";
import { InstancePage } from "../pages/instancePage";

const GLOBAL_WAIT_TIME: number = 2000;

export class InstancePageValidator {
  readonly instancePage: InstancePage;

  constructor(instancePage: InstancePage) {
    this.instancePage = instancePage;
  }

  async checkInstancePageLoaded(): Promise<void> {
    await expect(this.instancePage.page).toHaveURL(/.*instances/);
    await expect(this.instancePage.instance_container).toBeVisible();
    await expect(this.instancePage.instance_title).toBeVisible();
    await expect(this.instancePage.instance_create_button).toBeVisible();
  }

  async checkIfInstanceGridIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_grid).toBeVisible();
  }

  async checkIfInstanceTopTextNameIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_name_text).toBeVisible();
  }

  async checkIfInstanceTopTextCustomerIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_customer_text).toBeVisible();
  }

  async checkIfInstanceDetailSectionIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_detail_section).toBeVisible();
  }

  async checkIfInstanceDetailsNameIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_details_name).toBeVisible();
  }

  async checkIfInstanceDetailsAdminsListIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_details_admins_list).toBeVisible();
  }

  async checkIfInstanceDetailsUsersListIsLoaded(): Promise<void> {
    await this.instancePage.page.waitForTimeout(GLOBAL_WAIT_TIME);
    await expect(this.instancePage.instance_details_users_list).toBeVisible();
  }

  async checkIfInstanceModalCardIsLoaded(): Promise<void> {
    await expect(this.instancePage.instance_modal_card).toBeVisible();
  }

  async checkIfInstanceModalCardInstanceNameInputIsLoaded(value: string): Promise<void> {
    await expect(this.instancePage.instance_input_name).toBeVisible();
    await expect(this.instancePage.instance_input_name).toHaveValue(value);
  }

  async checkIfInstanceModalCardInstanceCustomerInputIsLoaded(value: string): Promise<void> {
    await expect(this.instancePage.instance_input_customer).toBeVisible();
    await expect(this.instancePage.instance_input_customer).toHaveValue(value);
  }

  async checkIfErrorIsDisplayed(text: string): Promise<void> {
    await expect(this.instancePage.modal_error_display).toHaveText(text);
  }

  async checkIfCreateInstanceFormIsReset(): Promise<void> {
    await expect(this.instancePage.instance_input_name).toHaveValue("");
    await expect(this.instancePage.instance_input_customer).toHaveValue("");
  }
}
