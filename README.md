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
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" or "dev", `Test Cases are present in "tests" folder`:

```JS
npx cross-env ENV=qa npm run test
```

3. For executing single test case on Chrome browser execute the below command, you can change the browser for execution e.g. if you want to run test cases on Firefox, you can change `--project=Firefox` against `test:single` in `package.json`, just make sure the browser name given matches the name given in `playwright.config.ts`.

```JS
npx cross-env ENV=qa npm run test:single
```

4. For executing test cases in parallel, provide a suitable tag `@SmokeTest` at the start of your test case name, then in `package.json` against `test:parallel` give the tag value and execute :

```JS
npx cross-env ENV=qa npm run test:parallel
```

5. For executing test cases in sequence, provide a suitable tag `@SmokeTest` at the start of your test case name, then in `package.json` against `test:serial` give the tag value and execute, `workers` parameter correspond to test cases you want to execute simultaneously e.g. `--workers=3`, executes 3 test cases simultaneously :

```JS
npx cross-env ENV=qa npm run test:serial
```

6. For Allure Report generation run `report.bat` file or execute :

```JS
allure serve
```
11. For HTML Report generation execute below command , single static HTML report(index.html) which can be sent via email is generated in "html-report" folder:
12. For converting HTML Reports to zip file "adm-zip" library is used, the logic is implemented in `global-teardown.ts` , to make sure this runs after all the test are executed and after reports are generated, `global-teardown.ts` is given as a parameter for "globalTeardown" in `playwright.config.ts` file. Results are generated as `html-report.zip` in project directory. 
13. For debugging test cases add debug points:
```JS
npm run test-debug
```
14. Screenshots, Videos and Trace files will be generated in test-results folder.
15. To change your username go to `testConfig.ts` and provide value against `username`
16. To change password, go to `lib/WebActions` in `decipherPassword()` uncomment `ENCRYPT` code block and replace `password` with your password, execute the test case, Encrypted password will be printed on your console . Copy Encrypted password in `testConfig.ts` against `password` field. You can comment Encrypt bloack ater this.


## Reports

- <b>Overall Report</b>
  ![Overall Report Screenshot][overall-report-screenshot]

- <b>Detailed Report</b>
  ![Detailed Report Screenshot][detailed-report-screenshot]

- <b>Failure Report</b>
  ![Failure Report Screenshot][failure-report-screenshot]


<!-- MARKDOWN LINKS & IMAGES -->

[overall-report-screenshot]: ReadMeImages/OverallReport.PNG
[detailed-report-screenshot]: ReadMeImages/DetailedReport.PNG
[failure-report-screenshot]: ReadMeImages/FailureReport.PNG
[sonar-report-screenshot]: ReadMeImages/SonarReport.PNG