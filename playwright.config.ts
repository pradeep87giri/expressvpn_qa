import { PlaywrightTestConfig } from "@playwright/test";
import * as data from "./data/order.data.json";


const config: PlaywrightTestConfig = {

    use: {
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
        baseURL: "https://www.expressvpn.com",
        locale: data.language.toLowerCase() + "-" + data.country.toUpperCase(),
        viewport: {
            width: 1280,
            height: 720
        }
    },

    projects: [
        {
            name: 'chromium',
            use: {
                browserName: "chromium"
            }
        }
        , {
            name: 'firefox',
            use: {
                browserName: "firefox"
            }
        },
        {
            name: 'webkit',
            use: {
                browserName: "webkit"
            }
        }
    ],
    workers: 1,
    timeout: 120000,
    // grep: [new RegExp("@smoke"), new RegExp("@reg")],
    retries: 0,
    reporter: [
        ["dot"],
        ["json", { outputFile: "test-result.json" }],
        ['experimental-allure-playwright']
    ]
}
export default config;