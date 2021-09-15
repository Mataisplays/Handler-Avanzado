const Discord = require('discord.js')


module.exports = {
    name: 'ping',
    alias: ['pong', 'xd'],
    permsUser: ["ADMINISTRATOR"],
    permsBot: ["ADMINISTRATOR"],
    onlyOwner: false,
    run: async(client, message, args) => {
        message.channel.send('Pong!' + client.ws.ping)
    }
}