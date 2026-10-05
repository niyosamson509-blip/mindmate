import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messages = body.messages ?? []

    if (!messages.length) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      const lastUserMessage = [...messages].reverse().find((msg: any) => msg.role === 'user')?.content ?? 'Hello'

      return NextResponse.json({
        reply: `MindMate is ready to go. Your API key is not configured yet, so this is a demo response. User asked: "${lastUserMessage}". Add OPENAI_API_KEY to .env.local and restart the app to enable real AI responses.`
      })
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content
      })),
      temperature: 0.8,
      max_tokens: 500
    })

    const reply = completion.choices[0]?.message?.content ?? 'MindMate is thinking...'

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('MindMate chat error:', error)
    return NextResponse.json(
      {
        error: 'Something went wrong while generating the answer.',
        detail: error?.message ?? 'Unknown error'
      },
      { status: 500 }
    )
  }
}
