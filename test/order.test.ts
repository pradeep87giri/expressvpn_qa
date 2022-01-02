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

test("Order Successfully", async ({ orderPage }) => {
    await orderPage.enterEmail(data.email)
    await orderPage.selectPlan(data.planInMonths)
    await orderPage.verifyTexts("en-US")
})

test("Change Language", async ({ orderPage, page }) => {
    await orderPage.changeLanguage(data.language);
    //Validate the url is navigated to correct locale
    expect(page.url()).toBe("https://www.expressvpn.com/" + data.language + "/order")
    await orderPage.verifyTexts(locale)
})

test("Incorrect Email", async ({ orderPage }) => {
    test.fail()
    await orderPage.enterEmail("Incorrect-Email")
    await orderPage.selectPlan(data.planInMonths)
    await orderPage.verifyEmailErrorMsg("en-US")
})