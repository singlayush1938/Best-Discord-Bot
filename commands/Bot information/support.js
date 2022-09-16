const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'support',
    run: async (client, message, args) => {

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(`${config.bot.support}`)
                    .setLabel(`Get Support`)
                    .setStyle(ButtonStyle.Link),
            )
        try {
            message.channel.send({ content: `Join bot\'s support server`, components: [buttons] })
        } catch (e) {
            console.log(e)
        }

    }
}