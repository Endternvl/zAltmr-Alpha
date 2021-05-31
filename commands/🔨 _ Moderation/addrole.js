const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "addrole",
  aliases: ["role"],
  category: "moderation",
  description: "Add role to any user",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("sorry you need permission = `MANAGE_ROLES`");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission = `MANAGE_ROLES`");
    }
    let target = message.mentions.members.first();

    if (!target) return message.reply(`:x:please mention user!`)

    let arole = message.mentions.roles.first();

    if (!arole) return message.reply(`:x:please mention role for add!`)

    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });

    const embed = new MessageEmbed()

      .setColor("RANDOM")
      .setDescription(`<:check:825944444321923082>changed role for ${target.user.username} added ${arole}`)
      target.roles.add(arole)
      await message.channel.send(embed)

    }
};