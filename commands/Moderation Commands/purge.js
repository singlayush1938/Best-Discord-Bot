const { QuickDB } = require('quick.db')
const db = new QuickDB()
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'purge',
    aliases: ['clear'],
    run: async (client, message, args) => {

        const logchannelid = await db.get(`LOGCHANNEL_${message.guild.id}.enabled`)

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('You don\'t have required permission i.e. \`MANAGE MESSAGES\`')
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('I don\'t have required permission i.e. \`MANAGE MESSAGES\`')
        if (!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
        if (isNaN(args[0])) return message.channel.send('Numbers are only allowed')
        if (parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99')
        await message.channel.bulkDelete(parseInt(args[0]) + 1).then(msg => {

            const logchannel = message.guild.channels.cache.get(logchannelid)
            if (logchannel) {
                const embed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setAuthor({ name: 'Messages Purged', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`Amount : ${args[0]}`)
                    .setFooter({ text: `Purged by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                logchannel.send({ embeds: [embed] })
            }

        }).catch(err => {
            console.log(err)
            message.channel.send('I dont have permission to delete messages')
        }).then(() => {
            message.channel.send('Deleted ' + args[0] + " messages.")
        })
    }
}