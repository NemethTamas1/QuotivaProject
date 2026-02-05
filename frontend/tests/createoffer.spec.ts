import { test, expect } from '@playwright/test';
require("dotenv").config();

test.describe("AJánlat létrehozás", () => {

    test("Teljes ajánlat kitöltése és tétel ellenőrzése", async ({ page }) => {

        console.log("Email:", process.env.PW_USER_EMAIL);

        // Arrange
        await page.goto(process.env.NEXT_PUBLIC_FE_URL + "/login");
        await page.getByPlaceholder("Email").fill(process.env.PW_USER_EMAIL || '');
        await page.getByPlaceholder("Jelszó").fill(process.env.PW_USER_PASSWORD || '');
        await page.getByRole("button", { name: "Bejelentkezés" }).click();
        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });


        await page.getByRole("link", { name: "Új árajánlat" }).click();
        await expect(page).toHaveURL(/\/createoffer/, { timeout: 10000 });
        await expect(page.getByText("Betöltés...")).toBeHidden();

        await page.locator('input[name="client_name"]').fill('Teszt Kft.');
        await page.locator('input[name="client_email"]').fill('testkft@gmail.com');
        await page.locator('input[name="client_phone"]').fill('+36703333333');
        await page.locator('input[name="client_tax_number"]').fill('11111111-1-11');
        await page.locator('input[name="client_zip"]').fill('1111');
        await page.locator('input[name="client_city"]').fill('1111');
        await page.locator('input[name="client_street"]').fill('Aradi utca');
        await page.locator('input[name="client_house_number"]').fill('1/b');

        await page.locator('input[name="offer_name"]').fill('Kazán szerelés');
        await page.locator('input[name="dated"]').fill('2054-02-04');
        await page.locator('input[name="valid_until"]').fill('2054-02-04');

        await page.locator('input[name="name"]').fill('PVC cső');
        await page.locator('input[name="material_unit_price"]').fill('1000');

        // Act && Assert
        await page.getByRole("button", { name: "Hozzáad" }).click();
        const row = page.locator('tr', { hasText: 'PVC cső' });
        await expect(row).toBeVisible();

        await expect(row).toContainText('PVC cső');
        await expect(row).toContainText('1000 Ft');

        const dialogPromise = page.waitForEvent('dialog');
        await page.getByRole('button', { name: 'Ajánlat létrehozása' }).click({ timeout: 1500 });
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain("Sikeres ajánlat létrehozás.");

        await dialog.accept();
    });
})