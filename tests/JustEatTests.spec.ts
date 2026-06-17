import { test, expect } from '../src/fixtures/fixtures';
import { ExcelReader } from '../src/utils/ExcelReader';

const testData = ExcelReader.getSheetData('Sheet1', './test-data/TestData.xlsx');

test.describe('Just Eat - End to End Order Flow', () => {

    for (const data of testData) {

        test(`Verify location search functionality - Case: ${data.RestaurantID}`, async ({ homePage, page }) => {
            await test.step(`When I search for location ${data.Postcode}`, async () => {
                await homePage.searchPostcode(data.Postcode);
            });

            await test.step(`Then I should see a list of restaurants delivering to ${data.SearchResultsTitle}`, async () => {
                await expect(page).toHaveTitle(data.SearchResultsTitle);
            });
        });

        test(`Order Pizza and checkout basket at ${data.RestaurantName}`, async ({ homePage, loginPage, searchResultsPage, pizzaRestaurantPage, basketPage, page }) => {
            await test.step(`Given the user searches for restaurants in ${data.Postcode}`, async () => {
                await homePage.searchPostcode(data.Postcode);
            })

            await test.step(`And access the chosen pizza restaurant ${data.RestaurantName}`, async () => {
                await searchResultsPage.selectPizzaRestaurant(data.RestaurantName);
            })

            await test.step('When I add the items from the menu and confirm in the basket', async () => {
                await pizzaRestaurantPage.addFoodToBasket();
                await basketPage.checkOrderOptions();
                await basketPage.goToCheckout();
            })

            await test.step(`Then I should see the login page before checkout possible`, async () => {
                await expect(page).toHaveTitle(loginPage.pageTitle);
            })
        });
    }
});