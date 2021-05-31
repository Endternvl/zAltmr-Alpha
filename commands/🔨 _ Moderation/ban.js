const { Client, Message, MessageEmbed } = require('discord.js');
const sendError = require('../../mores/error.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the guild',
    usage: 'ban [user] [reason]',
    category: '🔨 moderation', 
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("BAN_MEMBERS")){
            return sendError("I Don't Have Permission To Ban Members!", message.channel)
        }
        if(!message.member.permissions.has("BAN_MEMBERS")){
            return sendError("You Dont Have Permission To Ban Members!", message.channel)
        }
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ")

        if(!target){
            return sendError("Please Mention A User", message.channel)
        }
        if(!reason){
            return sendError("Please Enter A Reason...", message.channel)
        }
        if(target === message.guild.owner){
            return sendError("What? You Can't Ban Owner!", message.channel)
        }
        if(target === message.author){
            return sendError("I Will Ban You Sometimes")
        }
        if(target.bannable){
            let embed = new MessageEmbed()
            .setTitle("BANNED")
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Banned:\n**__USER:__** ${target}
            **__REASON:__** \`${reason}\`
            **__AUTHOR__:** <@${message.author.id}>`)
            .setColor("RANDOM")
            .setFooter("BANNED_MEMBER COMMAND")

            message.channel.send(embed)
            target.ban()
        } else {
            return sendError("Please Check My Role, Or Make My Role Higher Than Everyone.", message.channel)
        }
    }
}