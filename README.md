# React + TypeScript + Vite with tailwind CSS

- To use TypeScript in a Vite.js application, follow these steps:

  1. Create a Vite Project :

      If you haven't created a Vite project yet, you can do so by running:
      `npm create vite@latest react-typescript-vite-app`
      Select React as the framework (or any other framework you prefer), and then choose TypeScript when prompted for the variant.
  
  2. Install TypeScript (if not already installed) :

      If you didn't choose the TypeScript variant, you can manually install TypeScript and the necessary types:
      `npm install typescript @types/react @types/react-dom`

  3. Configure tsconfig.json :
   
      Vite automatically generates a tsconfig.json file when you create a TypeScript project. If you need to customize it, here’s a basic setup:
      
    ```json
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "noImplicitAny": false,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./",
    "jsx": "react-jsx", // or "react" for React 16 and below
    "typeRoots": ["node_modules/@types"],
    "types": ["chai", "node"]
  }
    ```


  4. Rename Files to .tsx or .ts
      
      Rename your React components from .jsx to .tsx and regular JavaScript files from .js to .ts. TypeScript will now start checking these files for type errors.

  5. Start the Development Server
      
      Run the Vite development server as usual:
      `npm run dev`
      Vite will handle the TypeScript compilation and serve your application with hot module replacement (HMR).

  6. Add TypeScript Configurations (Optional)

      You can further enhance your TypeScript setup by customizing tsconfig.json according to your project's needs, like enabling stricter type checks or adding custom paths.

      
  Now you’re ready to build and run a TypeScript-powered Vite.js application!

- To add Tailwind CSS to a Vite.js application with TypeScript, follow these steps:

  1. Install Tailwind CSS and Dependencies
      
      First, navigate to your project directory and install Tailwind CSS along with its peer dependencies:
      `npm install -D tailwindcss postcss autoprefixer`
  
  2. Initialize Tailwind CSS
    
      Run the following command to create the tailwind.config.js and postcss.config.js files:
      `npx tailwindcss init -p`

      This will generate two files:
        - tailwind.config.js for configuring Tailwind CSS.
        - postcss.config.js for configuring PostCSS.

  3. Configure tailwind.config.js

      By default, the tailwind.config.js will look like this:

```js 
      module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

      Make sure the content array includes all the paths where Tailwind CSS will be used, such as .html, .js, .ts, .jsx, and .tsx files.

  4. Create a Tailwind Base CSS File
      
      In your src directory, create a CSS file (e.g., src/styles/globals.css) and add the following Tailwind CSS directives:

      ```js 
      @tailwind base;
@tailwind components;
@tailwind utilities;
```
      Import the CSS file you created in your main entry file (e.g., src/main.tsx or src/index.tsx):

    5. Customize Tailwind (Optional)
        You can further customize Tailwind CSS by editing the tailwind.config.js file, such as adding custom colors, fonts, and more.

  Now your Vite.js application with TypeScript should be set up with Tailwind CSS!















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

#### Explanation of Options:

- **formatOptions.snippetInterface**: Setting it to "async-await" means that the generated snippets for step definitions will use the async/await syntax, which is more modern and easier to read, especially in TypeScript.
- **dryRun**: When set to false, all scenarios will be executed. If true, scenarios are only checked for missing step definitions.
- **require**: Loads all TypeScript files from the features folder as step definitions.
- **requireModule**: Specifies additional modules to be loaded before executing the tests. Here, ["ts-node/register"] is required to compile TypeScript files on the fly. ts-node is a TypeScript execution engine for Node.js, allowing TypeScript files to run seamlessly.
- **format**: Uses the progress-bar format for console output.

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