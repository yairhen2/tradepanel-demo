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

async function expectNoPageOverflow(page) {
  const widths = await page.evaluate(() => {
    const offenders = [...document.querySelectorAll('body *')]
      .filter(element => !element.closest('#vTbl') && getComputedStyle(element).display !== 'none')
      .map(element => ({ element, rect:element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1))
      .map(({ element }) => `${element.tagName}.${element.className}`);
    return {
      client: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      offenders,
    };
  });
  expect(widths.document).toBeLessThanOrEqual(widths.client);
  expect(widths.body).toBeLessThanOrEqual(widths.client);
  expect(widths.offenders).toEqual([]);
}

async function openMobilePage(page, id) {
  const menu = page.locator('.mobile-menu');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.locator(`.nav-item[data-p="${id}"]`).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.waitForTimeout(400);
}

for (const viewport of [
  { name:'iPhone 390', width:390, height:844 },
  { name:'iPhone 430', width:430, height:932 },
]) {
  test(`${viewport.name} supports the complete responsive workflow`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.goto(demo);

    await expect(page.locator('.logo-txt')).toHaveText('TradePanel');
    await expect(page.getByRole('button', { name:'Open navigation' })).toBeVisible();
    const layout = await page.evaluate(() => ({
      sidebar: getComputedStyle(document.querySelector('.sidebar')).position,
      sidebarWidth: document.querySelector('.sidebar').getBoundingClientRect().width,
      mainMargin: getComputedStyle(document.querySelector('.main')).marginLeft,
      scannerColumns: getComputedStyle(document.querySelector('.scan-config')).gridTemplateColumns.split(' ').length,
      opportunityColumns: getComputedStyle(document.querySelector('.opps')).gridTemplateColumns.split(' ').length,
    }));
    expect(layout).toEqual({
      sidebar:'sticky',
      sidebarWidth:viewport.width,
      mainMargin:'0px',
      scannerColumns:1,
      opportunityColumns:1,
    });

    const controls = await page.locator('.scan-config > *').evaluateAll(elements =>
      elements.map(element => element.getBoundingClientRect().toJSON()));
    expect(controls).toHaveLength(3);
    expect(controls[1].y).toBeGreaterThan(controls[0].y);
    expect(controls[2].y).toBeGreaterThan(controls[1].y);
    for (const box of controls) expect(box.right).toBeLessThanOrEqual(viewport.width);

    const mode = page.locator('.scan-config select').first();
    const strategy = page.locator('.scan-config select').nth(1);
    for (const value of ['day', 'swing', 'long']) {
      await mode.selectOption(value);
      await expect(strategy.locator('option')).toHaveCount(10);
    }
    await strategy.selectOption('quality-value');
    await expect(page.locator('.strategy-hero')).toContainText('Quality at a Reasonable Price');
    await page.getByRole('button', { name:'Custom Strategy' }).click();
    await expect(page.locator('.custom-panel')).toBeVisible();
    await page.getByRole('button', { name:'+ Add condition' }).click();
    await expect(page.locator('.rule-row')).toHaveCount(2);
    await expectNoPageOverflow(page);

    await page.getByRole('button', { name:/START SCAN/ }).click();
    await expect(page.locator('.tst')).toContainText('Scan complete', { timeout:4000 });
    await expect(page.locator('.opp').first()).toBeVisible();
    await page.locator('.opp').first().click();
    await expect(page.locator('#ov')).toBeVisible();
    const modal = await page.locator('.mp').boundingBox();
    expect(modal.x).toBeGreaterThanOrEqual(0);
    expect(modal.y).toBeGreaterThanOrEqual(0);
    expect(modal.x + modal.width).toBeLessThanOrEqual(viewport.width);
    expect(modal.y + modal.height).toBeLessThanOrEqual(viewport.height);
    await expect(page.locator('#cv')).toBeVisible();
    await expectNoPageOverflow(page);
    await page.locator('.mx').click();
    await expect(page.locator('#ov')).toHaveCount(0);

    for (const [id, title] of [
      ['health', 'System Health'],
      ['vault', 'Data Vault'],
      ['anal', 'Analytics'],
      ['ver', 'Versions'],
      ['sec', 'Security'],
      ['scan', 'Scanner'],
    ]) {
      await openMobilePage(page, id);
      await expect(page.locator('#pgT')).toHaveText(title);
      await expectNoPageOverflow(page);
    }

    await openMobilePage(page, 'vault');
    const tableScroll = await page.locator('#vTbl').evaluate(element => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      overflowX: getComputedStyle(element).overflowX,
    }));
    expect(tableScroll.scrollWidth).toBeGreaterThan(tableScroll.clientWidth);
    expect(tableScroll.overflowX).toBe('auto');
    await expectNoPageOverflow(page);
    expect(errors).toEqual([]);
  });
}

test('tablet uses mobile navigation and preserves every page', async ({ page }) => {
  await page.setViewportSize({ width:768, height:1024 });
  await page.goto(demo);
  await expect(page.getByRole('button', { name:'Open navigation' })).toBeVisible();
  for (const [id, title] of [
    ['health', 'System Health'], ['vault', 'Data Vault'], ['anal', 'Analytics'],
    ['ver', 'Versions'], ['sec', 'Security'], ['scan', 'Scanner'],
  ]) {
    await openMobilePage(page, id);
    await expect(page.locator('#pgT')).toHaveText(title);
    await expectNoPageOverflow(page);
  }
});

test('desktop layout keeps the established sidebar and scanner grid', async ({ page }) => {
  await page.setViewportSize({ width:1440, height:900 });
  await page.goto(demo);
  const layout = await page.evaluate(() => ({
    sidebarPosition: getComputedStyle(document.querySelector('.sidebar')).position,
    sidebarWidth: document.querySelector('.sidebar').getBoundingClientRect().width,
    mainMargin: getComputedStyle(document.querySelector('.main')).marginLeft,
    mobileMenu: getComputedStyle(document.querySelector('.mobile-menu')).display,
    scannerColumns: getComputedStyle(document.querySelector('.scan-config')).gridTemplateColumns.split(' ').length,
  }));
  expect(layout).toEqual({
    sidebarPosition:'fixed',
    sidebarWidth:238,
    mainMargin:'238px',
    mobileMenu:'none',
    scannerColumns:3,
  });
  await expectNoPageOverflow(page);
});
