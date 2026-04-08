import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

export default function YoloDemo() {
  const [image, setImage] = useState<string | null>(null)
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const runDetection = () => {
    setLoading(true)
    setTimeout(() => {
      setResults([
        { class: 'person', confidence: 0.95, bbox: [100, 100, 200, 300] },
        { class: 'car', confidence: 0.87, bbox: [400, 150, 600, 400] },
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          ← Back to Portfolio
        </Link>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Object Detection Demo
        </h1>
        <p style={{ color: '#a0a0b0', marginBottom: '32px', lineHeight: 1.6 }}>
          Upload an image to detect objects using YOLOv8 model.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{ border: '2px dashed #2a2a3a', borderRadius: '12px', padding: '48px', textAlign: 'center', background: '#1a1a24', cursor: 'pointer' }}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              {image ? (
                <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
              ) : (
                <>
                  <p style={{ color: '#a0a0b0', marginBottom: '16px' }}>Drag & drop an image here</p>
                  <p style={{ color: '#6366f1', fontSize: '0.875rem' }}>or click to select</p>
                </>
              )}
            </div>
            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            
            {image && (
              <button onClick={runDetection} disabled={loading}
                style={{ width: '100%', marginTop: '16px', padding: '12px', background: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Detecting...' : 'Run Detection'}
              </button>
            )}
          </div>

          <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px', color: 'white' }}>Detection Results</h3>
            {results ? (
              <div>
                {results.map((r: any, i: number) => (
                  <div key={i} style={{ padding: '12px', background: '#12121a', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>{r.class}</span>
                      <span style={{ color: '#22d3ee' }}>{(r.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#a0a0b0' }}>Upload an image and run detection to see results.</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: '32px', padding: '24px', background: '#1a1a24', border: '1px solid #fbbf24', borderRadius: '12px' }}>
          <p style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '8px' }}>Demo Mode</p>
          <p style={{ color: '#a0a0b0', fontSize: '0.9rem' }}>
            This is a placeholder. Connect your actual YOLO API endpoint for real object detection.
          </p>
        </div>
      </div>
    </main>
  )
}
