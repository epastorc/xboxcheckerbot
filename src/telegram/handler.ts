import { Telegraf } from "telegraf";
import { searchGamePrice, getTrends } from "../core/search/search";
import { COMMAND_SEARCH_PRICES, COMMAND_GET_TRENDS } from "./commands.type";
import { parseMessageCommand } from "./parse";

const TOKEN: string = process.env.TELEGRAM_BOT_TOKEN ? process.env.TELEGRAM_BOT_TOKEN : '';

const WELCOME_MESSAGE: string = 'Welcome';

const bot = new Telegraf(TOKEN);

const COMMAND_HANDLERS = {
  [COMMAND_SEARCH_PRICES]: async (ctx: any) => {
    ctx.reply("Searching for game prices...")
    const message = parseMessageCommand(ctx);
    if (!message) {
      ctx.reply('Game name is required.');
      return
    }
    const prices = await searchGamePrice(message);
    if (prices.length === 0) {
      ctx.reply(`No game prices available for ${message}`);
      return 
    }
    prices.forEach(item => {
      ctx.replyWithHTML(item);
    })
  },
  [COMMAND_GET_TRENDS]: async (ctx: any) => {
    ctx.reply("Getting trends...")
    const trends = await getTrends();
    if (trends.length === 0) {
      ctx.reply('There are no trends available.');
      return
    }
    trends.forEach(item => {
      ctx.replyWithHTML(item);
    })
  }
}

export function handler(): void {
  bot.start(ctx => ctx.reply(WELCOME_MESSAGE));
  Object.entries(COMMAND_HANDLERS).forEach(([key, value]) => {
    bot.command(key, value);
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