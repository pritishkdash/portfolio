import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch(api.projects)
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  const categories = ['all', 'nlp', 'cv', 'mlops']
  const filtered = filter === 'all' ? projects : projects.filter((p: any) => p.category === filter)

  const getDemoUrl = (project: any) => {
    if (project.category === 'nlp') return '/demo/rag'
    return null
  }

  return (
    <section id="projects" style={{ padding: '100px 24px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Featured Projects
        </h2>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500, color: filter === cat ? 'white' : '#a0a0b0', background: filter === cat ? '#6366f1' : '#1a1a24', border: '1px solid ' + (filter === cat ? '#6366f1' : '#2a2a3a'), cursor: 'pointer' }}>
              {cat === 'all' ? 'All' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
          {filtered.map((project: any) => {
            const demoUrl = getDemoUrl(project)
            return (
              <div key={project.id} style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>{project.title}</h3>
                <p style={{ color: '#a0a0b0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {(project.techStack || []).map((tech: string) => (
                    <span key={tech} style={{ padding: '6px 12px', background: '#12121a', borderRadius: '6px', fontSize: '0.8rem', color: '#a0a0b0', border: '1px solid #2a2a3a' }}>{tech}</span>
                  ))}
                </div>
                {demoUrl && (
                  <a href={demoUrl} style={{ padding: '10px 20px', background: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block' }}>Try Demo</a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
