const Discord = require('discord.js')

module.exports = async (text, channel) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Success")
    .setDescription("✅ - " + text)
    .setColor("RANDOM")
    await channel.send(embed)
}