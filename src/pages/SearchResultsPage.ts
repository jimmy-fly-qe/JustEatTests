import { Page } from '@playwright/test';

export class SearchResultsPage {

    readonly page: Page;

    constructor(page:Page) {
        this.page = page;
    }

    async selectPizzaRestaurant(text: string) {
        await this.page.getByText(text).waitFor({ state: 'visible' });
        await this.page.getByText(text).click();
    }
}
