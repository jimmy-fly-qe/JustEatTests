import { Locator, Page, expect } from '@playwright/test';

export class BasketPage {

    readonly page: Page;
    readonly basketTotal: Locator;
    readonly deliveryOption: Locator;
    readonly collectionOption: Locator;
    readonly checkoutButton: Locator;


    constructor(page:Page) {
        this.page = page;

        this.deliveryOption = page.locator('input[data-qa="service-type-switcher-item-element"][value="delivery"]')
        this.collectionOption = page.locator('input[data-qa="service-type-switcher-item-element"][value="pickup"]')
        this.basketTotal = page.locator('[data-qa="cart-expanded-summary-total"]');    
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    }

    async checkOrderOptions() {
        await expect(this.basketTotal).toBeVisible();
        await expect(this.deliveryOption).toBeVisible();
        await expect(this.collectionOption).toBeVisible();

        await expect(this.deliveryOption).toBeChecked();
        await expect(this.collectionOption).not.toBeChecked();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}