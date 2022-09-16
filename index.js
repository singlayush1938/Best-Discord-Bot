const config = require('./config.json')

const { Collection, EmbedBuilder, Client, GatewayIntentBits, ActivityType, PermissionsBitField, PermissionFlagsBits} = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
});

const { QuickDB } = require('quick.db')
const db = new QuickDB()

const fs = require('fs')

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
    setInterval(() => {
        client.user.setPresence({
            activities: [{ name: `${config.bot.prefix}help`, type: ActivityType.Watching }],
            status: 'idle',
        })
    }, 10000)
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {

    var prefix = await db.get(`PREFIX.${message.guild.id}`)
    if (!prefix) {
        var prefix = config.bot.prefix
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    if (!message.guild.id) return;
    if (message.author.bot) return;

    if (message.content.includes(`<@${client.user.id}>`)) {     
        try {
            const embed = new EmbedBuilder()
                .setDescription(`Prefix for this server is  **${prefix}**`)
            message.reply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 10000)
                setTimeout(() => message.delete(), 10000)
            })
        } catch (e) {
            console.log(e)
            message.reply('Can\'t Send embeds here..')
        }
    }

    if (!message.content.startsWith(prefix)) return;

    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
})

client.on("guildCreate", async guild => {

    try {
        const owner = client.users.cache.get(config.members.owner)
        if (owner) {
            owner.send(`Joined a guild \`${guild.name}\` having \`${guild.memberCount}\` members`)
        }
    } catch (e) {
        console.log(e)
    }

})

client.on("guildDelete", guild => {

    try {
        const owner = client.users.cache.get(config.members.owner)
        if (owner) {
            owner.send(`Left a guild \`${guild.name}\` having \`${guild.memberCount}\` members`)
        }
    } catch (e) {
        console.log(e)
    }
})

client.on('guildMemberAdd', async member => {

    const enabled = await db.get(`GREET_${member.guild.id}`)
    if (enabled) {
        try {
            const channel = member.guild.channels.cache.get(enabled)
            await channel.send(`${member} , Welcome to the \`${member.guild.name}\``).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 10000)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const joinrole = await db.get(`JOINROLE_${member.guild.id}`)
    if (joinrole) {
        const role = member.guild.roles.cache.get(joinrole)
        if (role) {
            try {
                await member.roles.add(role)
            } catch (e) {
                console.log(e)
            }
        }
    }

})

client.login(config.bot.token)