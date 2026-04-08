import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RagDemo() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<{q: string, a: string}[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const userQuestion = input
    setInput('')
    setLoading(true)
    
    try {
      const res = await fetch('https://pritish-ai.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion }),
      })
      const data = await res.json()
      setChatHistory([...chatHistory, { q: userQuestion, a: data.answer || data.response || JSON.stringify(data) }])
    } catch {
      setChatHistory([...chatHistory, { q: userQuestion, a: 'Sorry, I could not get a response. Please try again.' }])
    }
    
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          ← Back to Portfolio
        </Link>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI Chatbot - About Pritish
        </h1>
        <p style={{ color: '#a0a0b0', marginBottom: '32px', lineHeight: 1.6 }}>
          Ask questions about Pritish Kumar Dash and get intelligent, context-aware answers powered by RAG.
        </p>

        {chatHistory.length > 0 && (
          <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '12px', padding: '24px', marginBottom: '24px', maxHeight: '400px', overflowY: 'auto' }}>
            {chatHistory.map((chat, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ width: '32px', height: '32px', background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, flexShrink: 0 }}>Q</span>
                  <p style={{ color: '#fff', margin: 0 }}>{chat.q}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '44px' }}>
                  <span style={{ width: '32px', height: '32px', background: '#22d3ee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0f', fontWeight: 600, flexShrink: 0 }}>AI</span>
                  <p style={{ color: '#a0a0b0', margin: 0 }}>{chat.a}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Pritish's experience, skills, projects..."
            style={{ flex: 1, padding: '16px', background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '12px', color: 'white', fontSize: '1rem' }}
          />
          <button type="submit" disabled={loading || !input.trim()}
            style={{ padding: '12px 32px', background: '#6366f1', color: 'white', borderRadius: '12px', fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? '...' : 'Ask'}
          </button>
        </form>

      </div>
    </main>
  )
}
