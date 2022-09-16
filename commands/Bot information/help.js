const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ComponentType } = require('discord.js')
const config = require('../../config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: 'help',
    run: async (client, message, args) => {

        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return message.reply("I cant\'t embed links here")

        var prefix = await db.get(`PREFIX.${message.guild.id}`)
        if (!prefix) {
            var prefix = config.bot.prefix
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('help')
                    .setPlaceholder('Select the command category')
                    .addOptions(
                        {
                            label: 'Moderation Commands',
                            description: 'list the commands associated with servers\'s moderation',
                            value: 'third_option',
                        },
                        {
                            label: 'Bot information',
                            description: 'list the commands associated with bot\'s information',
                            value: 'first_option',
                        },
                        {
                            label: 'Utility',
                            description: 'list the commands associated with bot\'s utility',
                            value: 'second_option',
                        },
                        {
                            label: 'Settings',
                            description: 'list the commands associated with bot\'s set-up',
                            value: 'fourth_option',
                        },

                    ),
            );


        const buttons = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${config.bot.permissions_value}&scope=bot%20applications.commands`)
                    .setLabel(`Invite me`)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(`${config.bot.support}`)
                    .setLabel(`Join Support`)
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(`https://top.gg/bot/${client.user.id}/vote`)
                    .setLabel(`Vote me`)
                    .setStyle(ButtonStyle.Link),

            )

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setAuthor({ name: `${client.user.username}\'s help page`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `Made with love by ${client.users.cache.get(config.members.owner).tag}`, iconURL: `${client.users.cache.get(config.members.owner).displayAvatarURL({ dynamic: true })}` })
            .setDescription(`**•** Prefix for the server is \`${prefix}\`\n**•** Bot Owned by ${client.users.cache.get(config.members.owner)}\n\u200b`)
            .addFields(
                {
                    name: '**__Main__**', value: `${config.emoji.help.moderation} Moderation\n${config.emoji.help.settings} Settings`, inline: true
                },
                { name: '**__Extras__**', value: `${config.emoji.help.botinfo} Botinfo\n${config.emoji.help.utility} Utility`, inline: true }
            )

        let msg = await message.channel.send({ embeds: [embed], components: [row, buttons] })


        let collector = msg.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 60000 })
        collector.on('collect', async i => {

            if (i.user.id !== message.author.id) return i.reply({ content: 'This is not accessible by you..', ephemeral: true })

            if (i.values[0] === 'third_option') {
                const moderationembed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setAuthor({ name: 'Moderation commands', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .addFields(
                        {
                            name: 'nickname', value: 'changes the nickname of the user'
                        },
                        {
                            name: 'purge', value: 'clears specific amount of messages'
                        },
                        {
                            name: 'nuke', value: 'Clear all messages of the channel'
                        }
                    )
                msg.edit({ embeds: [moderationembed], ephemeral: true })
                await i.deferUpdate()

            } else if (i.values[0] === 'first_option') {
                const botinfoembed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setAuthor({ name: 'Bot\'s information commands', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .addFields(
                        {
                            name: 'help', value: 'Lists all commands of bot'
                        },
                        {
                            name: 'invite', value: 'Gives you the bot invite link'
                        },
                        {
                            name: 'support', value: 'Gives you the bot\'s support server link'
                        },
                        {
                            name: 'vote', value: 'Gives you the bot\'s topgg vote link'
                        },
                        {
                            name: 'uptime', value: 'Gives you the bots online from time'
                        }
                    )
                if (i.user.id === config.members.owner) {
                    botinfoembed.addFields({ name: 'serverlist', value: 'lists all the servers in which bot is present' })
                }
                msg.edit({ embeds: [botinfoembed], ephemeral: true })
                await i.deferUpdate()

            } else if (i.values[0] === 'second_option') {
                const utilityembed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setAuthor({ name: 'Bot\'s Utility commands', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .addFields(
                        {
                            name: 'serverinfo', value: 'Lists information of server'
                        },
                        {
                            name: 'userinfo', value: 'Lists information of user'
                        },
                        {
                            name: 'membercount', value: 'Gives the number of members in server'
                        },
                        {
                            name: 'boosts', value: 'Tells the amount of boosts of a server'
                        },
                        {
                            name: 'math', value: 'Solves Math Equations'
                        }
                    )
                msg.edit({ embeds: [utilityembed], ephemeral: true })
                await i.deferUpdate()

            } else if (i.values[0] === 'fourth_option') {
                const settingsembed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setAuthor({ name: 'Setting commands', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .addFields(
                        {
                            name: 'prefix', value: 'changes the bots prefix for the server'
                        },
                        {
                            name: 'logchannel', value: 'Enables/disables log channel for the bot commands'
                        },
                        {
                            name: 'greet', value: 'Enables/disables the message channel as greet channel'
                        },
                        {
                            name: 'joinrole', value: 'Enables/disables the auto join role command'
                        }
                    )
                msg.edit({ embeds: [settingsembed], ephemeral: true })
                await i.deferUpdate()
            }

        })

       setTimeout(() => {
        const rowt = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('help')
                    .setPlaceholder('Select the command category')
                    .setDisabled()
                    .addOptions(
                        {
                            label: 'Moderation Commands',
                            description: 'list the commands associated with servers\'s moderation',
                            value: 'third_option',
                        },
                        {
                            label: 'Bot information',
                            description: 'list the commands associated with bot\'s information',
                            value: 'first_option',
                        },
                        {
                            label: 'Utility',
                            description: 'list the commands associated with bot\'s utility',
                            value: 'second_option',
                        },
                        {
                            label: 'Settings',
                            description: 'list the commands associated with bot\'s set-up',
                            value: 'fourth_option',
                        },

                    ),
            );
            msg.edit({embeds: [embed], components: [rowt, buttons]})
        }, 50000) 
    }
}