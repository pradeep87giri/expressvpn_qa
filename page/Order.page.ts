import { expect } from "@playwright/test";
import { Page } from "playwright";
import LocaleManager from "../managers/Locale.manager";

export default class OrderPage {

    private page: Page;
    private localeManager: LocaleManager
    constructor(page: Page) {
        this.page = page;
        this.localeManager = new LocaleManager()
    }


    eleEmail = async () => this.page.locator("#signup_email");
    eleHeader = async () => this.page.locator("div.order-page-title h1 div.desktop");
    eleLanguageSelector = async () => this.page.locator("#front-nav button.language-picker");


    public async enterEmail(name: string) {
        const ele = await this.eleEmail();
        if (ele != null)
            await ele.fill(name);
        else
            throw new Error("Email element not found!!")
    }


    public async selectPlan(plan: string) {
        let elePlan;

        if (plan == "1")
            elePlan = this.page.locator("div.desktop div.plan-box >> nth = 1");
        else if (plan == "6")
            elePlan = this.page.locator("div.desktop div.plan-box >> nth = 2")
        else if (plan == "12")
            elePlan = this.page.locator("div.desktop div.plan-box >> nth = 0")
        else
            throw new Error("Incorrect Plan! Please select 1, 6 or 12")

        if (elePlan != null)
            await elePlan.click()
        else
            throw new Error("Plan element not found!!")
    }


    public async verifyTexts(locale: string) {
        const eleHeader = await this.eleHeader();
        const expectedHeader = this.localeManager.getLocaleProperty(locale, 'header')
        expect((await eleHeader.innerText()).trim()).toMatch(expectedHeader)
    }


    public async changeLanguage(language: string) {
        const ele = await this.eleLanguageSelector()
        await ele.hover()

        switch (language.toLowerCase()) {
            case ('en'):
                await this.page.click('a:has-text("English") >> nth = 1')
                break;
            case ('de'):
                await this.page.click('a:has-text("Deutsch") >> nth = 1')
                break;
            case ('es'):
                await this.page.click('a:has-text("Español") >> nth = 1')
                break;
            default:
            //do nothing"
        }
        //Validate the url is navigated to correct locale
        expect(this.page.url()).toBe("https://www.expressvpn.com/" + language + "/order")
    }
}