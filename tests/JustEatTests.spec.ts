import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { PizzaRestaurantPage } from '../src/pages/PizzaRestaurantPage';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Just Eat - End to End Order Flow', () => {
    let homePage: HomePage;
    let searchResultsPage: SearchResultsPage;
    let pizzaRestaurantPage: PizzaRestaurantPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
        pizzaRestaurantPage = new PizzaRestaurantPage(page);
        loginPage = new LoginPage(page);

        // Handles initial navigation globally
        await homePage.goToURL();
    });

    test('Verify location search functionality', async ({ page }) => {
        await test.step('When I search for location "AR51 1AA"', async () => {
            await homePage.searchPostcode("AR51 1AA");
        });

        await test.step('Then I should see a list of restaurants delivering to Testville', async () => {
            await expect(page).toHaveTitle("Restaurants and takeaways in AR51, Area51 | Just Eat");
        });
    });

    test('Order Pizza and checkout basket', async ({ page }) => {
        await test.step('Given the user searches for restaurants in "AR51 1AA"', async () => {
            await homePage.searchPostcode("AR51 1AA");
        });

        await test.step('And access the chosen pizza restaurant', async () => {
            await searchResultsPage.selectPizzaRestaurant("CrossSelling Pizzas Test - Do Not Edit");
        });

        await test.step('When I add the items from the menu and view the basket', async () => {
            await pizzaRestaurantPage.addFoodToBasket();
            await pizzaRestaurantPage.goToCheckout();
        });

        await test.step('Then I should see login page before checkout possible', async () => {
            await expect(page).toHaveTitle("Just Eat | Sign in/Login");
        });
    });
});