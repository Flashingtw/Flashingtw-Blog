import { defineConfig, devices } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  testMatch: "**/safari-scroll.spec.ts",
  projects: [
    {
      name: "webkit-desktop",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "webkit-tablet",
      use: {
        browserName: "webkit",
        viewport: { width: 834, height: 1194 },
        userAgent: devices["iPad Pro 11"].userAgent,
        deviceScaleFactor: 2,
        hasTouch: true,
        // Windows WebKit 不支援 isMobile，保留觸控與平板尺寸。
        isMobile: false,
      },
    },
  ],
});
