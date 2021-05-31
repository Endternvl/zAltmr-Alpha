const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
  name: "silentban",
  description: "Ban a user without him knowing",
  category: "moderation",
  run: async(bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") && !ownerID.includes(message.author.id)) return;
        
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply(`Please specify a user!`);

        const reason   = args.splice(1, args.length).join(' ');

            try {
                message.guild.members.ban(target, {reason: reason.length < 1 ? 'No Reason': reason});
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("**They were successfully banned. User was not notified!**");
                await message.channel.send(embed2);
            
            } catch (error) { console.log(error)}
    }
}