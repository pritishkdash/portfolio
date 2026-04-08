import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Project } from '../types/Project'
import { api } from '../services/api'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(api.projects)
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch {
        console.log('Error fetching projects')
      }
    }
    fetchProjects()
  }, [])

  const categories = ['all', 'nlp', 'cv', 'mlops']
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  const getDemoUrl = (project: Project) => {
    if (project.category === 'nlp') return '/demo/rag'
    return null
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/" style={{ color: '#a0a0b0', textDecoration: 'none', marginBottom: '16px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          All Projects
        </h1>
        <p style={{ color: '#a0a0b0', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '40px' }}>
          A collection of machine learning, deep learning, and MLOps projects showcasing end-to-end development skills.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ padding: '10px 24px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500, color: filter === cat ? 'white' : '#a0a0b0', background: filter === cat ? '#6366f1' : '#1a1a24', border: '1px solid ' + (filter === cat ? '#6366f1' : '#2a2a3a'), cursor: 'pointer' }}>
              {cat === 'all' ? 'All Projects' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {filteredProjects.map((project) => {
            const demoUrl = getDemoUrl(project)
            return (
              <div key={project.id} style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '24px' }}>
                <span style={{ fontSize: '0.75rem', color: '#a0a0b0', marginBottom: '8px', display: 'block' }}>
                  {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px', color: 'white' }}>{project.title}</h3>
                <p style={{ color: '#a0a0b0', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {(project.techStack || []).map((tech) => (
                    <span key={tech} style={{ padding: '4px 10px', background: '#12121a', borderRadius: '4px', fontSize: '0.75rem', color: '#a0a0b0' }}>{tech}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #2a2a3a' }}>
                  {demoUrl && (
                    <Link to={demoUrl} style={{ padding: '8px 16px', background: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>Try Demo</Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
