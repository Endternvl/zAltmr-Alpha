const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db")
const default_prefix =  require('../../config.json').default_prefix;

module.exports = {
  name: "help",
  aliases : ['h', 'halp', 'h3lp', "commands", "c0mm4nd5", "c0mmands", "c0mm4nds", "comm4nds", "comm4nd5", "command5", "allcmds"],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle(`${client.user.username}'s Commands`)
        .addFields(categories)
        .setDescription(
          `Hello, To Get More Info About The Commands, You Can Execute Help Command With The Command Name, For Example, \`${prefix}help ping\``
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setImage("https://cdn.discordapp.com/attachments/811143476522909718/842048732174221352/zaltmrbanner.gif")
        .setColor(roleColor);

        let database = db.get(`cmd_${message.guild.id}`)

      if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push("`" + m.name + "`")
        })

        embed.addField("🎁 Custom Commands", array.join(", "))
      }
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Details")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};