import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import RagDemo from './pages/RagDemo'
import YoloDemo from './pages/YoloDemo'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/demo/rag" element={<RagDemo />} />
        <Route path="/demo/yolo" element={<YoloDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
