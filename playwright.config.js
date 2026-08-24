const { defineConfig } = require("@playwright/test");

const viewports = [
  ["landscape-568", 568, 320, true],
  ["landscape-667", 667, 375, true],
  ["landscape-844", 844, 390, true],
  ["landscape-932", 932, 430, true],
  ["portrait-320", 320, 568, true],
  ["portrait-375", 375, 667, true],
  ["portrait-390", 390, 844, true],
  ["tablet", 768, 1024, false],
  ["desktop", 1366, 768, false],
];

module.exports = defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3000",
    browserName: "chromium",
    colorScheme: "dark",
    trace: "retain-on-failure",
  },
  projects: viewports.map(([name, width, height, mobile]) => ({
    name,
    use: {
      viewport: { width, height },
      hasTouch: mobile,
      isMobile: mobile,
    },
  })),
  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
