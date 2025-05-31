import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function testBasicHTMLForm() {
  const options = new chrome.Options();
  options.addArguments("--start-maximized");

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Go to the basic HTML form test page
    await driver.get('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

    // Fill in username and password
    await driver.findElement(By.name('username')).sendKeys('poshika');
    await driver.findElement(By.name('password')).sendKeys('mypassword');

    // Fill the textarea
    await driver.findElement(By.name('comments')).clear();
    await driver.findElement(By.name('comments')).sendKeys('This is a Selenium test.');

    // Check the first checkbox
    await driver.findElement(By.css('input[name="checkboxes[]"][value="cb1"]')).click();

    // Select the radio button with value 'rd2'
    await driver.findElement(By.css('input[name="radioval"][value="rd2"]')).click();

    // Select an option from the dropdown
    await driver.findElement(By.css('select[name="dropdown"] option[value="dd3"]')).click();

    // Submit the form
    const submitBtn = await driver.findElement(By.css('input[type="submit"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
    await driver.sleep(500);
    await submitBtn.click();

    // Wait for the response page
    await driver.wait(until.titleContains('Processed Form Details'), 5000);

    // Confirm submission by checking for presence of submitted data
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    if (bodyText.includes('poshika') && bodyText.includes('This is a Selenium test.')) {
      console.log('✅ Form submitted successfully and data validated.');
    } else {
      console.log('❌ Form submission data not found in response.');
    }

  } catch (error) {
    console.error('❌ Error occurred:', error);
  } finally {
    await driver.quit();
  }
})();