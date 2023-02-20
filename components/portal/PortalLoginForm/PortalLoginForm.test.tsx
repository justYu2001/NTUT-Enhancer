import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";

import PortalLoginForm from "./PortalLoginForm";
import { it } from "@/tests/fixture";

describe("Portal Login Form", () => {
    it("the login button should be disabled when all inputs are empty", () => {
        render(<PortalLoginForm />);

        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("the login button should be disabled when the password input is empty", async ({ user }) => {
        const { container } = render(<PortalLoginForm />);

        const studentIDInput = container.querySelector("#student-id") as HTMLInputElement;
        await user.type(studentIDInput, "a");

        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("the login button should be disabled when the student id input is empty", async ({ user }) => {
        const { container } = render(<PortalLoginForm />);

        const passwordInput = container.querySelector("#password") as HTMLInputElement;
        await user.type(passwordInput, "a");

        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("the login button should be enabled when the login form is finished", async ({ user }) => {
        const { container } = render(<PortalLoginForm />);

        const studentIDInput = container.querySelector("#student-id") as HTMLInputElement;
        await user.type(studentIDInput, "a");

        const passwordInput = container.querySelector("#password") as HTMLInputElement;
        await user.type(passwordInput, "a");

        expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("the login button should be disabled after clicking", async ({ user }) => {
        const { container } = render(<PortalLoginForm />);

        const studentIDInput = container.querySelector("#student-id") as HTMLInputElement;
        await user.type(studentIDInput, "a");

        const passwordInput = container.querySelector("#password") as HTMLInputElement;
        await user.type(passwordInput, "a");

        const handleLoginFormSubmit = vi.fn((event: Event) => event.preventDefault());

        const form = container.querySelector("form") as HTMLFormElement;
        form.onsubmit = handleLoginFormSubmit;

        const loginButton = screen.getByRole("button");
        await user.click(loginButton);

        expect(loginButton).toBeDisabled();
        expect(handleLoginFormSubmit).toHaveBeenCalled();
    });

    it("the login button should be disabled after pressing the enter key", async ({ user }) => {
        const { container } = render(<PortalLoginForm />);

        const studentIDInput = container.querySelector("#student-id") as HTMLInputElement;
        await user.type(studentIDInput, "a");

        const passwordInput = container.querySelector("#password") as HTMLInputElement;
        await user.type(passwordInput, "a");

        const loginButton = screen.getByRole("button");

        const handleLoginFormSubmit = vi.fn((event: Event) => event.preventDefault());

        const form = container.querySelector("form") as HTMLFormElement;
        form.onsubmit = handleLoginFormSubmit;

        await user.keyboard("{Enter}");

        expect(loginButton).toBeDisabled();
        expect(handleLoginFormSubmit).toHaveBeenCalled();
    });
});