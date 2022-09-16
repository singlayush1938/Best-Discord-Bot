const { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'vote',
    run: async (client, message, args) => {

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(`https://top.gg/bot/${client.user.id}/vote`)
                    .setLabel(`Vote us`)
                    .setStyle(ButtonStyle.Link),
            )
        try {
            message.channel.send({ content: `Vote for the bot`, components: [buttons] })
        } catch (e) {
            console.log(e)
        }
    }
}