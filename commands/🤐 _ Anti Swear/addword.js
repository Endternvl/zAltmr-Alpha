const Discord = require("discord.js")
const db = require('quick.db')
const { default_prefix } = require('../../config.json')
module.exports = {
  name: "addword",
   bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  author:
    "VIEW_CHANNEL" ||
    "EMBED_LINKS" ||
    "ATTACH_FILES" ||
    "MANAGE_CHANNELS" ||
    "MANAGE_GUILD" ||
    "MANAGE_ROLES",
category: 'anti-swear',
  run: async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
    if (!message.channel.permissionsFor(message.author).has("MANAGE_GUILD")) return message.channel.send(":x: | **You dont have permissions to use this Command!**");
    let pog = db.get(`words_${message.guild.id}`)
    let word = args[0]
    if (!word) {
      let embed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`:x: | **No word provided**\nFormat: \`${prefix}addword fk\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setColor("#FF0000")
      return message.channel.send({
        embed: embed
      })
    }
    if (pog && pog.find((find) => find.word == word)) {
            let embed = new Discord.MessageEmbed()
            embed.setAuthor(message.guild.name, message.guild.iconURL())
            embed.setTitle("Error")
            embed.setDescription(`:x: | **The word is already on the database**`)
            embed.setFooter(message.author.tag , message.author.displayAvatarURL({ dynamic: true }));
            embed.setTimestamp()
            embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            return message.channel.send({
              embed: embed
            });
        }
        let yes = {
      word: word,
      author: message.author.tag
        }
        db.push(`words_${message.guild.id}`, yes)
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.guild.name, message.guild.iconURL())
        embed.setTitle("Success")
        embed.setThumbnail(message.guild.iconURL())
        embed.setDescription(`**The word has been added!**`)
        embed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        embed.setColor("RANDOM")
        embed.setTimestamp()
        message.channel.send({
          embed: embed
        })
        message.delete()
  }
}