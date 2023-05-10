import { describe, expect } from "vitest";

import { it } from "./fixture";

describe("popup localization", () => {
    it("chinese", async ({ page, popupPageUrl }) => {
        await page.goto(popupPageUrl);

        await page.addInitScript((language) => {
            window.localStorage.setItem("i18nextLng", language);
        }, "zh");

        await page.reload();

        expect(await page.getByText("北科入口網站").textContent()).toBe("北科入口網站");
        expect(await page.getByText("專案連結").textContent()).toBe("專案連結");
        expect(await page.getByRole("paragraph").textContent()).toBe("北科程式設計研究社");
    });

    it("english", async ({ page, popupPageUrl }) => {
        await page.goto(popupPageUrl);

        await page.addInitScript((language) => {
            window.localStorage.setItem("i18nextLng", language);
        }, "en");

        await page.reload();

        expect(await page.getByText("NTUT Portal").textContent()).toBe("NTUT Portal");
        expect(await page.getByText("Project Link").textContent()).toBe("Project Link");
        expect(await page.getByRole("paragraph").textContent()).toBe("NTUT Programming Club");
    });

    it("unsupported language", async ({ page, popupPageUrl }) => {
        await page.goto(popupPageUrl);

        await page.addInitScript((language) => {
            window.localStorage.setItem("i18nextLng", language);
        }, "de");

        await page.reload();

        expect(await page.getByText("NTUT Portal").textContent()).toBe("NTUT Portal");
        expect(await page.getByText("Project Link").textContent()).toBe("Project Link");
        expect(await page.getByRole("paragraph").textContent()).toBe("NTUT Programming Club");
    });

    it("switch chinese to english", async ({ page, popupPageUrl }) => {
        await page.goto(popupPageUrl);

        await page.addInitScript((language) => {
            window.localStorage.setItem("i18nextLng", language);
        }, "zh");

        await page.reload();

        await page.getByText("English").click();

        expect(await page.getByText("NTUT Portal").textContent()).toBe("NTUT Portal");
        expect(await page.getByText("Project Link").textContent()).toBe("Project Link");
        expect(await page.getByRole("paragraph").textContent()).toBe("NTUT Programming Club");
    });

    it("switch english to chinese", async ({ page, popupPageUrl }) => {
        await page.goto(popupPageUrl);

        await page.addInitScript((language) => {
            window.localStorage.setItem("i18nextLng", language);
        }, "en");

        await page.reload();

        await page.getByText("中文").click();

        expect(await page.getByText("北科入口網站").textContent()).toBe("北科入口網站");
        expect(await page.getByText("專案連結").textContent()).toBe("專案連結");
        expect(await page.getByRole("paragraph").textContent()).toBe("北科程式設計研究社");
    });

    it("switch unsupported language to chinese", async ({ page, popupPageUrl }) => {
        await page.goto(popupPageUrl);

        await page.addInitScript((language) => {
            window.localStorage.setItem("i18nextLng", language);
        }, "de");

        await page.reload();

        await page.getByText("中文").click();

        expect(await page.getByText("北科入口網站").textContent()).toBe("北科入口網站");
        expect(await page.getByText("專案連結").textContent()).toBe("專案連結");
        expect(await page.getByRole("paragraph").textContent()).toBe("北科程式設計研究社");
    });
});