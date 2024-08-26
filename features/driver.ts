import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const options = new chrome.Options();
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--no-sandbox");
// options.addArguments("--headless");  // comment for local
options.addArguments("--disable-features=VizDisplayCompositor");
options.addArguments("enable-automation");
options.addArguments("--window-size=1920,1080");
options.addArguments("--disable-gpu");
options.addArguments("--disable-extensions");
options.addArguments("--dns-prefetch-disable");
options.addArguments("enable-features=NetworkServiceInProcess");
options.addArguments("--use-fake-device-for-media-stream");
options.addArguments("--use-fake-ui-for-media-stream");

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
