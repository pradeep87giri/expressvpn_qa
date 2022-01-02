import { PlaywrightTestConfig } from "@playwright/test";
import * as data from "./data/order.data.json";


const config: PlaywrightTestConfig = {

    use: {
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        baseURL: "https://www.expressvpn.com",
        locale: data.country.toLowerCase() + "-" + data.country.toUpperCase()
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: "chromium"
            }
        }
        // , {
        //     name: 'firefox',
        //     use: {
        //         browserName: "firefox"
        //     }
        // },
        // {
        //     name: 'webkit',
        //     use: {
        //         browserName: "webkit"
        //     }
        // }
    ],
    timeout: 120000,
    workers: 3,
    // grep: [new RegExp("@smoke"), new RegExp("@reg")],
    // testMatch: ["reportDemo/*.test.ts"],
    retries: 0,
    reporter: [
        ["dot"],
        ["json", { outputFile: "test-result.json" }],
        ['experimental-allure-playwright']
    ]
}
export default config;