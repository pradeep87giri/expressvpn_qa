import { Page } from "playwright";

export default class OrderPage {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    eleEmail = async () => await this.page.locator("#signup_email");
    elePlan = async () => await this.page.locator("(//div[contains(@class,'plan-container')])[2]");


    public async enterEmail(name: string) {
        const ele = await this.eleEmail();
        if (ele != null)
            await ele.fill(name);
        else
            throw new Error("Email element not found!!")
    }

    public async selectPlan() {
        const ele = await this.elePlan();
        if (ele != null)
            await ele.click()
        else
            throw new Error("Plan element not found!!")
    }
}