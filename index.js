const { token, default_prefix } = require("./config.json");
const config = require('./config.json')
const discord = require("discord.js"); 
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const { version } = require('./package.json');
const { version: discordjsVersion } = require('discord.js');
const clientID = config.clientID; 
const clientSecret = config.clientSecret;
const client = new discord.Client({
  disableEveryone: true 
});
require('discord-buttons')(client)
const { MessageButton } = require('discord-buttons')
const { addexp } = require('./handlers/xp.js')
const db = require("quick.db")
require('./util/reply');
const { Player } = require('discord-player');
const player = new Player(client, {
	enableLive: true,
	autoSelfDeaf: true,
	leaveOnEnd: true,
	leaveOnEndCooldown: 5000,
	leaveOnEmpty: true,
	leaveOnStop: true
});

//---------Making Collections---------\\

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.player = new Player(client);
client.queue = new Map();
client.player = player;
client.emotes = require('./emotes.json');
client.filters = require('./filters.json');

//---------End Of Collections---------\\

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//--------Started--------\\

client.on("message", async message => {
  
if(message.author.bot) return;
  if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  client.config = {
  prefix: prefix
}
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    const pingedembed = new discord.MessageEmbed()
    .setTitle('Hello!')
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setImage("https://cdn.discordapp.com/attachments/811143476522909718/842048732174221352/zaltmrbanner.gif")
    .setDescription(`Hello! I'm ${client.user.username}, A Multipurposed Bot, Created By <@787842689969684480> My Prefix In The Server Is \`${prefix}\` Searching For My Commands? Try To Do \`${prefix}help\``)
    .setColor("RANDOM");
    return message.reply(pingedembed);
  }
  
  if(!message.content.startsWith(prefix)) return;
  
     if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;


  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
  
return addexp(message)

 })

client.snipe = new discord.Collection();
client.on("messageDelete", function(message, channel) {
  client.snipe.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  let words = db.get(`words_${message.guild.id}`);
  let yus = db.get(`message_${message.guild.id}`);
  if (yus === null) {
    yus = ":x: | **{user-mention}, The Word You said is blacklisted!**";
  }
  if (message.content.startsWith(prefix + "addword")) return;
  if (message.content.startsWith(prefix + "delword")) return;
  if (message.content.startsWith(prefix + "setwarnmsg")) return;
  if (message.content.startsWith(prefix + "words")) return;
  let pog = yus
    .split("{user-mention}")
    .join("<@" + message.author.id + ">")
    .split("{server-name}")
    .join(message.guild.name)
    .split("{user-tag}")
    .join(message.author.tag)
    .split("{user-username}")
    .join(message.author.username);
  if (words === null) return;
  function check(msg) {
    //is supposed to check if message includes da swear word
    return words.some(word =>
      message.content
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(word.word.toLowerCase())
    );
  }
  if (check(message.content) === true) {
    message.delete();
    message.channel.send(pog).then(m=>m.delete({timeout:5000}).catch(e=>{}));
  }
});

//---------DISCORD INVITE LINK BUTTON---------\\
client.on('clickButton', async (button) => {
  if (button.id === 'inviteyes') {
    button.reply.defer()
    
    const inviteyb = new discord.MessageEmbed()
    .setTitle("Thanks!")
    .setDescription(`Here Is My Invite Links: \nServer Moderator: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=2147483647)**
    Server Helper: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=4294967287)** \n Recommended: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=8589934591)**`)
    .setColor("GREEN");

    const joindsc = new MessageButton()
    .setStyle('url')
    .setLabel('Join Our Support Server!')
    .setURL('https://discord.gg/9R7hZtbnyw');
    button.message.edit({button: joindsc, embed: inviteyb})

  }
  if(button.id === 'inviteno'){
    button.reply.defer()
    const noooyb = new discord.MessageEmbed()
    .setTitle('Okay Then')
    .setDescription('But Please Join Our Support Server!')
    .setColor("RED");

    const joindsc = new MessageButton()
    .setStyle('url')
    .setLabel('Join Our Support Server!')
    .setURL('https://discord.gg/9R7hZtbnyw');

    button.message.edit({button: joindsc, embed: noooyb})
  }
});

client.on("guildMemberAdd", async member => {

  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {

    return;

  }

  let welimages = db.get(`welimage_${message.guild.id}`)

  

   let data = await canva.welcome(member, { link: welimages || "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg" })

 

    const attachment = new discord.MessageAttachment(

      data,

      "zHi.png"

    );

  

  

  client.channels.cache.get(chx).send(`Hello And Welcome To ${message.guild.name} ` + member.user.username, attachment);

});

//afk
//--------GIVEAWAY--------\\
client.config = config;

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./storages/giveaways.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

//----end----\\



//--------CHECKS IF THE BOT IS ONLINE--------\\

client.on("ready", () => {
    client.user.setStatus("online"); // You Can Set It To dnd, online, idle. dont set it to offline plz
    console.log(`${client.user.username} was turned on || Join TimesCord Community For Early Updates || https://discord.gg/AyjQjmUvE4`)
});

//---------Here To Set The Activity Status---------\\
client.on("ready", async () => {
  console.log(`Powered By zAltmr 1.0.0 and DISCORDJS ${discordjsVersion}`)
  const status = [
    `in ${client.guilds.cache.size} Servers | ${client.user.username}`,
    `with ${client.users.cache.size} Users | ${client.user.username}`,
    `in ${client.channels.cache.size} Channels | ${client.user.username}`,
    `${default_prefix}help | ${client.user.username}`,
  ]
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], { type: "PLAYING" }) //You Can Set The Type To PLAYING/WATCHING/COMPETING/LISTENING.
  }, 5000)
});

//Token Is Required.

client.login(token).catch(err => {
  console.log("Invalid Token Or You're Not Putting The Token.")
})
