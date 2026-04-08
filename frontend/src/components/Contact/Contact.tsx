import { useState } from 'react'
import { api } from '../../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch(api.contact, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed')
      }
    } catch {
      setStatus('error')
    }
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/pritishkdash', icon: '⌨️' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/pritish-kumar-dash', icon: '💼' },
    { name: 'Email', url: 'mailto:dashpritish97@gmail.com', icon: '📧' },
  ]

  const phoneNumber = '+91 7008859606'

  return (
    <section id="contact" style={{ padding: '100px 24px', background: '#12121a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Get In Touch
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'white' }}>Let's work together</h3>
            <p style={{ color: '#a0a0b0', lineHeight: 1.8, marginBottom: '32px' }}>
              I'm always interested in hearing about new opportunities, exciting AI projects, or just chatting about ML/AI. Feel free to reach out!
            </p>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #2a2a3a' }}>
                <span style={{ fontSize: '1.25rem' }}>📍</span>
                <span style={{ color: '#a0a0b0' }}>Bhubaneswar, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #2a2a3a' }}>
                <span style={{ fontSize: '1.25rem' }}>📧</span>
                <span style={{ color: '#a0a0b0' }}>dashpritish97@gmail.com</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#12121a', borderRadius: '8px', color: '#a0a0b0', textDecoration: 'none' }}>
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#12121a', borderRadius: '8px', color: '#a0a0b0' }}>
                <span>📱</span>
                <span>{phoneNumber}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: 'white' }}>Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required
                style={{ width: '100%', padding: '12px 16px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: 'white' }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your.email@example.com" required
                style={{ width: '100%', padding: '12px 16px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem', color: 'white' }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your message..." rows={5} required
                style={{ width: '100%', padding: '12px 16px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: '8px', color: 'white', fontSize: '1rem', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={status === 'loading'}
              style={{ width: '100%', padding: '12px 24px', background: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
