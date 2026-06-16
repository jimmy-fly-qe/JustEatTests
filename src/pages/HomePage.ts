import { Locator, Page } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly searchAddressBox : Locator;
    readonly cookieConsentButton : Locator;

    constructor(page:Page) {
        this.page = page;

        this.searchAddressBox = page.locator('[data-qa="location-panel-search-input-address-element"]'); 
        this.cookieConsentButton = page.locator('[data-test-id="actions-necessary-only"]')
    }

    async goToURL() {
        await this.page.goto("https://www.just-eat.co.uk/");
        await this.cookieConsentButton.waitFor();
        await this.cookieConsentButton.click();
    }

    async searchPostcode(postcode: string) {
        await this.searchAddressBox.fill(postcode);

        const dynamicSuggestion = this.page.getByText(postcode).first();

        await dynamicSuggestion.waitFor({ state: 'visible' });
        await dynamicSuggestion.click();
    }
}
