import { join } from 'path';
import Puppeteer from 'puppeteer';

/**
 * Create a screenshot from an HTML file and save it as image.
 * @param filePath Path of an HTML file
 * @param fileName Name of the output image
 */
export const createScreenshot = async (filePath: string, fileName: string) => {
  try {
    const htmlFilePath = join('file:', filePath);
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      height: 10,
      width: 1000,
    });

    await page.goto(htmlFilePath);

    await page.screenshot({
      path: `images/${fileName}.png`,
      omitBackground: true,
      fullPage: true,
    });

    await browser.close();
  } catch (error) {
    console.error(error);
    throw Error('Could not create screenshot for a preview');
  }
};
