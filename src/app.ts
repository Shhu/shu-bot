import * as dotenv from 'dotenv'
import { Client } from 'discord.js'
import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'

dotenv.config()

console.log('Bot is starting...')

const client = new Client({
    intents: [],
})

ready(client)
interactionCreate(client)

client.login(process.env.BOT_TOKEN).then()

