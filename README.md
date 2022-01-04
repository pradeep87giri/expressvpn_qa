<!-- TABLE OF CONTENTS -->
<h2>
    <details open="open">
        <summary class="normal">Table of Contents</summary>
        <h5>
          <ol>
            <li>
              <a href="#about-the-project">About the Project</a>
              <ul>
                <li><a href="#built-with">Built With</a>
              </ul>
            </li>
            <li>
              <a href="#getting-started">Getting Started</a>
              <ul>
                <li><a href="#prerequisites">Prerequisites</a>
                <li><a href="#installation">Installation</a>
              </ul>
            </li>
            <li><a href="#usage">Usage</a></li>
            <li><a href="#reports">Reports</a></li>
          </ol>
        </h5>    
    </details>
</h2>

<!-- ABOUT THE PROJECT -->

## About the Project

This project is to test ExpressVPN order page for different locales across multiple platforms and browsers

Top Features:

- Easy to Configure.
- Auto-waits for elements and only then performs the requested action.
- Records videos and generate screenshot & traces for the Test Cases on failure
- Supports Headful/Headless mode execution for Firefox/Webkit/Google Chrome/Chromium/MS Edge on Windows/Linux/Mac machines.
- It has ability to produce and visually compare screenshots.
- Supports Serial and Parallel execution.
- Allure/HTML Reports are generated after execution.


### Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [adm-zip](https://www.npmjs.com/package/adm-zip)


## Getting Started

### Prerequisites

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- Install Java 8 or above, Allure Reports require Java 8 or higher.
- allure commandline : Install allure command line for generating Allure Reports using
  ```sh
  npm install -g allure-commandline
  ```

### Installation

1. Clone the repo using below URL

```sh
https://github.com/pradeep87giri/expressvpn_qa.git
```

2. Navigate to folder and install npm packages using:

```sh
npm i
```

<!-- USAGE EXAMPLES-->

## Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers execute: ", `Test Cases are present in "tests" folder`:

```JS
npm run test
```

3. For executing squentially on browsers, for example run test cases on Firefox firt and then on chrome:

```JS
npm run test-serial
```

4. For debugging test cases add debug points:
```JS
npm run debug
```

5. For Allure Report generation run `report.bat` file or execute :

```sh
allure serve
```
 
7. Screenshots, Videos and Trace files will be generated in test-results folder on any failure

8. To run on browserstack uncomment/add Browserstack projects in `playwright.config.ts` and provide your credentials in `credentials/browserstack.properties` file

## Reports

- <b>Overall Report</b>
  ![Overall Report Screenshot][overall-report-screenshot]

- <b>Failure Report</b>
  ![Failure Report Screenshot][failure-report-screenshot]


A static HTML Report is also generated(index.html) in "playwright-report" folder. For converting HTML Reports to zip file "adm-zip" library is used, the logic is implemented in `global-teardown.ts` , to make sure this runs after all the test are executed and after reports are generated, `global-teardown.ts` is given as a parameter for "globalTeardown" in `playwright.config.ts` file. Results are generated as `report.zip` in project directory.


## Note
*On first time execution Visual comparison test case will fail as it will capture the snapshot as a base reference. On next executions it will compare current execution's screenshot with base screenshot.*

<!-- MARKDOWN LINKS & IMAGES -->

[overall-report-screenshot]: readMeImages/Allure_Report.png
[failure-report-screenshot]: readMeImages/Failed_Allure_Report.png