const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")

module.exports = {
  name: "addemoji",
  aliases: ["stealemoji"],
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      return message.channel.send(`:x: | **You Don't Have Enough Permission To Add Emoji! Missing Perms: \`MANAGE_EMOJIS\`**`)
    }
    let isUrl = require("is-url");
    let type = "";
    let name = "";
    let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
    if (emote) {
      emote = emote[0];
      type = "emoji";
      name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
    } else {
      emote = `${args.find(arg => isUrl(arg))}`
      name = args.find(arg => arg != emote);
      type = "url";
    }
    let emoji = { name: "" };
    let Link;
    if (type == "emoji") {
      emoji = Discord.Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
        emoji.animated ? "gif" : "png"
        }`
    } else {
      if (!name) return message.channel.send(":x: | Please provide a name for emoji!!");
      Link = message.attachments.first() ? message.attachments.first().url : emote;
    }
    message.guild.emojis.create(
      `${Link}`,
      `${`${name || emoji.name}`}`
    ).then(em => message.channel.send(em.toString() + " added!")).catch(error => {
      message.channel.send(`:x: | **Wrong Usage! Please do:** \`${config.default_prefix}addemoji <emoji_link/emoji> <emoji_name>\``)
      console.log(`Wrong Usage In ${message.guild.name}`)
    })

  }
}