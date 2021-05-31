module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Music stopped because i'm disconnected!`);
};