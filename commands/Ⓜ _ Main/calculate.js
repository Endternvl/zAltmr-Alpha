const { Client, Message, MessageEmbed } = require("discord.js");
const math = require("mathjs")

module.exports = {
  name: "math",
  category: "main",
  aliases: ["calculate", "calculator"],
  description: "math command! now it's finnaly released!",
  usage: "math <number> <operation> <number>, for EXAMPLE: zamath 100 + 100",

  run: async (client, message, args) => {
    try {
      message.channel.send(
        new MessageEmbed()
        .setTitle("Math | Calculator")
        .setDescription("Gotcha! Here is the result:")
        .addField('**Question**', args.join(" "))
        .addField('**Solution**', math.evaluate(args.join(" ")))
        .setColor("RANDOM")
        .setFooter("📐")
        .setTimestamp()
      )
    } catch (err) {
      message.channel.send("Your Question Is Not Valid! Please Enter The Valid One!")
    }
  },
};