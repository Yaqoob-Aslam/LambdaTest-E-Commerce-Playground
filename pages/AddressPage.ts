import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import type { Address } from '../types';
import { BasePage } from './BasePage';

/**
 * Address book (`account/address`).
 */
export class AddressPage extends BasePage {
  readonly heading: Locator;
  readonly newAddressButton: Locator;
  readonly editAddressButton: Locator;
  readonly deleteAddressButton: Locator;
  readonly backButton: Locator;
  readonly alertSuccess: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly address1Input: Locator;
  readonly cityInput: Locator;
  readonly postCodeInput: Locator;
  readonly countrySelect: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Address Book/i });
    this.newAddressButton = page.getByRole('link', { name: 'New Address' });
    this.editAddressButton = page.getByRole('link', { name: 'Edit' }).first();
    this.deleteAddressButton = page.getByRole('link', { name: 'Delete' }).first();
    this.backButton = page.getByRole('link', { name: 'Back' }).first();
    this.alertSuccess = page.locator('.alert-success').first();

    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' }).first();
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' }).first();
    this.address1Input = page.getByRole('textbox', { name: 'Address 1' }).first();
    this.cityInput = page.getByRole('textbox', { name: 'City' }).first();
    this.postCodeInput = page.getByRole('textbox', { name: 'Post Code' }).first();
    this.countrySelect = page.getByRole('combobox', { name: 'Country' }).first();
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async open(): Promise<void> {
    await this.goto(URLS.addressBook);
  }

  async openNewAddress(): Promise<void> {
    await this.newAddressButton.click();
  }

  /** Fill the (new/edit) address form. */
  async fillForm(address: Address): Promise<void> {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.address1Input.fill(address.address1);
    await this.cityInput.fill(address.city);
    await this.postCodeInput.fill(address.postCode);
    await this.countrySelect.selectOption({ label: address.country });
  }

  async save(): Promise<void> {
    await this.continueButton.click();
  }
}
