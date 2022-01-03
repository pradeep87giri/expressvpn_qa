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

        // -- Local Projects --
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
        },

        // -- BrowserStack Projects --
        // name should be of the format browser@browser_version:os os_version@browserstack
        // {
        //     name: 'chrome@latest:Windows 10@browserstack',
        //     use: {
        //         browserName: 'chromium',
        //         channel: 'chrome'
        //     },
        // },
        // {
        //     name: 'playwright-firefox@latest:OSX Catalina@browserstack',
        //     use: {
        //         browserName: 'firefox',
        //         ignoreHTTPSErrors: true
        //     },
        // },
        // {
        //     name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
        //     use: {
        //         browserName: 'webkit',
        //         // Config to use playwright emulated devices.
        //         // ...devices['iPhone 12 Pro Max'],
        //     }
        // }
    ],

    // globalSetup: "./setup/global-setup.ts",
    // globalTeardown: "./setup/global-teardown.ts",
    timeout: 120000,
    retries: 0,
    reporter: [
        ["dot"],
        ["json", { outputFile: "test-result.json" }],
        ['experimental-allure-playwright']
    ]
}
export default config;