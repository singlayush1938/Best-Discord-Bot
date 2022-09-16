const {EmbedBuilder} = require('discord.js')
module.exports = {
  name: 'membercount',
  aliases: ['mc'],
  description: 'list no of members of server',
  run: async(client, message, args) => {

    try {

     const embed = new EmbedBuilder()
    .setTitle('Members')
    .setTimestamp()
    .setColor('#00FF00')
    .setDescription(`**${message.guild.memberCount}**`)

     message.reply({ embeds: [embed]}).then(msg => {
      setTimeout(() => msg.delete(), 10000)
      setTimeout(() => message.delete(), 10000)
    })
      
} catch (e) {
  console.log(e)
}
  }
}