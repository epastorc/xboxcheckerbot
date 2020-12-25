import { Telegraf } from "telegraf";

const token: string =  "464068632:AAEMKij-KJ6Jj9POWv07fpXXFyZw-aFbPJM";
const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

try{
    bot.telegram.setWebhook(
        `https://${process.env.GOOGLE_CLOUD_REGION}-${process.env.GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}` //FUNCTION_TARGET is reserved Google Cloud Env
    
    );
}catch(error){
    console.log("error", error)
}

try{
    exports.telegramBotWebhook = (req: any, res: any) => {
        bot.handleUpdate(req.body, res);
    };
}catch(error){
    console.log(error);
}
