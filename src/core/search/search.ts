import {
  getPrices,
  getTrendGames
} from "../../provider/crawler";


export async function searchGamePrice(name: string): Promise<string[]> {
  const prices = await getPrices(name);
  return parsePricesToMessage(prices)
}
export async function getTrends(): Promise<string[]> {
  const trends = await getTrendGames();
  return parsePricesToMessage(trends)
}

function parsePricesToMessage(array: any): string[] {

  return array.map((element: any) => {
    const { title, price, country, moreInfoLink } = element;
    const formattedTitle = `<strong>${title}</strong>\n`;
    const formattedPrice = price ? `El mejor precio es: ${price}\n` : '-';
    const formattedCountry = country ? `País: ${country.replace(/\n|\t/gi, '')}\n` : '';
    const formattedMoreInfo = `Más información: ${moreInfoLink}\n`;
    return [formattedTitle, formattedPrice, formattedCountry, formattedMoreInfo].join('');

  })
}

