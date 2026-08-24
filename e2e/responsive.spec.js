const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renderiza os 118 elementos e respeita o comportamento do viewport", async ({ page }, testInfo) => {
  await expect(page.getByRole("gridcell")).toHaveCount(118);

  const metrics = await page.evaluate(() => {
    const tableScroll = document.querySelector(".table-scroll");
    const table = document.querySelector(".periodic-table").getBoundingClientRect();
    return {
      viewport: { width: innerWidth, height: innerHeight },
      body: { width: document.body.scrollWidth, height: document.body.scrollHeight },
      table: { left: table.left, right: table.right, top: table.top, bottom: table.bottom },
      tableScroll: { clientWidth: tableScroll.clientWidth, scrollWidth: tableScroll.scrollWidth },
    };
  });

  if (testInfo.project.name.startsWith("landscape")) {
    expect(metrics.body.width).toBeLessThanOrEqual(metrics.viewport.width);
    expect(metrics.body.height).toBeLessThanOrEqual(metrics.viewport.height);
    expect(metrics.table.left).toBeGreaterThanOrEqual(0);
    expect(metrics.table.right).toBeLessThanOrEqual(metrics.viewport.width);
    expect(metrics.table.top).toBeGreaterThanOrEqual(0);
    expect(metrics.table.bottom).toBeLessThanOrEqual(metrics.viewport.height + 1);
  }

  if (testInfo.project.name.startsWith("portrait")) {
    await expect(page.getByText("Melhor em modo paisagem")).toBeVisible();
    expect(metrics.body.width).toBeLessThanOrEqual(metrics.viewport.width);
    expect(metrics.tableScroll.scrollWidth).toBeGreaterThan(metrics.tableScroll.clientWidth);
  }

  if (["tablet", "desktop"].includes(testInfo.project.name)) {
    expect(metrics.body.width).toBeLessThanOrEqual(metrics.viewport.width);
  }
});

test("alterna o tema e mantém o rótulo acessível", async ({ page }) => {
  const themeButton = page.getByRole("button", { name: "Usar tema claro" });
  await expect(themeButton).toBeVisible();
  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Usar tema escuro" })).toBeVisible();
});

test("não apresenta violações sérias ou críticas de acessibilidade", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  const blockingViolations = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact),
  );

  expect(blockingViolations).toEqual([]);
});
