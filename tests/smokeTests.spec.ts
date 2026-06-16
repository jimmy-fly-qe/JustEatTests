import { test, expect } from '../src/fixtures/fixtures';

test.describe('Just Eat - Critical Smoke Suite', { tag: '@smoke' }, () => {

    test('Verify core homepage elements and navigation', async ({ homePage, page }) => {
        await test.step('When I land on the homepage', async () => {
            // homePage fixture automatically opens URL and clears cookies
            await expect(page).toHaveTitle(/Just Eat/);
        });

        await test.step('Then the main search interface should be functional', async () => {
            await expect(homePage.searchAddressBox).toBeVisible();
        });
    });

    test('Verify absolute critical checkout path baseline', async ({ homePage, searchResultsPage, pizzaRestaurantPage, loginPage, page }) => {
        await test.step('Given a baseline search for a valid location', async () => {
            await homePage.searchPostcode('AR51 1AA');
        });

        await test.step('When navigating to a standard partner restaurant', async () => {
            await searchResultsPage.selectPizzaRestaurant('CrossSelling Pizzas Test - Do Not Edit');
        });

        await test.step('And adding an item to progress to the gateway', async () => {
            await pizzaRestaurantPage.addFoodToBasket();
            await pizzaRestaurantPage.goToCheckout();
        });

        await test.step('Then the user should safely hit the checkout authentication wall', async () => {
            await expect(page).toHaveTitle(loginPage.pageTitle);
        });
    });
});