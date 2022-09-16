const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: 'boosts',
  description: 'list no of boosts of server',
  run: async (client, message, args) => {

    try {

      const embed = new EmbedBuilder()
        .setTitle('Boosts')
        .setTimestamp()
        .setColor('#00FF00')
        .setDescription(`**${message.guild.premiumSubscriptionCount}/14**`)

      message.reply({ embeds: [embed] }).then(msg => {
        setTimeout(() => msg.delete(), 10000)
        setTimeout(() => message.delete(), 10000)
      })

    } catch (e) {
      console.log(e)
    }
  }
}