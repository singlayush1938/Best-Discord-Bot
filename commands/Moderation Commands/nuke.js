const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const config = require('../../config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
  name: 'nuke',
  run: async (client, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('Required permission is manage channels')
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('Required permission is manage channels')

    const logchannelid = await db.get(`LOGCHANNEL_${message.guild.id}.enabled`)

    const nchannel = message.channel.clone().then(ch => {
      message.channel.delete()

      ch.send(`Nuked by \`${message.author.tag}\``)

      console.log(logchannelid)

      const logchannel = message.guild.channels.cache.get(logchannelid)
      if (logchannel) {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setAuthor({ name: 'Channel Nuked', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`New Channel is \`${message.channel.name}\``)
          .setFooter({ text: `Nuked by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        logchannel.send({ embeds: [embed] })
      }

    }).catch(e => {
      console.log(e)
      message.reply('I dont have required permission to create and delete this channel')
    })

  }
}