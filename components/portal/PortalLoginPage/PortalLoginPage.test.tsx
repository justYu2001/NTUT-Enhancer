import { screen } from "@testing-library/react";
import { describe } from "vitest";

import PortalLoginPage from "./PortalLoginPage";
import { it } from "tests/fixture";
import { renderWithI18next } from "tests/i18n";

describe("Portal Login Page", () => {    
    it("chinese localization", async () => {
        const { container } = await renderWithI18next(<PortalLoginPage />, "zh");

        const title = screen.getByRole("heading");
        expect(title.textContent).toBe("校園入口網站登入");
        
        const hint = container.querySelector("p") as HTMLParagraphElement;
        expect(hint.textContent).toBe("無法登入嗎？請參考登入說明或手機驗證說明");

        const loginGuideLink = screen.getByRole("link", { name: "登入說明" });
        expect(loginGuideLink.getAttribute("href")).toBe("https://cnc.ntut.edu.tw/p/404-1004-2622.php?Lang=zh-tw");

        const phoneVerificationLink = screen.getByRole("link", { name: "手機驗證說明" });
        expect(phoneVerificationLink.getAttribute("href")).toBe("https://cnc.ntut.edu.tw/p/404-1004-105989-1.php?Lang=zh-tw");
    });

    it("english localization", async () => {
        const { container } = await renderWithI18next(<PortalLoginPage />, "en");

        const title = screen.getByRole("heading");
        expect(title.textContent).toBe("Taipei Tech Portal");
        
        const hint = container.querySelector("p") as HTMLParagraphElement;
        expect(hint.textContent).toBe("Have trouble logging in? Check out the login guide or the phone number verification instructions");

        const loginGuideLink = screen.getByRole("link", { name: "the login guide" });
        expect(loginGuideLink.getAttribute("href")).toBe("https://cnc.ntut.edu.tw/p/405-1004-78559,c12299.php?Lang=en");

        const phoneVerificationLink = screen.getByRole("link", { name: "the phone number verification instructions" });
        expect(phoneVerificationLink.getAttribute("href")).toBe("https://cnc.ntut.edu.tw/p/404-1004-106254.php?Lang=en");
    });

    it("unsupported language localization", async () => {
        const { container } = await renderWithI18next(<PortalLoginPage />, "de");

        const title = screen.getByRole("heading");
        expect(title.textContent).toBe("Taipei Tech Portal");
        
        const hint = container.querySelector("p") as HTMLParagraphElement;
        expect(hint.textContent).toBe("Have trouble logging in? Check out the login guide or the phone number verification instructions");

        const loginGuideLink = screen.getByRole("link", { name: "the login guide" });
        expect(loginGuideLink.getAttribute("href")).toBe("https://cnc.ntut.edu.tw/p/405-1004-78559,c12299.php?Lang=en");

        const phoneVerificationLink = screen.getByRole("link", { name: "the phone number verification instructions" });
        expect(phoneVerificationLink.getAttribute("href")).toBe("https://cnc.ntut.edu.tw/p/404-1004-106254.php?Lang=en");
    });
});