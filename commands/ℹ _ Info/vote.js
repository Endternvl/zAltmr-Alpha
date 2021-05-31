const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "vote",
  usage: "none",
  description: "Vote in DISCORD BOT LIST or TOPGG",
  category: "info",

  run: async(client, message, args) => {
    const vote = new MessageEmbed()
    .setTitle("Vote Me!")
    .setDescription("**__VOTE IN TOP.GG__**\n [`CLICK ME`](https://top.gg/bot/819041526751297578/vote) \n **__VOTE IN DBL__**\n [`CLICK ME`](https://discord.ly/syzebot)\n **__VOTE IN DCLIST__**\n [`CLICK ME`](https://dclist.net/bots/819041526751297578)")
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter("©️ " + client.user.username, client.user.displayAvatarURL());

    message.channel.send(vote)
  }
}