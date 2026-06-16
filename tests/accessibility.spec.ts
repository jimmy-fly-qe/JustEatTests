import { test, expect } from '../src/fixtures/fixtures';
import AxeBuilder from '@axe-core/playwright';


test.describe('Just Eat - Accessibility (a11y) Audits', () => {

    test('Just Eat Menu Page should have no automatically detectable accessibility defects', async ({ homePage, searchResultsPage, pizzaRestaurantPage, page }) => {

        await test.step('Given I navigate to the Testville restaurant menu page', async () => {
            await homePage.searchPostcode('AR51 1AA');
            await searchResultsPage.selectPizzaRestaurant('CrossSelling Pizzas Test - Do Not Edit');
            await pizzaRestaurantPage.selectMenuSection.waitFor({ state: 'visible' });
        });

        await test.step('When the axe-core scan executes against WCAG 2.2 AA standards', async () => {
            const accessibilityScanResults = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
                .analyze();

            const criticalViolations = accessibilityScanResults.violations.filter(
                violation => violation.impact === 'critical'
            );

            expect(criticalViolations).toEqual([]);
        });
    });
});