const { EmbedBuilder } = require('discord.js')
const math = require('mathjs')
const config = require('../../config.json')

module.exports = {
    name: 'math',
    aliases: ['calculate', 'calc', 'solve'],
    usage: '<question>',
    description: 'Solves Math Questions',
    run: async (client, message, args) => {

        if (!args[0]) return message.channel.send('Please specify a equation')

        try {
            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setAuthor({ name: `Your Math Equation`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .addFields(
                    {
                        name: 'Question', value: `${args.join(" ")}`
                    },
                    {
                        name: 'Solution', value: `${math.evaluate(args.join(" "))}`
                    }
                )
                .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            message.channel.send({ embeds: [embed] })
        } catch (err) {
            console.log(err)
            message.channel.send('Not a valid question!!')
        }
    }
}