import OpenAI from 'openai-api'
import { Logger } from 'tslog'
import dotenv from "dotenv";
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

    /*

    import os
    import openai

    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.Completion.create(
      engine="davinci",
      prompt="The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
      temperature=0.9,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0.0,
      presence_penalty=0.6,
      stop=["\n", " Human:", " AI:"]
)

     */

    const response = await ai.complete({
        engine: 'davinci',
        prompt: 'Human: ' + prompt + '.\nAI: ',
        temperature: 0.9,
        maxTokens: 150,
        topP: 1,
        frequencyPenalty: 0.0,
        presencePenalty: 0.6,
        stop: ['\n'],
        stream: false
    })

    log.info(response.data)

    return response.data.choices[0].text

}