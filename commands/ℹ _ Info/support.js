const Discord = require("discord.js");

module.exports = {
  name: "support",
  category: "info",
  usage: "support",
  description: "bot's support server",

  run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Support Links")
    .setDescription("Syzebot's Support Links")
    .setThumbnail(client.user.displayAvatarURL())


    .addField("Support Server", "[Click Me](https://discord.gg/QB5uZJ9tQh) To Get Into My Support Server")


    .addField("Invite Me", "[Click Me](https://dsc.ink/syze) to invite me")


    .addField("Website", "[Click Me](https://syxe.endternvl.repl.co) To Get Into My Website!")


    .addField("Vote Me!", "Vote me in [TOP.GG](https://top.gg/bot/819041526751297578/vote) \n Vote me in [DISCORDBOTLIST](https://discordbotlist.com/bots/syzebot/upvote)")
    .setColor("RANDOM")
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp();
    message.channel.send(embed)
  }
}