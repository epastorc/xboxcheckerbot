const puppeteer = require("puppeteer");

const ENTER_CHARCODE = 13
const URL = "https://xbox-store-checker.com/en/";
export async function getPrices(name: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  await page.type("#search-game-welcome", name);
  await page.type("#search-game-welcome", String.fromCharCode(ENTER_CHARCODE));

  await page.waitForTimeout(2000);

  let prices = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".game-list li"), (element) => {
      const title = element.querySelector(".game-title")?.textContent;
      const price = element.querySelector(".pprice")?.textContent;
      const imgUrl = element.querySelector(".game-list-cover-col img")?.getAttribute('src');
      const country = element.querySelector(".game-pays")?.textContent;
      const moreInfoLink = element.querySelector(".game-title a")?.getAttribute('href');
      return { title, price, imgUrl, country, moreInfoLink };
    })
  );
  browser.close();
  
  return removeEmptyObject(prices);
} // get element name="search"

function removeEmptyObject(array: any[]) {
    return array.filter((item) => Object.keys(item).length > 0);
  }
export function generateScreenShot(page: any) {
  return page.screenshot({ path: "example.png" });
}

