import { Given, When, Then } from '@cucumber/cucumber';
import { By, until } from 'selenium-webdriver';

Given('I open Application', async function () {
    global.driver.get('http://localhost:5173') 
});

Then('I should see Application', async function () {
    await global.driver.wait(until.elementLocated(By.css(`#email`)))
});

When('I enter the email address as {string}', async function (email: string) {
    // Locate the email input field and type the email address
    const emailField = await global.driver.wait(until.elementLocated(By.css('#email'))); // Adjust selector as needed
    await emailField.sendKeys(email);
});

When('I enter password as {string}', async function (password: string) {
    // Locate the password input field and type the password
    const passwordField = await global.driver.wait(until.elementLocated(By.css('#password'))); // Adjust selector as needed
    await passwordField.sendKeys(password);
});

When('I submit the login form', async function () {
    // Locate the submit button and click it
    const submitButton = await global.driver.wait(until.elementLocated(By.css('button[type="submit"]'))); // Adjust selector as needed
    await submitButton.click();
});

Then('I should read a message stating that {string}', async function (expectedMessage: string) {
    // Locate the message element and get its text content
    const messageElement = await global.driver.wait(until.elementLocated(By.css('#error'))); // Adjust selector as needed
    const message = await messageElement.getText();
    
    // Assert that the message matches the expected value
    if (message !== expectedMessage) {
        throw new Error(`Expected message "${expectedMessage}", but got "${message}"`);
    }
});
