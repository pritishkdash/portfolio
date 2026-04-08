import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const skillData = [
  { subject: 'Machine Learning', A: 85, fullMark: 100 },
  { subject: 'Deep Learning', A: 88, fullMark: 100 },
  { subject: 'NLP / LLMs', A: 80, fullMark: 100 },
  { subject: 'Computer Vision', A: 90, fullMark: 100 },
  { subject: 'MLOps', A: 78, fullMark: 100 },
  { subject: 'Data Engineering', A: 75, fullMark: 100 },
]

const techLogos = [
  { name: 'Python', icon: '🐍' },
  { name: 'TensorFlow', icon: '🔲' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'YOLO', icon: '🎯' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Docker', icon: '🐳' },
  { name: 'LangChain', icon: '⛓️' },
  { name: 'OpenCV', icon: '👁️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'MLflow', icon: '📊' },
  { name: 'Git', icon: '📦' },
]

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '100px 24px', background: '#12121a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Skills & Expertise
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', color: 'white' }}>Technical Proficiency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillData}>
                <PolarGrid stroke="#2a2a3a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0b0', fontSize: 12 }} />
                <Radar name="Skills" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', color: 'white' }}>Tech Stack</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {techLogos.map((tech) => (
                <div key={tech.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 8px', background: '#12121a', borderRadius: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{tech.icon}</span>
                  <span style={{ fontSize: '0.75rem', color: '#a0a0b0', textAlign: 'center' }}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', color: 'white' }}>Core Competencies</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { label: 'Python Development', value: 92 },
              { label: 'Computer Vision', value: 90 },
              { label: 'LLM & RAG', value: 80 },
              { label: 'Model Deployment', value: 85 },
              { label: 'Data Pipeline Design', value: 78 },
              { label: 'Cloud Infrastructure', value: 72 },
            ].map((skill) => (
              <div key={skill.label} style={{ padding: '16px', background: '#12121a', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>{skill.label}</span>
                  <span>{skill.value}%</span>
                </div>
                <div style={{ height: '8px', background: '#2a2a3a', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: skill.value + '%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
