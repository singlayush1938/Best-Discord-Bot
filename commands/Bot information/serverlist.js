const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    name: "serverlist",
    aliases: ["slt"],
    description: "Displays the list of Servers!",
    run: async (client, message, args) => {
        if (message.author.id == config.members.owner) {

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji('⬅')
                        .setCustomId('decrease')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setEmoji('❌')
                        .setCustomId('cancel')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setEmoji('➡')
                        .setCustomId('increase')
                        .setStyle(ButtonStyle.Secondary),
                )



            let i0 = 0;
            let i1 = 10;
            let page = 1;

            let description =
                `Total Servers ${client.user.username} In - ${client.guilds.cache.size}\n\n` +
                client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                    .slice(0, 10)
                    .join("\n\n");

            const embed = new EmbedBuilder()
                .setTitle(client.user.tag)

                .setColor("00FFFF")
                .setFooter({ text: `Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}` })
                .setDescription(description);
            try {
                let msg = await message.reply({ embeds: [embed], components: [button] })
            } catch (e) {
                console.log(e)
            }
            const wait = require('node:timers/promises').setTimeout

            let collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 50000 })

            collector.on('collect', async i => {
                if (i.user.id === config.members.owner) {
                    console.log('LISTENING')
                    if (i.customId === 'cancel') {
                        await i.deferUpdate()
                        await i.message.delete()
                    }
                    if (i.customId === 'decrease') {
                        await i.deferUpdate()

                        i0 = i0 - 10;
                        i1 = i1 - 10;
                        page = page - 1;

                        // if there is no guild to display, delete the message
                        if (i0 + 1 < 0) {
                            console.log(i0)
                            return msg.delete();
                        }
                        if (!i0 || !i1) {
                            return msg.delete();
                        }

                        description =
                            `Total Servers - ${client.guilds.cache.size}\n\n` +
                            client.guilds.cache
                                .sort((a, b) => b.memberCount - a.memberCount)
                                .map(r => r)
                                .map(
                                    (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                                .slice(i0, i1)
                                .join("\n\n");

                        // Update the embed with new informations
                        embed
                            .setFooter({
                                text:
                                    `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                            })
                            .setDescription(description);

                        // Edit the message
                        msg.edit({ embeds: [embed] });
                    }
                    if (i.customId === 'increase') {
                        await i.deferUpdate()

                        i0 = i0 + 10;
                        i1 = i1 + 10;
                        page = page + 1;

                        // if there is no guild to display, delete the message
                        if (i1 > client.guilds.cache.size + 10) {
                            return msg.delete();
                        }
                        if (!i0 || !i1) {
                            return msg.delete();
                        }

                        description =
                            `Total Servers - ${client.guilds.cache.size}\n\n` +
                            client.guilds.cache
                                .sort((a, b) => b.memberCount - a.memberCount)
                                .map(r => r)
                                .map(
                                    (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
                                .slice(i0, i1)
                                .join("\n\n");

                        // Update the embed with new informations
                        embed
                            .setFooter({
                                text:
                                    `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
                            })
                            .setDescription(description);

                        // Edit the message
                        msg.edit({ embeds: [embed] });

                    }
                }
            })

        }
    }
}