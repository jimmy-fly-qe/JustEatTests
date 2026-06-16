# Just Eat - Playwright + TypeScript Automation Framework

A scalable, production-ready end-to-end (E2E) smoke and accessibility testing framework built with Playwright and TypeScript. This portfolio framework targets a dynamic live e-commerce ecosystem, demonstrating advanced test automation architecture patterns, strict type safety, data-driven testing (DDT), and automated accessibility compliance auditing.

---

## 🚀 Key Framework Features

* **Robust Page Object Model (POM):** Complete decoupling of UI selectors and interaction mechanics from test assertions, ensuring maximum script maintainability and readability.
* **Custom Dependency Injection (Fixtures):** Uses Playwright's `test.extend` to automatically inject pre-instantiated page objects directly into test contexts, cutting down on test file setup boilerplate.
* **Data-Driven Testing (DDT):** Seamlessly sources dynamic test inputs across external Excel spreadsheets (`TestData.xlsx`) parsed via the `ExcelReader` utility.
* **Layered Test Strategy:** Segregates test cases into optimized regression suites utilizing Playwright tags (e.g., executing `@smoke` paths independently of full test coverage blocks).
* **Automated Accessibility Gating:** Integrates `@axe-core/playwright` to run automated accessibility compliance scanners against global **WCAG 2.2 AA standards**.
* **Self-Documenting BDD Steps:** Wraps functional UI journeys inside native `test.step('Given/When/Then')` blocks to ensure generated HTML test execution reports are instantly understandable by non-technical stakeholders (e.g., Product Managers, Business Analysts).

---

## 🛠️ Tech Stack & Dependencies

* **Language:** TypeScript (Strict Type Checking)
* **Test Runner:** Playwright (Native async/await model, robust auto-waiting)
* **Data Parsing Engine:** `xlsx` (via `ExcelReader.ts`)
* **Accessibility Auditing:** `@axe-core/playwright`

---

## 📦 Project Structure

```text
├── src/
│   ├── fixtures/
│   │   └── fixtures.ts            # Custom test context extensions & PO instantiation
│   ├── pages/                     # Page Object Model definition layers
│   │   ├── BasketPage.ts          # Order options, totals verification, and state logic
│   │   ├── HomePage.ts            # Landing, address lookup, and cookie banner handling
│   │   ├── LoginPage.ts           # Authentication gate verification
│   │   ├── PizzaRestaurantPage.ts # Item selection and checkout progression mechanics
│   │   └── SearchResultsPage.ts   # Restaurant listing and filtering controls
│   └── utils/
│       └── ExcelReader.ts         # Excel workbook parsing utility engine
├── test-data/                     # Centralized storage for data-driven payloads
│   └── TestData.xlsx              # External spreadsheet for dynamic test scenarios
├── tests/                         # Test suite specification executions
│   ├── accessibility.spec.ts      # Automated WCAG 2.2 AA accessibility scan suite
│   ├── JustEatTests.spec.ts       # Comprehensive functional E2E validation flows
│   └── smokeTests.spec.ts         # High-priority core path execution suite (@smoke)
├── playwright.config.ts           # Core engine configuration (timeouts, workers, runners)
├── package.json                   # Project metadata and script aliases
└── README.md                      # Framework architecture documentation
```
---

## 🏗️ Architectural & Testing Strategy Decisions

### Target Environment Strategy: Live Production vs. Staging
This framework deliberately operates against a live production environment (`just-eat.co.uk`) to showcase how the locator architecture cleanly isolates elements within a high-density, real-world React application utilizing dynamic content, content delivery networks (CDNs), and global client traffic. 

> **Enterprise Note:** In a commercial enterprise engineering lifecycle, running frequent automated regressions directly against a live production system introduces infrastructure instability risks, geolocation variations, and analytics pollution. In a commercial environment, this framework is engineered to seamlessly redirect toward isolated **Staging, Sandbox, or UAT environments** via a central `baseURL` configuration operating over pre-seeded mock user databases.

### Resilient Selector Strategy
This codebase completely avoids brittle, auto-generated CSS paths or fragile text-match arrays that break upon code compilation updates. Instead, it prioritizes explicit, QA-dedicated semantic attributes provided by development (`data-qa="..."`). 

Where logical state confirmation is required—such as checking the selection state of a mutual exclusivity radio button component (Delivery vs. Collection)—selectors use chained attribute constraints (`input[data-qa="..."][value="delivery"]`) to evaluate the underlying HTML node state directly rather than guessing via stylistic CSS layouts.

---

## 🏃 Getting Started

### Prerequisites
* **Node.js:** v18 or higher recommended.

### Installation
1. Clone the repository to your local directory.
2. Install the necessary node dependencies:
   ```bash
   npm install
   ```
3. Install the required isolated Playwright browser binaries:
   ```bash
   npx playwright install 
   ```

### Project Execution Scripts
Execute tests cleanly using predefined project shorthand script aliases:

* **Run All Test Specifications (Headless):** `npm run test`
* **Run Critical Smoke Suite:** `npm run test:smoke`
* **Run Tests with Browser UI Visible:** `npm run test:headed`
* **Open Interactive HTML Test Report:** `npm run report`

---

## 🔮 Future Roadmap (Scaling Opportunities)
If given more time to build this framework out into a larger team ecosystem, the immediate next technical milestones would be:

1. **API Seeding Integration:** Introduce `playwright.request` hooks to directly inject authentication tokens or mock empty cart payloads via backend REST API calls, bypassing lengthier UI setup clicks.
2. **Visual Regression Testing:** Incorporate Playwright's native `toHaveScreenshot()` to catch pixel-level styling bugs and visual anomalies across complex responsive layout breakpoints.