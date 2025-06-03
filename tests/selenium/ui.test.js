import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';

async function wikipediaSearch() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    console.log('Opening Wikipedia...');
    await driver.get('https://www.wikipedia.org/');

    const searchInput = await driver.wait(
      until.elementLocated(By.css('input[name="search"]')),
      10000
    );

    await searchInput.sendKeys('weather forecast');

    const searchButton = await driver.findElement(By.css('button.pure-button-primary-progressive'));
    await searchButton.click();

    // Wait for result heading
    await driver.wait(until.elementLocated(By.id('firstHeading')), 10000);
    const heading = await driver.findElement(By.id('firstHeading'));
    const text = await heading.getText();

    console.log('✅ Wikipedia result heading:', text);

    // Take screenshot on success
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('success.png', screenshot, 'base64');
    console.log('📸 Screenshot saved as success.png');
    
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await driver.quit();
  }
}

wikipediaSearch();