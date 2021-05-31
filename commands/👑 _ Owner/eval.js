const Discord = require('discord.js');
const config = require('../../config.json');



module.exports = {
        name: 'eval',
        description: 'Eval',
        aliases: ["evl"],
        usage: '<user>',
        accessableby: "OWNER ONLY BRO",
        category: "owner",
    run: async (client, message, args) => {
     
       let array = config.dev
  
  if(!array.includes(message.author.id.toString())) {
    return message.channel.send("This command is only for <@787842689969684480>")
  }
  
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then((output) => {
            if(typeof output !== "string"){
                output = require("util").inspect(output, { depth: 0 });
            }
            if(output.includes(client.token)){
                output = output.replace(message.client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });  
        }).catch((err) => {
            err = err.toString();
            if(err.includes(message.client.token)){
                err = err.replace(message.client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });
      
    }
}