import {
  getPrices,
} from "../../provider/crawler";


export async function searchGamePrice(name: string): Promise<string[]> {
  const prices =  await getPrices(name);
  return parsePricesToMessage(prices)
}

function parsePricesToMessage(array: any): string[]{

  return array.map((element: any) => {
    const { title, price, imgUrl, country, moreInfoLink } = element;
    const formattedTitle = `<strong>${title}</strong>\n`;
    const formattedPrice = `El el mejor precio es: ${price}\n`;
    const formattedCountry = country ? `País: ${country.replace(/\n|\t/gi, '')}\n` : '';
    const formattedMoreInfo = `Más información: ${moreInfoLink}\n`;
    const img = `${imgUrl}\n`;
    return [formattedTitle,formattedPrice,formattedCountry,formattedMoreInfo, img].join('');
    
  })
}

