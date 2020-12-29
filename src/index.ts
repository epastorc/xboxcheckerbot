import { handler, handleUpdate } from "./telegram/handler";

 handler();
try {
  exports.telegramBotWebhook = async (req: any, res: any) => {
    handleUpdate(req.body, res);
  };
} catch (error) {
  console.log(error);
}
