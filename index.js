async function main() {
  const { Telegraf, Markup } = require("telegraf");
  const { getDetails } = require("./api");
  const { sendFile } = require("./utils");
  const express = require("express");

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    try {
      ctx.reply(
        `Hi ${ctx.message.from.first_name},\n\nTeraBox link Downloader\n\nSend any terabox link to download`,
        Markup.inlineKeyboard([
          Markup.button.url(" Channel", "https://t.me/+qdLjzK5bWoViOWQ1"),
          Markup.button.url("Report bug", "https://t.me/seeuadmin_bot"),
        ]),
      );
    } catch (e) {
      console.error(e);
    }
  });

  bot.on("message", async (ctx) => {
    if (ctx.message && ctx.message.text) {
      const messageText = ctx.message.text;
      if (
        messageText.includes("terabox.com") ||
        messageText.includes("teraboxapp.com")
      ) {
        //const parts = messageText.split("/");
        //const linkID = parts[parts.length - 1];

        // ctx.reply(linkID)

        const details = await getDetails(messageText);
        if (details && details.direct_link) {
          try {
            ctx.reply(`Sending files please wait`);
            sendFile(details.direct_link, ctx);
            URL url = MyClass.class.getResource("https://i.postimg.cc/WpY3v7mq/Hourglass.gif");
            ImageIcon imageIcon = new ImageIcon(url);
            JLabel label = new JLabel(imageIcon);
          } catch (e) {
            console.error(e); // Log the error for debugging
          }
        } else {
          ctx.reply('Error');
        }
        console.log(details);
      } else {
        ctx.reply("send a valid Terabox link");
      }
    } else {
      //ctx.reply("No message text found.");
    }
  });

  const app = express();
  // Set the bot API endpoint
  app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_URL }));

  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

main();
