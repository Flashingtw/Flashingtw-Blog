import { defineConfig, devices } from "@playwright/test";

const PREVIEW_HOST = "127.0.0.1";
const PREVIEW_PORT = 4173;
const BASE_URL = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  outputDir: "test-results",
  use: {
    baseURL: BASE_URL,
    // 默认减少动画；客户端导航回归另行覆盖启用动画的情况。
    contextOptions: { reducedMotion: "reduce" },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: `bun run preview -- --host ${PREVIEW_HOST} --port ${PREVIEW_PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
