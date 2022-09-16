const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const config = require('../../config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: 'autorole',
    aliases: ['joinrole'],
    run: async (client, message, args) => {

        try {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageServer)) return message.reply("Required Permission is `MANAGE SERVER`")
            if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ReadMessageHistory)) return;

            if (args[0] === 'enable') {

                const enabled = await db.get(`JOINROLE_${message.guild.id}`)
                if (enabled) return message.reply(`Join Role is already enabled with <@&${enabled}> role`)

                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                if (!role) return message.reply("Please Specify a valid role")

                await db.set(`JOINROLE_${message.guild.id}`, role.id)
                message.reply('AutoRole is now Enabled for this server')

            } else if (args[0] === 'disable') {

                const enabled = await db.get(`JOINROLE_${message.guild.id}`)
                if (!enabled) return message.reply(`Join Role is not enabled for this guild`)

                await db.delete(`JOINROLE_${message.guild.id}`)
                message.reply('AutoRole is now disabled for this server')

            } else {

                message.reply('Available commands are `enable` `disable`')

            }
        } catch (e) {
            console.log(e)
        }
    }
}