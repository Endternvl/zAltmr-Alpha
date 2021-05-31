const weky = require('weky')
const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
  name: 'war',
  aliases: ['mess'],
  description: 'war with others that makes mess with you',
  usage: '[USER]',
  category: 'games',

  run: async (client, message, args) => {
    let target = message.mentions.users.first()
    if (!message.mentions.users.first()) return message.reply('Please Ping Someone!')
    if (!target === client.user.id) return message.reply("I'm Not Good At Playing This Game... JK! Bots Can't Play Games Like This!")
    if (message.mentions.users.first().bot) return message.reply("Bots Can't Play Games Like This!")
    let fight = new weky.fight({
      message,
      client,
      acceptMessage: `${target}, Do You Want To Mess With <@${message.author.id}>`,
      challenger: message.author,
      opponent: message.mentions.users.first()
    })
    fight.start()
  }
}