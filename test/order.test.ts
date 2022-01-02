import { BrowserContext, Page } from 'playwright';
import { test, expect } from '../fixture/baseFixture'
import * as data from "../data/order.data.json";

let page: Page;
let context: BrowserContext;
let locale: string;

test.beforeAll(() => {
    locale = data.language.toLowerCase() + "-" + data.country.toUpperCase()
})

test.beforeEach(async ({ page }) => {
    await page.goto("/order")
    expect(page.url()).toBe("https://www.expressvpn.com/order")
})

test.skip("Order Successfully", async ({ orderPage }) => {
    await orderPage.enterEmail(data.email)
    await orderPage.selectPlan(data.planInMonths)
    await orderPage.verifyTexts("en-US")
})

test.skip("Change Language", async ({ orderPage, page }) => {
    await orderPage.changeLanguage(data.language);
    //Validate the url is navigated to correct locale
    expect(page.url()).toBe("https://www.expressvpn.com/" + data.language + "/order")
    await orderPage.verifyTexts(locale)
})

test.skip("Incorrect Email", async ({ orderPage }) => {
    await orderPage.enterEmail("Incorrect-Email")
    await orderPage.selectPlan(data.planInMonths)
    await orderPage.verifyEmailErrorMsg("en-US")
})

test('Visual Comparison', async ({ page }) => {
    //Wait till it is ready to take a screenshot
    await page.waitForLoadState('load')
    await page.locator(".designstudio-button").waitFor()

    // Compare screenshot with existing snapshot
    expect(await page.screenshot()).toMatchSnapshot('order-en.png', { threshold: 0.3 });
});