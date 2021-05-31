const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

const flags = {
  DISCORD_EMPLOYEE: "<:discordstaff:830630345111371876>",
  DISCORD_PARTNER: "<:discord_partner:830629791916883998>",
  BUGHUNTER_LEVEL_1: "<:level_1:830629376851836928>",
  BUGHUNTER_LEVEL_2: "<:level_2:830629238486728754>",
  HYPESQUAD_EVENTS: "<:hypeevent:830630149866520610>",
  HOUSE_BRAVERY: "<:bravery:830628707206037515>",
  HOUSE_BRILLIANCE: "<:brilliance:830628624587161631>",
  HOUSE_BALANCE: "<:balance:830628798722474014>",
  EARLY_SUPPORTER: "<:supporter:830629542753599528>",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "<:verified_bot:830628203135238184>",
  VERIFIED_DEVELOPER: "<a:bot_maker:830628380986310686>",
};

module.exports = {
  name: "userinfo",
  category: "info",
  description: "Displays information about the user mentioned",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var status;
    target = args[0];
    const member =
      message.mentions.members.last() ||
      message.guild.members.cache.get(target) ||
      message.member;
    switch (member.user.presence.status) {
      case "dnd":
        status = "<:dnd:830627279918858290>";
        break;
      case "offline":
        status = "<:offline:830627345462722630>";
        break;
      case "online":
        status = "<:online:830627309979303976>";
        break;
      case "idle":
        status = "<:idle:830627216214720614>";
        break;
    }
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const userFlags = member.user.flags.toArray();

    function trimArray(arr, maxLen = 10) {
			if (arr.length > maxLen) {
				const len = arr.length - maxLen;
				arr = arr.slice(0, maxLen);
				arr.push(`${len} more...`);
			}
			return arr;
		}

    
    const embed = new MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setAuthor(`${member.user.username}#${member.user.discriminator}`)
      .setColor("2F3136")
      .addField("`User`", [
        `**➥🆔:** ${member.id}`,
        `**❯ NickName:** ${member.nickname ? member.nickname : "❌"}`,
        `**❯ Discriminator:** ${member.user.discriminator}`,
        `**❯ Badges:** ${
          userFlags.length
            ? userFlags.map((flag) => flags[flag]).join(", ")
            : "None"
        }`,
        `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
        })})`,
        `**❯ Account:** ${moment(member.user.createdTimestamp).format(
          "LT"
        )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
          member.user.createdTimestamp
        ).fromNow()}`,
        `**❯ Status:** ${status}`, //member.user.presence.status
        `**❯ Game:** ${member.user.presence.game || "Not playing a game."}`,
        `\u200b`,
      ])
      .addField("`Member`", [
        `**➥ Server Join Date:** ${moment(member.joinedAt).format("LL LTS")}`,
        `**➥ Highest Role:** ${
          member.roles.highest.id === message.guild.id
            ? "None"
            : member.roles.highest.name
        }`,
        `**➥ Roles [${roles.length}]:** ${
          roles.length <= 10
            ? roles.join(", ")
            : roles.length > 10
            ? trimArray(roles)
            : "None"
        }`,
        `\u200b`,
      ])
      .addField('Nitro', member.premiumSince ? 'Yes' : 'No', true)
      .setFooter(
        `• Requested by: ${member.user.tag}`,
        member.user.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();
    return message.channel.send(embed);
  },
};
