import { Page, Locator } from "@playwright/test";

export class InstancePage {
  readonly page: Page;

  // Sections
  readonly instance_container: Locator;
  readonly instance_grid: Locator;
  readonly instance_detail_section: Locator;
  readonly instance_details_admins_list: Locator;
  readonly instance_details_users_list: Locator;
  readonly instance_modal_card: Locator;

  // Texts...
  readonly instance_title: Locator;
  readonly instance_name_text: Locator;
  readonly instance_customer_text: Locator;
  readonly instance_details_name: Locator;

  // Image

  // Errors
  readonly modal_error_display: Locator;

  // Links and buttons
  readonly instance_create_button: Locator;
  readonly instance_select_button: Locator;
  readonly instance_modal_confirm_button: Locator;
  readonly instance_modal_cancel_button: Locator;

  // Inputs
  readonly instance_input_name: Locator;
  readonly instance_input_customer: Locator;

  // Naviagtion Check To Other Page

  constructor(page: Page) {
    this.page = page;

    // Sections
    this.instance_container = page.locator("#instances-container");
    this.instance_grid = page.locator("#instances-grid");
    this.instance_detail_section = page.locator("#instance-detail-section");
    this.instance_details_admins_list = page.locator("#instance-detail-admins-list");
    this.instance_details_users_list = page.locator("#instance-detail-users-list");
    this.instance_modal_card = page.locator("#instance-modal-card");

    // Texts...
    this.instance_title = page.locator("#instances-title");
    this.instance_name_text = page.locator("#instance-name-text");
    this.instance_customer_text = page.locator("#instance-customer-text");
    this.instance_details_name = page.locator("#detail-instance-name");

    // Image

    // Errors
    this.modal_error_display = page.locator("#modal-error-display");

    // Links and buttons
    this.instance_create_button = page.locator("#create-instance-btn");
    this.instance_select_button = page.locator("#instance-select-btn-29b798b2-8372-4c2b-9c85-ad4d3d90e627"); // Fix voor UUID
    this.instance_modal_confirm_button = page.locator("#modal-confirm-btn");
    this.instance_modal_cancel_button = page.locator("#modal-cancel-btn");

    // Inputs
    this.instance_input_name = page.locator("#input-instance-name");
    this.instance_input_customer = page.locator("#input-customer-name");

    // Naviagtion Check To Other Page
  }
}
