import { Telegraf } from "telegraf";
import { searchGamePrice, getTrends } from "../core/search/search";
import { parseMessageCommand } from "./parse";

const token: string = process.env.TELEGRAM_BOT_TOKEN ? process.env.TELEGRAM_BOT_TOKEN : '';
const commandSearchPrices: string = 'xbox';
const commandTrends: string = 'trends';
const messageWelcome: string = 'Welcome';

const bot = new Telegraf(token);

export function handler(): void {
  bot.start((ctx) => ctx.reply(messageWelcome));
  bot.command(commandSearchPrices, async (ctx) => {
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
  bot.command(commandTrends, async (ctx) => {

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