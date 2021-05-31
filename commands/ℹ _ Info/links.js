const discord = require("discord.js");

module.exports = {
  name: "links",
  category: "info",
  description: "**MY LINKS!**",
  aliases: ["link"],
  usage: "links (Support Server, Creator Server, Invite me)",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(`[Support Server](https://dsc.ink/syez)
    [Creator Server (INDONESIA)](https://discord.gg/AaTVgBxHJm)
    [Invite me](https://discord.com/oauth2/authorize?client_id=819041526751297578&scope=bot&permissions=2147483647)
    **ME IN OTHER WEBSITES**
    [TOP.GG (NEW)](https://top.gg/bot/819041526751297578/vote)
    [website](https://Syxe.endternvl.repl.co)`)
    .setColor("RANDOM")
    .setTimestamp()
    
    message.channel.send(embed)
  }
}