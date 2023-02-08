import { resolve } from "path";

import type { BrowserContext, Page } from "playwright";
import { chromium } from "playwright";
import { test as base } from "vitest-fixture";

interface TestFixtures {
    browser: BrowserContext;
    page: Page;
}

export const test = base.extend<TestFixtures>({
    browser: async ({}, use) => {
        const pathToExtension = resolve(__dirname, "../dist");

        const browser = await chromium.launchPersistentContext("", {
            headless: false,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });

        await use(browser, async () => {
            browser.close();
        });
    },
    page: async ({ browser }, use) => {
        const page = await browser.newPage();
        await use(page);
    },
});