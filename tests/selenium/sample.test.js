import { Builder } from 'selenium-webdriver';

(async function openGitHub() {
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://github.com');
  await new Promise(r => setTimeout(r, 5000));
  await driver.quit();
})();
