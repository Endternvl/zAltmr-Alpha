const fetch = require("node-fetch");

module.exports = {
  name: "catfact",
  description: "Returns a cat fact",
  category: "animal",
  run: async (client, message) => {
    const fact = await fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then(({ fact }) => fact);

    message.channel.send(fact);
  },
};