const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["ms"],
  category: "info",
  usage: "sz!snipe",
  description: "get deleted messages",
  run:async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix =  config.DEFAULT_PREFIX
  }
    
    const msg = client.snipe.get(message.channel.id)
    if(!msg) return message.channel.send("`︻デ═一` There are no deleted messages in this channel!")
    const embed = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
   .addField("Deleted by:", `${msg.author}`)
   .addField("In:", message.channel)
   .addField("Content", msg.content)
   .setColor("RANDOM")
   .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
   
    
  }
}