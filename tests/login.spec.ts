const { test, expect } = require("@playwright/test");

// Define base URL for reuse
const BASE_URL = 'https://the-internet.herokuapp.com/login';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('LP001 - Successful login', async ({ page }) => {
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('You logged into a secure area!');
  await page.click('text=Logout');
});

test('LP002 - Invalid username (wrong case)', async ({ page }) => {
  await page.fill('#username', 'Tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('Your username is invalid!');
});

test('LP003 - Invalid password (lowercase)', async ({ page }) => {
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'supersecretpassword!');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('Your password is invalid!');
});

test('LP004 - Invalid password (uppercase)', async ({ page }) => {
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SUPERSECRETPASSWORD!');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('Your password is invalid!');
});

test('LP005 - Password with leading space', async ({ page }) => {
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', ' SuperSecretPassword!');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('Your password is invalid!');
});

test('LP006 - Username with leading space', async ({ page }) => {
  await page.fill('#username', ' tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('Your username is invalid!');
});

test('LP010 - Empty username and password', async ({ page }) => {
  await page.fill('#username', ' ');
  await page.fill('#password', ' ');
  await page.click("button[type='submit']");

  const flash = page.locator('#flash');
  await expect(flash).toContainText('Your username is invalid!');
});