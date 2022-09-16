const { EmbedBuilder } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'botinfo',
    run: async (client, message, args) => {

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setAuthor({ name: 'Bot\'s information', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**Owner:** ${client.users.cache.get(config.members.owner).tag}\n**Developer:** ${client.users.cache.get(config.members.dev).tag}\n**Guilds:** ${client.guilds.cache.size}\n**Users:** ${client.users.cache.size}`)
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
        try {
            message.channel.send({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}