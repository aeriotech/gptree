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

  const { content, channel, author } = message;
  if (author.bot) return
  if (!allowedChannels.includes(channel.id)) return

  const promptPath = `userDB/${author.id}.txt`;

  if (fs.existsSync(promptPath)) {
    fs.appendFileSync(promptPath, `\nHuman: ${content.trim()}\nAI: `);
  } else {
    fs.appendFileSync(promptPath, `Human: ${content.trim()}\nAI: `);
  }

  const sendContentA = fs.readFileSync(promptPath);
  const sendContent = sendContentA.toString()
  console.log(sendContent);

  const inMessage = `[${getTime()}] ${author.username} -> AI : ${content.trim()}`
  console.log(inMessage)
  fs.appendFileSync('logs/log.txt', inMessage + '\n')

  const responseText = await callAI(sendContent);
  const outMessage = `[${getTime()}] AI -> ${author.username} : ${responseText.trim()}`
  console.log(outMessage)
  fs.appendFileSync(promptPath, responseText.trim())
  fs.appendFileSync('logs/log.txt', outMessage + '\n')

  await message.reply(responseText)

}

export async function initDiscordClient() {
  try {
    fs.mkdirSync('logs')
  } catch (e) {}
  await client.login(process.env.TOKEN)
}
