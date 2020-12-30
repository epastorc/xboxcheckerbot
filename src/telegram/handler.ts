import { Telegraf } from "telegraf";
import { searchGamePrice, getTrends } from "../core/search/search";
import { parseMessageCommand } from "./parse";

const TOKEN: string = process.env.TELEGRAM_BOT_TOKEN ? process.env.TELEGRAM_BOT_TOKEN : '';
const COMMAND_SEARCH_PRICES: string = 'xbox';
const COMMAND_GET_TRENDS: string = 'trends';
const WELCOME_MESSAGE: string = 'Welcome';

const bot = new Telegraf(TOKEN);

export function handler(): void {
  bot.start((ctx) => ctx.reply(WELCOME_MESSAGE));
  bot.command(COMMAND_SEARCH_PRICES, async (ctx) => {
    const message = parseMessageCommand(ctx);
    if (message) {
      const prices = await searchGamePrice(message);
      if (prices.length === 0) {
        ctx.reply('No hay resultados');

      }
      prices.forEach(item => {
        ctx.replyWithHTML(item);
      })
    } else {
      ctx.reply('No hay resultados');
    }
  });
  bot.command(COMMAND_GET_TRENDS, async (ctx) => {

    const trends = await getTrends();
    if (trends.length === 0) {
      ctx.reply('No hay resultados');

    }
    trends.forEach(item => {
      ctx.replyWithHTML(item);
    })
  });
  bot.launch();

  try {
    bot.telegram.setWebhook(
      `https://${process.env.GOOGLE_CLOUD_REGION}-${process.env.GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}`
    );
  } catch (error) {
    console.log("error", error);
  }
}
export function handleUpdate(body: any, res: any) {
  bot.handleUpdate(body, res);
}