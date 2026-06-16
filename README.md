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