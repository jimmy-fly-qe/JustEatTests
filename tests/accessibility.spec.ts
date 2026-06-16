import { test, expect } from '../src/fixtures/fixtures';
import AxeBuilder from '@axe-core/playwright';


test.describe('Just Eat - Accessibility (a11y) Audits', () => {

    test('Just Eat Menu Page should have no automatically detectable accessibility defects', async ({ homePage, searchResultsPage, pizzaRestaurantPage, page }) => {

        // 1. Reuse your POM methods to get to the menu page cleanly
        await test.step('Given I navigate to the Testville restaurant menu page', async () => {
            await homePage.searchPostcode('AR51 1AA');
            await searchResultsPage.selectPizzaRestaurant('CrossSelling Pizzas Test - Do Not Edit');

            // Reuses the locator you defined in PizzaRestaurantPage to verify the page is loaded
            await pizzaRestaurantPage.selectMenuSection.waitFor({ state: 'visible' });
        });

        // 2. Run the accessibility audit against the fully loaded DOM
        await test.step('When the axe-core scan executes against WCAG 2.2 AA standards', async () => {
            const accessibilityScanResults = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
                .analyze();

            const criticalViolations = accessibilityScanResults.violations.filter(
                violation => violation.impact === 'critical'
            );

            // 3. Assert that no accessibility violations are present
            expect(criticalViolations).toEqual([]);
        });
    });
});