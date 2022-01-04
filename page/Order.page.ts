import { expect } from "@playwright/test";
import { Page } from "playwright";
import LocaleManager from "../managers/Property.manager";

export default class OrderPage {

    private page: Page;
    private localeManager: LocaleManager

    //Locators
    public email = "#signup_email"
    public headerTitle = "div.order-page-title h1 div.desktop"
    public languageSelector = "#front-nav button.language-picker"
    public planTitle = ".step-heading >> nth=0"
    public emailTitle = ".step-heading >> nth=1"
    public paymentTitle = ".step-heading div.desktop"
    public alertMsg = ".alert p >> nth = 0"
    public emailErrorMsg = "#signup_email-error"

    constructor(page: Page) {
        this.page = page;
        this.localeManager = new LocaleManager()
    }

    public async enterEmail(name: string) {
        const eleEmail = this.page.locator(this.email)
        await eleEmail.fill(name)
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

        await elePlan?.click()
    }

    public async verifyTexts(language: string) {
        const eleHeader = this.page.locator(this.headerTitle)
        const elePlanTitle = this.page.locator(this.planTitle)
        const eleEmailTitle = this.page.locator(this.emailTitle)
        const elePaymentTitle = this.page.locator(this.paymentTitle)

        //expected texts from language files
        const expectedHeaderTxt = this.localeManager.getlanguageProperty(language, 'header')
        const expectedPlanTxt = this.localeManager.getlanguageProperty(language, 'planTitle')
        const expectedEmailTxt = this.localeManager.getlanguageProperty(language, 'emailTitle')
        const expectedPaymentTxt = this.localeManager.getlanguageProperty(language, 'paymentTitle')

        //Verifying the actual texts with expected
        await expect(eleHeader).toHaveText(expectedHeaderTxt)
        await expect(elePlanTitle).toContainText(expectedPlanTxt)
        await expect(eleEmailTitle).toContainText(expectedEmailTxt)
        await expect(elePaymentTitle).toContainText(expectedPaymentTxt)
    }

    public async changeLanguage(language: string) {
        const eleLanguage = this.page.locator(this.languageSelector)
        await eleLanguage.hover()

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
    }

    public async verifyEmailErrorMsg(language: string) {
        const eleEmailErrorMsg = this.page.locator(this.emailErrorMsg)
        const expectedErrorTxt = this.localeManager.getlanguageProperty(language, 'emailErrorMsg')
        await expect(eleEmailErrorMsg).toHaveText(expectedErrorTxt)
    }

    public async verifyAlertMsg(language: string) {
        const eleAlertMsg = this.page.locator(this.alertMsg)
        const expectedAlertMsg = this.localeManager.getlanguageProperty(language, 'alertMsg')
        await expect(eleAlertMsg).toContainText(expectedAlertMsg)
    }

}