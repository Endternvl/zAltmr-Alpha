const { MessageEmbed } = require("discord.js");
const reactions = ["🤔", "😅", "😀", "😐"]
const answers = [    "Yes.",
    "No.",
    "My sources say yes",
    "Most likely.",
    "idk",
    "maybe sometime",
    "Outlook good.",
    "Signs point to yes.",
    "Definitely",
    "Absolutely",
    "Nope.",
    "No thanks, I won’t be able to make it.",
    "No Way!",
    " It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "idk choose urself im lazy",
    "How about u?",
    "Hmm... I guess YEZ",
    "Hmm... I guess NO"]

module.exports = {
    name: "8ball",
    description: "8Ball",
    category: "games",
    run: (client, message, args) => {
            const question = args.join(' ');
    if (!question) return message.channel.send('**🥱 - You Didn\'t Ask Me Anything .**');
    const botans = new MessageEmbed()
      .setThumbnail(message.guild.iconURL())
      .setColor('RANDOM')
      .setTitle(`8ball`)
      .setDescription(`${message.author} Asked Me: \n\`${question}?\` \nAnd My Answer Is: \n**${reactions[Math.floor(Math.random() * reactions.length)]} - ${answers[Math.floor(Math.random() * answers.length)]} !**`)
      .setTimestamp();
      message.channel.send(botans).then(() => message.delete());
  }
};