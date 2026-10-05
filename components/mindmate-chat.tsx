import { useState } from 'react'
import { Sparkles, SendHorizonal, Bot, UserRound } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const starterMessages: Message[] = [
  {
    role: 'assistant',
    content:
      'Hello! I am MindMate, your AI companion. Ask me to brainstorm ideas, write content, help with coding, or plan your day.'
  }
]

const quickPrompts = [
  'Summarize this business idea',
  'Help me write a product launch plan',
  'Give me 5 coding project ideas',
  'Create a study routine for me'
]

export default function MindMateChat() {
  const [messages, setMessages] = useState<Message[]>(starterMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(prompt?: string) {
    const question = (prompt ?? input).trim()
    if (!question || isLoading) return

    const nextMessages = [
      ...messages,
      { role: 'user', content: question }
    ] as Message[]

    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: nextMessages })
      })

      if (!response.ok) {
        throw new Error('MindMate could not respond.')
      }

      const data = await response.json()
      const reply = data.reply ?? 'I am here and ready to help.'

      setMessages([...nextMessages, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: 'Sorry, I hit a snag. Please try again in a moment.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="chat-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-badge">
              <Sparkles size={18} />
            </div>
            <div>
              <h1>MindMate</h1>
            </div>
          </div>

          <div className="nav-card">
            <p>AI assistant</p>
            <strong>Focused on ideas, writing, and productivity</strong>
          </div>

          <div className="quick-actions">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                className="quick-chip"
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </aside>

        <main className="main-panel">
          <header className="chat-header">
            <h2>MindMate Chat</h2>
            <div className="status-pill">
              <span className="status-dot" />
              Online
            </div>
          </header>

          <section className="messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`message ${message.role}`}
              >
                {message.content}
              </div>
            ))}

            {isLoading && (
              <div className="message assistant">MindMate is thinking...</div>
            )}
          </section>

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage()
            }}
          >
            <div className="input-wrap">
              <Bot size={18} color="#7dd3fc" />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask MindMate anything..."
                aria-label="Message MindMate"
              />
            </div>
            <button type="submit" className="send-button" disabled={isLoading || !input.trim()}>
              <SendHorizonal size={18} />
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}
