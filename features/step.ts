import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { By, until } from 'selenium-webdriver';

// Set default timeout to 10 seconds
setDefaultTimeout(10000);

async function waitForElement(selector: string) {
  return await global.driver.wait(until.elementLocated(By.css(selector)), 10000);
}

Given('I open Application', async function () {
  await global.driver.get('http://localhost:5173');
});

Then('I should see Application', async function () {
  await waitForElement('#email');
});

When('I enter the email address as {string}', async function (email: string) {
  const emailField = await waitForElement('#email');
  await emailField.sendKeys(email);
});

When('I enter password as {string}', async function (password: string) {
  const passwordField = await waitForElement('#password');
  await passwordField.sendKeys(password);
});

When('I submit the login form', async function () {
  const submitButton = await waitForElement('button[type="submit"]');
  await submitButton.click();
});

Then('I should read a message stating that {string}', async function (expectedMessage: string) {
  const messageElement = await waitForElement('#error');
  const message = await messageElement.getText();
  if (message !== expectedMessage) {
    throw new Error(`Expected message "${expectedMessage}", but got "${message}"`);
  }
});

// Step to verify redirection to Product listing screen after valid login
Then('I should redirect to Product listing screen', async function () {
    // Wait until the URL changes to the product listing screen's URL
    await global.driver.wait(until.urlIs('http://localhost:5173/products')); // Adjust the URL as needed

    // Optionally, you can also check for an element on the product listing screen to confirm the page has loaded
    const productListingElement = await global.driver.wait(until.elementLocated(By.css('#product-list')));
    
    // Ensure that the product listing element is present on the screen
    if (!productListingElement) {
        throw new Error('Product listing screen did not load as expected');
    }
});


When("I'm in the product listing screen", async function () {
    await global.driver.wait(until.urlIs('http://localhost:5173/products')); // Adjust the URL as needed

    // Optionally, you can also check for an element on the product listing screen to confirm the page has loaded
    const productListingElement = await global.driver.wait(until.elementLocated(By.css('#product-list')));
    
    // Ensure that the product listing element is present on the screen
    if (!productListingElement) {
        throw new Error('Product listing screen did not load as expected');
    }});

// Step to verify the table headers in the product listing screen
Then('I should see {string}', async function (expectedHeaders: string) {
    const headers = expectedHeaders.split(',').map(header => header.trim());

    for (let header of headers) {
        const headerElement = await global.driver.wait(until.elementLocated(By.xpath(`//th[text()="${header}"]`)));
        if (!headerElement) {
            throw new Error(`Header "${header}" not found`);
        }
    }
});

When('I click on pagination', async function () {
  const paginationButton = await await waitForElement('#page-2') // Adjust selector as needed
  await paginationButton.click();
});

Then('I should be redirected to the next Page', async function () {
  await waitForElement('#product-listing-page-2'); // Adjust selector as needed
});

When('I apply a filter for title as {string}', async function (title: string) {
  const filterInput = await waitForElement('#filter-title'); // Adjust selector as needed
  await filterInput.sendKeys(title);
  
  const filterButton = await waitForElement('#filter-button'); // Adjust selector as needed
  await filterButton.click();
  
});

Then('All the titles related to {string} should be displayed', async function (expectedTitle: string) {
  const results = await global.driver.findElements(By.css('#title')); // Adjust selector as needed
  for (const result of results) {
    const title = await result.getText();
    if (!title.includes(expectedTitle)) {
      throw new Error(`Expected title to include "${expectedTitle}", but got "${title}"`);
    }
  }
});
When('I Click on Logout Button', async function () {
    // Locate the logout button and click it
    const logoutButton = await global.driver.wait(until.elementLocated(By.css('button#logout-button'))); // Adjust selector as needed
    await logoutButton.click();
});

Then('I should redirect to Login Screen', async function () {
    // Wait until the login screen is displayed by checking for a specific element on the login page
    await global.driver.wait(until.urlContains('login'), 10000); // Adjust the URL path as needed

    // Optionally, you can also check for a specific element on the login screen
    const loginForm = await global.driver.wait(until.elementLocated(By.css('#login-form'))); // Adjust selector as needed
    if (!loginForm) {
        throw new Error('Login screen not displayed after logout');
    }
});
