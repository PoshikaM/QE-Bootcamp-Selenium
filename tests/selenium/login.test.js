import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function loginTest() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    await driver.get('https://the-internet.herokuapp.com/login');

    await driver.wait(until.elementLocated(By.id('username')), 10000);

    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/secure'), 10000);

    console.log('✅ Login test passed');
  } catch (e) {
    console.error('❌ Login test failed:', e);
  } finally {
    await driver.quit();
  }
})();