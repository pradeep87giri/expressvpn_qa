import { BrowserContext, Page } from 'playwright';
import { test, expect } from '../fixture/baseFixture'
import * as data from "../data/order.data.json";

let page: Page;
let context: BrowserContext;
let locale: string;

test.beforeAll(() => {
    locale = data.country.toLowerCase() + "-" + data.country.toUpperCase()
})

test.beforeEach(async ({ page, browser }) => {
    await page.goto("/order")
    expect(page.url()).toBe("https://www.expressvpn.com/order")
})

test("Order Successfully", async ({ orderPage, page }) => {
    await orderPage.changeLanguage(data.language);
    await orderPage.enterEmail(data.email)
    await orderPage.selectPlan(data.planInMonths)
    await orderPage.verifyTexts(locale)
})