const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Sends the time from when bot is online',
    run: async (client, message, args) => {

        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✅ - I am Online From : ')
            .setDescription(`\`${days}\` days \`${hours}\`  hours \`${minutes}\` minutes \`${seconds}\` seconds`)
        try {
            message.reply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 10000)
                setTimeout(() => message.delete(), 10000)
            })
        } catch (e) {
            console.log(e)
        }

    }
}