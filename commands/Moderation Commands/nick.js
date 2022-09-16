const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
  name: 'nickname',
  aliases: ['nick'],
  run: async (client, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return message.reply('you dont have manage nickname perms')
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return message.reply('I dont have required Manage server permissions')

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Please specify a nickname!");

    const logchannelid = await db.get(`LOGCHANNEL_${message.guild.id}.enabled`)

    const status = await member.setNickname(arguments).then(msg => {
      message.reply(`Updated nickname for \`${member.user.tag}\``)

      const logchannel = message.guild.channels.cache.get(logchannelid)
      if (logchannel) {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setAuthor({ name: 'NickUpdated', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`User ${member} \ntag ${member.user.tag}`)
          .setFooter({ text: `Nick updated by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        logchannel.send({ embeds: [embed] })
      }

    }).catch(e => {
      console.log(e)
      message.reply(`I can\'t change nickname for \`${member.user.tag}\` `)
    })

  },
};