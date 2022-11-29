import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    CommandInteraction,
    EmbedType,
    PermissionsBitField,
    TextChannel,
} from 'discord.js'

import { Command } from '../Command'
import wait from '../helpers/Wait'

export const Clear: Command = {
    name: 'clear',
    description: 'Clear a channel',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: new PermissionsBitField('ManageMessages').bitfield,
    options: [{
        name: 'channel',
        description: 'Channel to clear',
        required: true,
        type: ApplicationCommandOptionType.Channel,
    }],

    run: async (client: Client, interaction: CommandInteraction) => {
        const feedback = await interaction.followUp({
            ephemeral: true,
            content: `Deleting messages in ${ interaction.options.get('channel', true).channel?.name }`,
        })

        const channel = interaction.options.get('channel', true).channel as TextChannel
        await channel.messages.fetch().then(async messages => {
            messages = messages.filter(m => m.id !== feedback.id)

            messages.forEach(async (msg) => {
                if (msg.id !== feedback.id) await msg.delete()
            })

            await feedback.edit(`${ messages.size } messages supprimés`)
        })

        await wait(5000)
        await interaction.deleteReply()
    },
}
