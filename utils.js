const sendFile = async (item, ctx) => {
  if (item) {
    try {
      await ctx.replyWithDocument(item);
    } catch (e) {
      ctx.replyWithMarkdown(
        `⚠️ ${e.message}\n\n👉 Try manually downloading [here](${item})\n\n👉 The File Is Too Large*`,
      );
    }
  }
};

module.exports = {
  sendFile,
};
