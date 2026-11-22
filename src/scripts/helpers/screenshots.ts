import { join } from 'node:path';
import Puppeteer from 'puppeteer';

const VIEWPORT = {
  width: 1000,
  height: 10,
};

const SCREENSHOT_DIR = 'images';

export const createScreenshot = async (filePath: string, fileName: string) => {
  const browser = await Puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto(`file:${filePath}`);

    await page.screenshot({
      path: join(SCREENSHOT_DIR, `${fileName}.png`),
      omitBackground: true,
      fullPage: true,
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to create screenshot for: ${fileName}`);
  } finally {
    await browser.close();
  }
};
