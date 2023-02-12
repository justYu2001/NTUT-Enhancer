import { resolve } from "path";

import userEvent from "@testing-library/user-event";
import dotenv from "dotenv";
import type { BrowserContext, Page } from "playwright";
import { chromium } from "playwright";
import { test as base } from "vitest-fixture";
import { z } from "zod";

const envSchema = z.object({
    studentID: z.string().min(1),
    password: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

interface TestFixtures {
    browser: BrowserContext;
    page: Page;
    user: ReturnType<typeof userEvent.setup>;
    env: Env;
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
        page.setDefaultTimeout(60_000);
        await use(page);
    },
    user: async ({}, use) => {
        const user = userEvent.setup();
        await use(user);
    },
    env: async ({}, use) => {
        dotenv.config();

        const env = {
            studentID: process.env.studentID,
            password: process.env.password,
        };
        
        const parsedEnv = envSchema.safeParse(env);

        if (!parsedEnv.success) {
            throw new Error("Invalid environment variables");
        }

        await use(parsedEnv.data);
    }
});