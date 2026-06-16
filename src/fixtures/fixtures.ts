import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { PizzaRestaurantPage } from '../pages/PizzaRestaurantPage';

type MyFixtures = {
    homePage: HomePage;
    searchResultsPage: SearchResultsPage;
    pizzaRestaurantPage: PizzaRestaurantPage;
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goToURL(); // Handles global setup automatically!
        await use(homePage);
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    pizzaRestaurantPage: async ({ page }, use) => {
        await use(new PizzaRestaurantPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect } from '@playwright/test';