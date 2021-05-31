const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "description",
  run: async (client, message, args) => {
    var PinG = `${Date.now() - message.createdTimestamp}`

 var api = message.client.ws.ping;

 if (message.author.bot) return;
  let circles = {
      green: "🟢",
      yellow: "🟡",
      red: "🔴"
  }

  const msg = await message.channel.send(new MessageEmbed()
  .setColor("RED") //you can change this
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .addField("**__WEBSOCKET__**", 
      `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
  ))

  let ping = msg.createdTimestamp - message.createdTimestamp;

  msg.edit(
      new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField("**__LATENCY__**", 
      `${message.createdTimestamp - message.createdTimestamp <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
  )
      .addField("**__API__**",
      `${client.ws.ping <= 200 ? circles.green : ping <= 400 ? circles.yellow : circles.red} ${ping}ms `
      )
  )
  }
}