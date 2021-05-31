const shorten = require("isgd");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'shorten',
  usage: '<link for shortner> <name for shortner>',
  category: 'fun',
  description: 'shorten link command! its cool then',

  run: async (client, message, args) => {
    const validemb = new MessageEmbed()
    .setTitle("Please Enter A Valid URL!")
    .setColor("RED")
    .setFooter("©️ SyzeBot | Skaryey");
    if (!args[0]) return message.channel.send(validemb);

    if (args[1]) {
      return shorten.custom(args[0], args[1], function(res) {
        const notshortbd = new MessageEmbed()
        .setTitle("An Error Occurred!")
        .setDescription("Error: URL already used by someone, or it's an invalid link!")
        .setFooter("©️ SyzeBot | Skaryey")
        .setColor("RED");
        if (res.includes("Error"))
          return message.channel.send(
            notshortbd
          );
          const resultbd = new MessageEmbed()
          .setTitle("Link Shortener")
          .setDescription("Your link has beed shortened!")
          .setColor("RANDOM")
          .setFooter("©️ SyzeBot | Skaryey")
          .addField("RESULT", `Here is your shortened link: **<${res}>**`);

        message.channel.send(resultbd);
      })
    }
    if (args[0] || !args[1]) {
      return shorten.shorten(args[0], function(res) {
        if (res.includes("Error"))
          return message.channel.send("**Please, enter valid URL! __EX:__ `sz!shorten https://dsc.gg/ dscggdiscord**");
        message.channel.send(`**<${res}>**`);
      });
    }
  }

}