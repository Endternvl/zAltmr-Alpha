const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const db = require('quick.db');
const { default_prefix } = require('../../config.json');

module.exports = {
  name: "cry",
  category: "fun",
  description: "Cry with gif",
  run: async (client, message, args) => {
    
    let data = await Random.getAnimeImgURL("cry");

    let reason = args.slice(0).join(" ")

    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(reason || `Please talk with ${message.author.username} he/she are crying | you can also use a reason by doing "${prefix}cry im crying or else..."`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};