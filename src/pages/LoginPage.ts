import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    readonly pageTitle = 'Just Eat | Sign in/Login';

    constructor(page: Page) {
        this.page = page;
    }
}