const {EmbedBuilder} = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: 'serverinfo',
  aliases: ['si'],
  description: 'list information of server',
  run: async(client, message, args) => {

    try {
    const Roles = message.guild.roles.cache.map(role => `<@&${role.id}>`).join(', ')
      
    const embed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle(`${message.guild.name}\'s information`)
    .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)
    .setTimestamp()
    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
    .setDescription(`**__About__**\n**NAME:** ${message.guild.name}\n**ID:** ${message.guild.id}\n**Owner ${config.emoji.serverinfo.owner}:** ${message.guild.members.cache.get(message.guild.ownerId)}\n**Members:** ${message.guild.memberCount}\n**Boosts:** ${message.guild.premiumSubscriptionCount}/14\n\u200b\n**__SERVER ROLES__**\n${Roles}`)
    

    if (message.guild.banner) {
        embed.setImage(message.guild.bannerURL({dynamic: true}) + '?size=1024')
      }

    message.reply({ embeds: [embed]}).then(msg => {
      setTimeout(() => msg.delete(), 100000)
      setTimeout(() => message.delete(), 100000)
    })
      
    } catch (e) {
      console.log(e)
    }
  }
}
