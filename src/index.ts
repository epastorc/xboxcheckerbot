import { Telegraf } from "telegraf";
import { searchGamePrice } from "./core/search/search";

const token: string = "464068632:AAEMKij-KJ6Jj9POWv07fpXXFyZw-aFbPJM";
const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply("Welcome23!"));
bot.command("xbox", async (ctx) => {
  console.log("Received xbox command")
  if (ctx.message?.text) {
    let userInput: string[] = ctx.message.text.split(" ");
    userInput = userInput?.splice(1, userInput.length);
    const message = userInput?.join(" ");
    console.log(message)
    const prices = await searchGamePrice(message);
    console.log(prices)
    if(prices.length === 0){
      ctx.reply('No hay resultados');

    }
    prices.forEach(item => {
      ctx.replyWithHTML(item);
    })
  } else{
    ctx.reply('No hay resultados');
  }
});
bot.launch();

try {
  bot.telegram.setWebhook(
    `https://${process.env.GOOGLE_CLOUD_REGION}-${process.env.GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}` //FUNCTION_TARGET is reserved Google Cloud Env
  );
} catch (error) {
  console.log("error", error);
}

try {
  exports.telegramBotWebhook = (req: any, res: any) => {
    bot.handleUpdate(req.body, res);
  };
} catch (error) {
  console.log(error);
}
