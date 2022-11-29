import { ApplicationCommandType, Client, CommandInteraction, EmbedType } from 'discord.js'
import { Command } from '../Command'
import wait from '../helpers/Wait'

export const Hello: Command = {
    name: 'hello',
    description: 'Returns a greeting',
    type: ApplicationCommandType.ChatInput,

    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            ephemeral: true,
            content: `Hello ${ interaction.member?.user.username }, ping is ${ client.ws.ping }ms`,
        })
        await wait(5000)
        await interaction.deleteReply()
    },
}
