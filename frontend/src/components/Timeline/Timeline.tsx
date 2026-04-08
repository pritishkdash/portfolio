export default function Timeline() {
  const experiences = [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Soul Limited',
      location: 'India',
      startDate: 'Aug 2023',
      endDate: 'Present',
      description: 'Built production AI systems including YOLOv8 object detection, facial recognition for ERP payroll, and video analytics pipelines. Implemented CI/CD for automated ML workflows.',
      techStack: ['YOLOv8', 'TensorFlow', 'OpenCV', 'FastAPI', 'Docker'],
    },
    {
      id: '2',
      title: 'Junior Research Fellow',
      company: 'Xavier University',
      location: 'Bhubaneswar, India',
      startDate: 'May 2023',
      endDate: 'Aug 2023',
      description: 'Conducted image segmentation on mitochondrial data using Unet, Unet++, SE-Unet variants.',
      techStack: ['Unet', 'Deep Learning', 'Medical Imaging'],
    },
  ]

  return (
    <section id="experience" style={{ padding: '100px 24px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Experience
        </h2>

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '40px 0' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#2a2a3a', transform: 'translateX(-50%)' }} />

          {experiences.map((exp, index) => (
            <div key={exp.id} style={{ position: 'relative', width: '50%', padding: '0 40px 40px', textAlign: index % 2 === 0 ? 'right' : 'left', marginLeft: index % 2 === 0 ? '0' : '50%' }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', background: '#6366f1', borderRadius: '50%', top: '8px', border: '4px solid #0a0a0f', left: index % 2 === 0 ? '-8px' : 'auto', right: index % 2 === 0 ? 'auto' : '-8px' }} />
              <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 500 }}>{exp.startDate} — {exp.endDate}</span>
                  <span style={{ fontSize: '0.75rem', color: '#a0a0b0' }}>{exp.location}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '4px', color: 'white' }}>{exp.title}</h3>
                <p style={{ color: '#a0a0b0', marginBottom: '12px' }}>{exp.company}</p>
                <p style={{ color: '#a0a0b0', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>{exp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.techStack.map((tech) => (
                    <span key={tech} style={{ padding: '4px 10px', background: '#12121a', borderRadius: '4px', fontSize: '0.75rem', color: '#a0a0b0' }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
