import { Client, Message } from 'discord.js'
import { allowedChannels } from './config.json'
import dotenv from 'dotenv'
import { Logger } from 'tslog'
import { callAI } from "./openai";
dotenv.config()

const log = new Logger()
const client = new Client()


client.on('ready', () => {
    log.info('It\'s alive!')
})

client.on('message', handleMessage);

async function handleMessage(message: Message) {

    log.info('I hear something!')

    const { content, channel,author } = message
    if (author.bot) return
    if (!allowedChannels.includes(channel.id)) return

    log.info('My ears are tingling...')

    const responseText = await callAI(content)
    await channel.send(responseText)

}

export async function initDiscordClient() {
    await client.login(process.env.TOKEN)
}
