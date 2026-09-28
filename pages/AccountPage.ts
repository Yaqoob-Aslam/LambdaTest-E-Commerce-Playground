import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Account dashboard (`account/account`) and its navigation links. */
export class AccountPage extends BasePage {
  readonly heading: Locator;
  readonly editAccountLink: Locator;
  readonly passwordLink: Locator;
  readonly addressBookLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly newsletterLink: Locator;
  readonly downloadsLink: Locator;
  readonly rewardLink: Locator;
  readonly returnsLink: Locator;
  readonly continueButton: Locator;
  readonly alertSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'My Account' });
    this.editAccountLink = page.getByRole('link', { name: 'Edit Account' });
    this.passwordLink = page.getByRole('link', { name: 'Password' });
    this.addressBookLink = page.getByRole('link', { name: 'Address Book' });
    this.orderHistoryLink = page.getByRole('link', { name: 'Order History' });
    this.newsletterLink = page.getByRole('link', { name: 'Newsletter' });
    this.downloadsLink = page.getByRole('link', { name: 'Downloads' });
    this.rewardLink = page.getByRole('link', { name: 'Reward Points' });
    this.returnsLink = page.getByRole('link', { name: 'Returns' });
    this.continueButton = page.getByRole('link', { name: 'Continue' }).first();
    this.alertSuccess = page.locator('.alert-success').first();
  }

  async open(): Promise<void> {
    await this.goto(URLS.account);
  }

  async openEditAccount(): Promise<void> {
    await this.goto(URLS.editAccount);
  }

  async openPassword(): Promise<void> {
    await this.goto(URLS.password);
  }

  async openNewsletter(): Promise<void> {
    await this.goto(URLS.newsletter);
  }

  async openDownloads(): Promise<void> {
    await this.goto(URLS.downloads);
  }

  async openRewardPoints(): Promise<void> {
    await this.goto(URLS.reward);
  }

  async logout(): Promise<void> {
    await this.goto(URLS.logout);
  }
}
