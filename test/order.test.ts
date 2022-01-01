import { BrowserContext, Page } from 'playwright';
import { test, expect } from '../fixture/baseFixture'

let page: Page;
let context: BrowserContext;

test.beforeEach(async ({ page, browser }) => {
    await page.goto("/order")
    expect(page.url()).toBe("https://www.expressvpn.com/order")
})

test("Order Successfully", async ({ orderPage, page }) => {
    await orderPage.enterEmail("abc@gmail.com")
    await orderPage.selectPlan()
})