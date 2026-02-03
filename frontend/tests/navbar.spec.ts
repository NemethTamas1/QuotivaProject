import { test, expect } from '@playwright/test';
require("dotenv").config();

test.describe("NavBar teszt", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.NEXT_PUBLIC_FE_URL || '');
    });

    test("Bejelentkezés gomb helyesen átirányít", async ({ page }) => {
        // Arrange && Act
        await page.getByText("Belépés").click();

        // Assert
        await expect(page).toHaveURL(/\/login/);
    })

    test("Látszódik az 'Új Árajánlat' gomb", async ({ page }) => {
        // Arrange && Act
        await page.goto(process.env.NEXT_PUBLIC_FE_URL + "/login")
        await page.getByPlaceholder("Email").fill(process.env.PW_USER_EMAIL || '');
        await page.getByPlaceholder("Jelszó").fill(process.env.PW_USER_PASSWORD || '');
        await page.getByRole("button", { name: "Bejelentkezés" }).click();

        // Assert
        const offerButton = page.getByText("Új árajánlat");
        await expect(offerButton).toBeVisible();
    })

    test("Látszódik az 'Ajánlataim' gomb", async ({ page }) => {
        // Arrange && Act
        await page.goto(process.env.NEXT_PUBLIC_FE_URL + "/login")
        await page.getByPlaceholder("Email").fill(process.env.PW_USER_EMAIL || '');
        await page.getByPlaceholder("Jelszó").fill(process.env.PW_USER_PASSWORD || '');
        await page.getByRole("button", { name: "Bejelentkezés" }).click();

        // Assert
        const offerButton = page.getByText("Ajánlataim");
        await expect(offerButton).toBeVisible();
    })

    test("Látszódik az 'Dashboard' gomb", async ({ page }) => {
        // Arrange && Act
        await page.goto(process.env.NEXT_PUBLIC_FE_URL + "/login")
        await page.getByPlaceholder("Email").fill(process.env.PW_USER_EMAIL || '');
        await page.getByPlaceholder("Jelszó").fill(process.env.PW_USER_PASSWORD || '');
        await page.getByRole("button", { name: "Bejelentkezés" }).click();

        // Assert
        const offerButton = page.getByText("Dashboard");
        await expect(offerButton).toBeVisible();
    })

    test("Látszódik az 'Kijelentkezés' gomb", async ({ page }) => {
        // Arrange && Act
        await page.goto(process.env.NEXT_PUBLIC_FE_URL + "/login")
        await page.getByPlaceholder("Email").fill(process.env.PW_USER_EMAIL || '');
        await page.getByPlaceholder("Jelszó").fill(process.env.PW_USER_PASSWORD || '');
        await page.getByRole("button", { name: "Bejelentkezés" }).click();

        // Assert
        const offerButton = page.getByText("Kijelentkezés");
        await expect(offerButton).toBeVisible();
    })
})