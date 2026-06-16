import { Locator, Page } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly searchAddressBox : Locator;
    readonly cachePopUp : Locator;

    constructor(page:Page) {
        this.page = page;

        this.searchAddressBox = page.locator('[data-qa="location-panel-search-input-address-element"]'); 
        this.cachePopUp = page.locator('[data-test-id="actions-necessary-only"]')
    }

    async goToURL() {
        await this.page.goto("https://www.just-eat.co.uk/");
        await this.cachePopUp.waitFor();
        await this.cachePopUp.click();
    }

    async searchPostcode(postcode: string) {
        await this.searchAddressBox.fill(postcode);

        const dynamicSuggestion = this.page.getByText(postcode).first();

        await dynamicSuggestion.waitFor({ state: 'visible' });
        await dynamicSuggestion.click();
    }
}
