import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { PizzaRestaurantPage } from '../pages/PizzaRestaurantPage';
import { BasketPage } from '../pages/BasketPage';


type MyFixtures = {
    homePage: HomePage;
    searchResultsPage: SearchResultsPage;
    pizzaRestaurantPage: PizzaRestaurantPage;
    loginPage: LoginPage;
    basketPage: BasketPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goToURL();
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
    basketPage: async ({ page }, use) => {
        await use(new BasketPage(page));
    },
});

export { expect } from '@playwright/test';