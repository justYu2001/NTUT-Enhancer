import { resolve } from "path";

import userEvent from "@testing-library/user-event";
import dotenv from "dotenv";
import type { BrowserContext, Page } from "playwright";
import { chromium } from "playwright";
import { test } from "vitest-fixture";
import { z } from "zod";

const envSchema = z.object({
    STUDENT_ID: z.string().min(1),
    PASSWORD: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

interface TestFixtures {
    browser: BrowserContext;
    page: Page;
    extensionId: string;
    popupPageUrl: string;
    user: ReturnType<typeof userEvent.setup>;
    env: Env;
}

export const it = test.extend<TestFixtures>({
    browser: async ({}, use) => {
        const pathToExtension = resolve(__dirname, "../build/chrome-mv3-prod");

        const browser = await chromium.launchPersistentContext("", {
            headless: false,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
            locale: "zh",
        });

        await use(browser, async () => {
            browser.close();
        });
    },
    page: async ({ browser }, use) => {
        const page = await browser.newPage();
        page.setDefaultTimeout(60_000);
        await use(page);
    },
    extensionId: async ({ browser }, use) => {
        let [background] = browser.serviceWorkers();

        if (!background) {
            background = await browser.waitForEvent("serviceworker");
        }

        const extensionId = background.url().split("/")[2];
        await use(extensionId);
    },
    popupPageUrl: async ({ extensionId }, use) => {
        const popupPageUrl = `chrome-extension://${extensionId}/popup.html`;
        await use(popupPageUrl);
    },
    user: async ({}, use) => {
        const user = userEvent.setup();
        await use(user);
    },
    env: async ({}, use) => {
        dotenv.config();

        const env = {
            STUDENT_ID: process.env.STUDENT_ID,
            PASSWORD: process.env.PASSWORD,
        };

        const parsedEnv = envSchema.safeParse(env);

        if (!parsedEnv.success) {
            throw new Error("Invalid environment variables");
        }

        await use(parsedEnv.data);
    },
});
