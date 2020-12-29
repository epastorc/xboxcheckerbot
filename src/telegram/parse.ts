import { TelegrafContext } from "telegraf/typings/context";

export function parseMessageCommand(context: TelegrafContext): string{
    if (context.message?.text) {
    let userInput: string[] = context.message.text.split(" ");
    userInput = userInput?.splice(1, userInput.length);
    return userInput?.join(" ");
    }else{
        return '';
    }
}