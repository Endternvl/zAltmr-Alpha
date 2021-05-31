const random = require("something-random-on-discord");

module.exports = {
  name: "joke",
  category: "fun",
  description: "Get some fun jokes",
  run: async (client, message, args) => {
    
    let data = await random.getJoke()
    message.channel.send(data)
    
  }
}