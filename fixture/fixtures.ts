import { test as base, TestInfo } from '@playwright/test';
import * as cp from 'child_process';
import * as BrowserStackLocal from 'browserstack-local';
import OrderPage from '../page/Order.page';
import * as data from "../data/order.data.json";
import PropertyManager from '../managers/Property.manager';

var localeManager: PropertyManager = new PropertyManager()

//Getting playwright version
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];

// BrowserStack Specific Capabilities.
const caps = {
  browser: 'chrome',
  os: 'osx',
  os_version: 'catalina',
  name: 'My first playwright test',
  build: 'playwright-build-1',
  'browserstack.username': localeManager.getBrowserstackUser() || 'YOUR_USERNAME',
  'browserstack.accessKey':
    localeManager.getBrowserstackPwd() || 'YOUR_ACCESS_KEY',
  // 'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'client.playwrightVersion': clientPlaywrightVersion,
};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name: string) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  // caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = name;
};

const isHash = (entity: any) => Boolean(entity && typeof (entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash: TestInfo, keys: any[]) => keys.reduce((hash: { [x: string]: any; }, key: string | number) => (isHash(hash) ? hash[key] : undefined), hash);

const test = base.extend<{ orderPage: OrderPage }>({
  browser: async ({ playwright, browser }, use, workerInfo) => {
    // Use BrowserStack Launched Browser according to capabilities for cross-browser testing.
    if (workerInfo.project.name.match(/browserstack/)) {
      patchCaps(workerInfo.project.name);
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint:
          `wss://cdp.browserstack.com/playwright?caps=` +
          `${encodeURIComponent(JSON.stringify(caps))}`,
      });
      await use(vBrowser);
    } else {
      // Use Local Browser for testing.
      await use(browser);
    }
  },
  page: async ({ page, browser }, use, testInfo) => {
    // Overriding page function to mark the status on BrowserStack.
    if (testInfo.project.name.match(/browserstack/)) {
      const vPage = await browser.newPage();
      await use(vPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: testInfo.status,
          reason: nestedKeyValue(testInfo, ['error', 'message'])
        },
      };
      await vPage.evaluate(() => { },
        `browserstack_executor: ${JSON.stringify(testResult)}`);
      await vPage.close();
    } else {
      await use(page);
    }
  },
  orderPage: async ({ page }, use) => {
    //Using page repository
    await use(new OrderPage(page));
  },
});

export default test
export const bsLocal = new BrowserStackLocal.Local();
// replace YOUR_ACCESS_KEY with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
export const BS_LOCAL_ARGS = {
  key: localeManager.getBrowserstackPwd() || 'YOUR_ACCESS_KEY',
};
