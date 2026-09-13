const { test, expect } = require('@playwright/test');
const demo = process.env.DEMO_URL || 'http://127.0.0.1:8765';

test('desktop scanner supports modes, strategies, custom rules, scan, navigation and chart', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(demo);
  await expect(page).toHaveTitle(/TradePanel/);
  await expect(page.getByText('PUBLIC PORTFOLIO DEMO')).toBeVisible();
  expect(await page.evaluate(() => Object.fromEntries(Object.entries(STRATEGY_CATALOG).map(([k,v]) => [k,v.length])))).toEqual({ day:10, swing:10, long:10 });
  const mode = page.locator('.scan-config select').first();
  const strategy = page.locator('.scan-config select').nth(1);
  await expect(strategy.locator('option')).toHaveCount(10);
  await mode.selectOption('swing');
  await expect(strategy.locator('option')).toHaveCount(10);
  await strategy.selectOption('relative-strength');
  await expect(page.locator('.strategy-hero').getByText('Market Relative Strength', { exact:true })).toBeVisible();
  await mode.selectOption('long');
  await expect(strategy.locator('option')).toHaveCount(10);
  await strategy.selectOption('quality-value');
  await expect(page.getByText('SIMULATED FUNDAMENTALS + SIMULATED PRICE DATA')).toBeVisible();
  await page.getByRole('button', { name:'Custom Strategy' }).click();
  await expect(page.getByText('Custom Strategy — Long-Term')).toBeVisible();
  await page.getByRole('button', { name:'+ Add condition' }).click();
  await expect(page.locator('.rule-row')).toHaveCount(2);
  await page.getByRole('button', { name:/START SCAN/ }).click();
  await expect(page.locator('.tst')).toContainText('Scan complete', { timeout:4000 });
  const firstCandidate = page.locator('.opp').first();
  if (await firstCandidate.count()) {
    await firstCandidate.click();
    await expect(page.locator('#ov')).toBeVisible();
    await expect(page.locator('#cv')).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await page.locator('#ov').waitFor({ state:'detached' }).catch(() => {});
  for (const id of ['health','vault','anal','ver','sec','scan']) {
    await page.locator(`.nav-item[data-p="${id}"]`).click();
    await page.waitForTimeout(400);
  }
  expect(errors).toEqual([]);
});

test('mobile layout remains usable', async ({ page }) => {
  await page.setViewportSize({ width:390, height:844 });
  await page.goto(demo);
  await expect(page.getByRole('button', { name:/START SCAN/ })).toBeVisible();
  await expect(page.locator('.scan-config select').first()).toBeVisible();
});
