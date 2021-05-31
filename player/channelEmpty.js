module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Music stopped because everyone is leaving the voice channel!`);
};