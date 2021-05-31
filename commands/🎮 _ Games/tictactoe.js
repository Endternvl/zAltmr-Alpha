const { tictactoe } = require('reconlx')
const MessageEmbed = require("discord.js");

module.exports = {
    name : 'tictactoe',
    category: 'games',
    description: 'play tictactoe',
    usage: 'tictactoe <member mention>',
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member to play with!')
            
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}