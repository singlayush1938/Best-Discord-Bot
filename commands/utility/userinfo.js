const {EmbedBuilder} = require('discord.js')
const config = require('../../config.json')
const moment = require('moment')

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  descripton: 'gives information of upi',
  run: async(client, message, args) => {

    try {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)

    var nickname = member.nickname
    if(!nickname) {
      var nickname = 'None'
    }

    if(member.user.bot) {
      var bot = '✅ Yes'
    } else {
      var bot = '❌ No'
    }

    const roles = member.roles.cache.map(role => `<@&${role.id}>`).join(', ')

    const embed = new EmbedBuilder()
    .setColor('#00FF00')
    .setAuthor({ name: `${member.user.tag}\'s information`, iconURL: member.user.displayAvatarURL({dynamic: true})})
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setDescription(`**__GENERAL INFORMATION__**\n**Name:** ${member.user.tag}\n**ID:** ${member.id}\n**Nick:** ${nickname}\n**Bot?:** ${bot}\n**Account Created:** \`${moment(member.user.createdAt).format('MMM DD YYYY')}\`\n**Server joined:** \`${moment(member.joinedAt).format('MMM DD YYYY')}\`\n\u200b\n**__MEMBER ROLES__**\n**Highest Role :** ${member.roles.highest}\n**Roles :** ${roles}`)

    message.channel.send({ embeds: [embed]})

  } catch (e) {
    console.log(e)
  }
  }
}