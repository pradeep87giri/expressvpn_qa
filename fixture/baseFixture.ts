import OrderPage from "../page/Order.page";
import { test as baseTest } from "@playwright/test";

const fixture = baseTest.extend<{ orderPage: OrderPage }>({
    orderPage: async ({ page }, use) => {
        await use(new OrderPage(page));
    }
})

export const test = fixture;
export const expect = fixture.expect;
export const describe = fixture.describe;
