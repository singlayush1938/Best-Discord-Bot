const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const config = require('../../config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: "logchannel",
    run: async (client, message, args) => {
        try {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageServer)) return message.reply("Required Permission : `MANAGE SERVER`")
            if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ReadMessageHistory)) return;

            if (args[0] === 'enable') {

                const enabled = await db.get(`LOGCHANNEL_${message.guild.id}.enabled`)
                if (enabled) return message.reply("Logchannel already enabled")

                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
                if (!channel) return message.reply("Please Specify a channel!!")

                await db.set(`LOGCHANNEL_${message.guild.id}.enabled`, channel.id)
                message.channel.send(`${channel} has been set as logchannel`)

                if (channel) {
                    const embed = new EmbedBuilder()
                        .setColor('#00FF00')
                        .setAuthor({ name: 'Log Channel Setted', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription('All Logging will be sent here')
                        .setFooter({ text: `Setted by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    channel.send({ embeds: [embed] })
                }

            } else if (args[0] === 'disable') {

                const enabled = await db.get(`LOGCHANNEL_${message.guild.id}.enabled`)
                if (!enabled) return message.reply("Logchannel not enabled")

                await db.delete(`LOGCHANNEL_${message.guild.id}.enabled`)
                message.channel.send(`<#${enabled}> has been removed from logchannel`)

            } else {

                message.reply("Available commands are `enable` | `disable`")

            }
        } catch (e) {
            console.log(e)
        }
    }
}