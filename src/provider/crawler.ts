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
      const country = element.querySelector(".game-pays")?.textContent;
      const moreInfoLink = element.querySelector(".game-title a")?.getAttribute('href');
      return { title, price, country, moreInfoLink };
    })
  );
  browser.close();
  
  return removeEmptyObject(prices);
} 
export async function getTrendGames() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  let prices = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".home-trends-games-container li"), (element) => {
      const moreInfoLink = element.querySelector(".game-row-cover a")?.getAttribute('href');
      const title = element.querySelector(".game-row-title")?.textContent;
      const price = element.querySelector(".pprice")?.textContent;
      return { title, price, moreInfoLink };
    })
  );
  browser.close();
  
  return removeEmptyObject(prices);
} 

function removeEmptyObject(array: any[]) {
    return array.filter((item) => Object.keys(item).length > 0);
  }
export function generateScreenShot(page: any) {
  return page.screenshot({ path: "example.png" });
}

