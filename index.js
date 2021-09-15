const Discord = require("discord.js"); //Definimos discord.js
const client = new Discord.Client({
    //definimos el client y sus intents
    intents: 32759,
});

require("dotenv").config();
const fs = require("fs"); // definimos el fs

client.on("ready", async () => {
    console.log(`cliente listo como ${client.user.tag}`);
});

client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
    let prefix = "xd!"; // Aca va el prefix que quieras, en mi caso sera xd!

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.find(
        (c) => c.name === command || (c.alias && c.alias.includes(command))
    );
    if (cmd) {
        if (!message.member.permissions.has(cmd.permsUser || [])) {
            return message.channel.send(
                `No tienes permisos para usar el comando ${command}`
            );
        }

        if (!message.guild.me.permissions.has(cmd.permsClient || [])) {
            return message.channel.send(
                `No tengo el permiso ${cmd.permsClient} para ejecutar el comando **${command}**`
            );
        }

        if(cmd.onlyOwner && message.author.id !== "726159353970819102") return message.channel.send(`Este comando es solo para mi dueño`)

        cmd.run(client, message, args);
    }
});

client.login(process.env.token);
