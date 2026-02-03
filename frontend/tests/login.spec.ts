import { test, expect } from '@playwright/test';
require('dotenv').config();

test.describe("Bejelentkezési folyamat", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.NEXT_PUBLIC_FE_URL+"/login");
    });

    test("Sikeres bejelentkezés folyamata", async ({ page }) => {
        // Arrange
        await page.getByPlaceholder("Email").fill(process.env.PW_USER_EMAIL || '');
        await page.getByPlaceholder("Jelszó").fill(process.env.PW_USER_PASSWORD || '');

        // Act
        await page.getByRole("button", { name: "Bejelentkezés" }).click();

        // Assert
        await expect(page).toHaveURL(/\/dashboard/);
    });

    test("Sikertelen bejelentkezés folyamata", async ({ page }) => {
        // Arrange - Rossz adatok
        await page.getByPlaceholder("Email").fill('');
        await page.getByPlaceholder("Jelszó").fill('');

        // Act
        await page.getByRole("button", { name: "Bejelentkezés" }).click();

        // Assert
        await expect(page).not.toHaveURL(/\/dashboard/);
    });
});