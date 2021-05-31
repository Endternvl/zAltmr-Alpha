module.exports = {
    name: "shutdown",
    aliases: ["turnoff"],
    description: "Shuts down the bot !!",
    category: "owner",
    example: `sz!shutdown`,

    run: async(client, message, args) => {
        
        if (message.author.id !== "787842689969684480") {
            return;
        }
        
        await message.channel.send(`✅ Thank You For Letting Me Rest!`)
        process.exit()
    }
}