import Hero from '../components/Hero/Hero'
import Projects from '../components/Projects/Projects'
import Skills from '../components/Skills/Skills'
import Timeline from '../components/Timeline/Timeline'
import Contact from '../components/Contact/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid #2a2a3a', color: '#a0a0b0', fontSize: '0.875rem' }}>
        <p>© {new Date().getFullYear()} Pritish Kumar Dash. Built with React + FastAPI.</p>
      </footer>
    </main>
  )
}
