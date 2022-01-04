import { expect, WorkerInfo } from "@playwright/test";
import * as data from "../data/order.data.json";
import test from "../fixture/fixtures";

test.beforeEach(async ({ page }, workerInfo: WorkerInfo) => {
    if (workerInfo.project.name.match(/browserstack/)) {
        await page.goto("https://www.expressvpn.com/order")
    } else {
        await page.goto("/order")
    }
    expect(page.url()).toBe("https://www.expressvpn.com/order")
})

test.describe("Order Page Validations", () => {

    test("Order Successfully", async ({ orderPage }) => {
        await orderPage.enterEmail(data.email)
        await orderPage.selectPlan(data.planInMonths)
        //Check best deal alert msg if 12 months plan is not selected
        if (data.planInMonths != "12")
            await orderPage.verifyAlertMsg("en")
        await orderPage.verifyTexts("en")
    })

    test(`Change Language to ${data.language}`, async ({ orderPage, page }) => {
        await orderPage.changeLanguage(data.language)
        //Validate the url is navigated to correct language page
        expect(page.url()).toBe("https://www.expressvpn.com/" + data.language + "/order")
        //Verify texts of changed language
        await orderPage.verifyTexts(data.language)
    })

    test("Incorrect Email", async ({ orderPage }) => {
        await orderPage.enterEmail("Incorrect-Email")
        await orderPage.selectPlan(data.planInMonths)
        await orderPage.verifyEmailErrorMsg("en")
    })

    test('Visual Comparison', async ({ page }) => {
        //Wait till it is ready to take a screenshot
        await page.waitForLoadState('load')
        await page.locator(".designstudio-button").waitFor()

        // Compare screenshot with existing snapshot
        expect(await page.screenshot(
            // Uncomment the following line to compare full page
            // { fullPage: true }  
        )).toMatchSnapshot('order-en.png', { threshold: 0.3 });
    })
});