# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Project Folder Structure

- features
  - step-definitions
    - driver.ts
    - step.ts
  - test.feature
- package.json
- tsconfig.json
- cucumber.json

features/: Contains all Cucumber feature files and step definitions.

step-definitions/: Contains TypeScript files for step definitions and WebDriver setup.

driver.ts: Initializes the Selenium WebDriver instance.

step.ts: Contains the step definitions for the test scenarios.

test.feature: The Cucumber feature file containing the BDD scenarios.

## Getting Started

Follow these steps to set up and run the project:
```js 
npm install ts-node typescript @cucumber/cucumber @types/node @types/selenium-webdriver selenium-webdriver
```

Update tsconfig.json with adding following code as this will be required since we are initilizting the driver to global variable:
```json
{
  "noImplicitAny": false,
}
```
## Configure Cucumber.json

```json
{
  "default": {
    "formatOptions": {
      "snippetInterface": "async-await"
    },
    "dryRun": false,
    "require": ["features/**/*.ts"],
    "requireModule": ["ts-node/register"],
    "format": [
      "progress-bar"
    ]
  }
}
```

Explanation of Options:

- formatOptions.snippetInterface: Sets the interface for generated step definition snippets to async-await.
- dryRun: When set to false, all scenarios will be executed. If true, scenarios are only checked for missing step definitions.
- require: Loads all TypeScript files from the features folder as step definitions.
- requireModule: Uses ts-node/register to allow the execution of TypeScript files.
- format: Uses the progress-bar format for console output.

## Add scripts to package.json

```json
{
  "scripts": {
    "test": "cucumber-js"
  }
}
```

## Web Driver Initialization (Driver.ts)

```js
import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const options = new chrome.Options();
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--no-sandbox");
options.addArguments("--headless");
options.addArguments("--disable-features=VizDisplayCompositor");
options.addArguments("enable-automation");
options.addArguments("--window-size=1920,1080");
options.addArguments("--disable-gpu");
options.addArguments("--disable-extensions");
options.addArguments("--dns-prefetch-disable");
options.addArguments("enable-features=NetworkServiceInProcess");

BeforeAll(async () => {
    global.driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
});

AfterAll(async () => {
    if (global.driver) {
        await global.driver.quit();
    }
});
```

## Write your feature File, Step Definations and execute

To run the tests, use the following command:
```js
npm run test
```

This command will execute all the scenarios defined in the .feature files.