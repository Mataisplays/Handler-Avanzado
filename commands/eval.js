const Discord = require('discord.js')


module.exports = {
    name: 'eval',
    alias: ['pong', 'xd'],
    permsUser: [],
    permsBot: ["MANAGE_SERVER"],
    onlyOwner: true,
    run: async(client, message, args) => {
        message.channel.send('Eres mi owner')
    }
}