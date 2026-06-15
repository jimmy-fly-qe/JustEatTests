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

        this.selectMenuSection = page.getByRole('button', { name: 'Pizzas' });
        this.foodChoice = page.getByLabel('Add Margherita to the basket');
        this.foodSize = page.locator(".single-selection-style_text__EFHuZ:has-text('13\"')");
        this.addToOrderButton = page.locator("text='Add'");
        this.checkoutButton = page.locator("text='Checkout ('");
    }

    async addFoodToBasket() {
        await this.selectMenuSection.click();
        await this.foodChoice.click();
        await this.foodSize.click();
        await this.addToOrderButton.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}