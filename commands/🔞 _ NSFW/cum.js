const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "cum",
  aliases: [],
  category: "nsfw",
  description: "Get some wallpapers",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("This channel was unsupported for NSFW content")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.cum());
    return message.channel.send(akanekoSan);
      
    }
  }
}