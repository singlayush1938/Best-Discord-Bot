const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'invite',
    run: async (client, message, args) => {

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${config.bot.permissions}&scope=bot%20applications.commands`)
                    .setLabel(`Invite ${client.user.username}`)
                    .setStyle(ButtonStyle.Link),
            )
        try {
            message.channel.send({ content: `Add ${client.user.username} to your server`, components: [buttons] })
        } catch (e) {
            console.log(e) 
        }
    }
}