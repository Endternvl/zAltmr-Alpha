const {Client, Message, MessageEmbed } = require ('discord.js');
const config = require('../../config.json')
const translate = require('@iamtraction/google-translate');
const db = require('quick.db')

module.exports = {
  name: "translate",
  category: "main",
  description: "google translate",
  run: async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
        try {
      const query = args.slice(1).join(" ");
    if (!query) return message.reply(`Dont leave this blank! Try this: \`${prefix}translate id Hello! I'm Altmr!\``)
const arg = args[0]

    const translated = await translate(query, {to: `${arg}`});
    const embed = new MessageEmbed()
    .setTitle("Translated!")
    .addField("Your Query", `\`\`\`fix\n${query}\`\`\``)
    .addField('Selected Language', `\`\`\`fix\n${arg}\`\`\``)
    .addField('Result', `\`\`\`fix\n${translated.text}\`\`\``)
    .setFooter(`© ${client.user.username}`)
    .setColor("#d4c5a2")
    message.channel.send(embed)

    } catch (error) {
      return message.channel.send(`Your question is invalid! Try this: \`${prefix}translate <language> <query>\``)
      .then(() => console.log(error));
    }
  }
}