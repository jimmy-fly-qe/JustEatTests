import { Locator, Page } from '@playwright/test';

export class HomePage {

    readonly page: Page;

    readonly searchAddressBox : Locator;
    readonly expectedAddress : Locator;
    readonly cachePopUp : Locator;

    constructor(page:Page) {
        this.page = page;

        this.searchAddressBox = page.locator('[data-qa="location-panel-search-input-address-element"]'); 
        this.cachePopUp = page.locator('[data-test-id="actions-necessary-only"]')
        this.expectedAddress = page.getByText("Testville, AR51 1AA");  
    }

    async goToURL() {
        await this.page.goto("https://www.just-eat.co.uk/");
        await this.cachePopUp.waitFor();
        await this.cachePopUp.click();
    }

    async searchPostcode(keyword: string) {
        await this.searchAddressBox.fill(keyword);
        await this.expectedAddress.waitFor();
        await this.expectedAddress.click();
    }
}
