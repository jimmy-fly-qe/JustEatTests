import { Page, Locator } from '@playwright/test';

export class PizzaRestaurantPage {

    readonly page: Page;
    readonly selectMenuSection: Locator;
    readonly foodChoice: Locator;
    readonly foodSize: Locator;
    readonly addToOrderButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page:Page) {
        this.page = page;

        this.foodChoice = page.getByLabel('Add Margherita to the basket');
        this.foodSize = page.getByText('13"', { exact: true });        
        this.addToOrderButton = page.getByRole('button', { name: 'Add' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout (' });
    }

    async addFoodToBasket() {
        await this.foodChoice.click();
        await this.foodSize.click();
        await this.addToOrderButton.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}