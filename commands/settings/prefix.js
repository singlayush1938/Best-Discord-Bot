const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const config = require('../../config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: 'prefix',
    run: async (client, message, args) => {

        try {

            const logchannelid = await db.get(`LOGCHANNEL_${message.guild.id}.enabled`)

            var prefix = await db.get(`PREFIX.${message.guild.id}`)
            if (!prefix) {
                var prefix = config.bot.prefix
            }

            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageServer)) return message.reply('Required Permission is `MANAGE_SERVER`')
            if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ReadMessageHistory)) return;

            if (args[0] === 'set') {

                const prefixto = args[1]
                if (!prefixto) return message.reply('Please specify a prefix to be set')

                await db.set(`PREFIX.${message.guild.id}`, `${prefixto}`)
                const embed = new EmbedBuilder()
                    .setDescription(`Prefix for this server has been changed to \`${prefixto}\``)
                message.channel.send({ embeds: [embed] }).then(msg => {
                    const logchannel = message.guild.channels.cache.get(logchannelid)
                    if (logchannel) {
                        const embed = new EmbedBuilder()
                            .setColor('#00FF00')
                            .setAuthor({ name: 'Prefix updated', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                            .setDescription(`Earlier Prefix is ${prefix}\nNew Prefix is ${prefixto}`)
                            .setFooter({ text: `Prefix updates by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        logchannel.send({ embeds: [embed] })
                    }
                })

            } else {
                message.reply(`> Usage : \`${prefix}prefix set <prefix>\``)
            }

        } catch (e) {
            console.log(e)
        }

    }
}