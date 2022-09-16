const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const config = require('../../config.json')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: 'greet',
    run: async (client, message, args) => {

        try {

            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageServer)) return message.reply('Required Permission is \`MANAGE SERVERS\`')
            if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ReadMessageHistory)) return;
            if (args[0] === 'enable') {

                const already = await db.get(`GREET_${message.guild.id}`)
                if (already) return message.reply('Greet already enabled')

                await db.set(`GREET_${message.guild.id}`, message.channel.id)
                message.channel.send(`Greet setted up`)

            } else if (args[0] === 'disable') {

                const already = await db.get(`GREET_${message.guild.id}`)
                if (!already) return message.reply('Greet not enabled')

                await db.delete(`GREET_${message.guild.id}`)
                message.channel.send(`Greet message cancelled`)

            } else {

                message.reply('Available commands are `enable` `disable`')

            }
        } catch (e) {
            console.log(e)
        }
    }
}