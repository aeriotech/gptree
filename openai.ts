import OpenAI from 'openai-api'
import { Logger } from 'tslog'
import dotenv from 'dotenv'

dotenv.config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''

let ai: OpenAI
const log = new Logger()

export function initAI() {
  if (!OPENAI_API_KEY) {
    log.error('No open ai token found')
  }
  ai = new OpenAI(OPENAI_API_KEY)
}

export async function callAI(prompt: string) {
  console.log(prompt)

  const response = await ai.complete({
    engine: 'curie',
    prompt: prompt,
    temperature: 0.9,
    maxTokens: 40,
    topP: 1,
    frequencyPenalty: 0.0,
    presencePenalty: 0.6,
    stop: ['\n', 'AI:', 'Human:'],
    stream: false,
  })

  return response.data.choices[0].text
}
