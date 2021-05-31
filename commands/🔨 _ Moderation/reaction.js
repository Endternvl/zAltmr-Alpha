const discord = require("discord.js");

module.exports = {
  name: "react",
  aliases: ["reaction-role", "rr"],
  category: "moderation",
  description: "react to a message",

  run: async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need `MANAGE_MESSAGES` permission!")

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Please add a `MANAGE_MESSAGES` permission!")

    // gets the role for the reaction
    let reactRole = message.mentions.roles.first()

    // if no role provided it will send this
    if (!reactRole) return message.channel.send(`Say a role you want to get added`)

    // create an embed
    const embed = new discord.MessageEmbed()
      .setColor("RANDOM") // the color of the embed 
      .setTitle("Reaction Roles")
      .setDescription(`React with ✅ to get the role ${reactRole}`)
      .setFooter("Reaction Role") // desc of the embed
      .setTimestamp();

    // send the embed.
    let msg = await message.channel.send(embed)

    // reacts to the embed with an emoji
    await msg.react('✅')

    // filtering so it only works for the emoji choosen
    const reactionFilter = (reaction, user) => ["✅"].includes(reaction.emoji.name)

    // making a collection for the emoji
    const reactionCollector = msg.createReactionCollector(reactionFilter, { dispose: true })

    // setting the collection that when the reaction was removed
    reactionCollector.on("remove", (reaction, user) => {

      // if the bot removed their reaction return
      if (user.bot) return;

      // getting the member of the server who reacted 
      let member = reaction.message.guild.members.cache.find(member => member.id === user.id)

      // remove the role when he/she remove his/her reaction.
      member.roles.remove(reactRole.id)
    })

    reactionCollector.on("collect", (reaction, user) => {

      // if a bot reacted return
      if (user.bot) return;

      // getting the member of the server who reacted 
      let member = reaction.message.guild.members.cache.find(member => member.id === user.id)

      // adds the role to the member!
      member.roles.add(reactRole.id)
    })
  }
}