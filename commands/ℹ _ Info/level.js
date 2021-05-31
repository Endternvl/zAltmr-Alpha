const db = require('quick.db')
const { getInfo } = require("../../handlers/xp.js")
const canvacord = require("canvacord");
const Discord = require("discord.js");
const { sendError } = require('../../mores/error');
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "info",
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    
    if(user.bot) {
      return sendError("Bots Don't Have Levels! Even Me...", message.channel)
    }
    
    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    
    const {level, remxp, levelxp} = getInfo(xp);
    
const rank = new canvacord.Rank()
    .setAvatar(user.displayAvatarURL({dynamic: false,  format: 'png'}))
    .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/811143476522909718/844935440867131402/zAltmrLEVELCARD.png")
    .setCurrentXP(remxp)
    .setRequiredXP(levelxp)
    .setLevel(level)
    .setStatus(user.presence.status)
    .setProgressBar("#00FFFF", "COLOR")
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, `zRank.png`);
        message.channel.send(attachment);
    });   
    
    
    
    
  }
}