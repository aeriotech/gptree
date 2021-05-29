import { Client, Message } from 'discord.js'
import { allowedChannels } from './config.json'
import dotenv from 'dotenv'
import { Logger } from 'tslog'
import { callAI } from './openai'
import fs from 'fs'

dotenv.config()

const log = new Logger()
const client = new Client()

client.on('ready', () => {
  log.info('It\'s alive!')
  client.user?.setActivity({
    type: "WATCHING",
    name: 'over humanity',
  })
})

client.on('message', handleMessage)

function getTime() {
  return new Date().toTimeString().slice(0, 8)
}

async function handleMessage(message: Message) {

  const { content, channel, author } = message
  if (author.bot) return
  if (!allowedChannels.includes(channel.id)) return

  const inMessage = `[${getTime()}] ${author.username} -> AI : ${content.trim()}`
  console.log(inMessage)
  fs.appendFileSync('logs/log.txt', inMessage + '\n')

  const responseText = await callAI(content)
  const outMessage = `[${getTime()}] AI -> ${author.username} : ${responseText.trim()}`
  console.log(outMessage)
  fs.appendFileSync('logs/log.txt', outMessage + '\n')

  await message.reply(responseText)

}

export async function initDiscordClient() {
  try {
    fs.mkdirSync('logs')
  } catch (e) {}
  await client.login(process.env.TOKEN)
}
