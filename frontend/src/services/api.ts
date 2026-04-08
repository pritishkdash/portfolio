const API_URL = import.meta.env.VITE_API_URL || ''

export const api = {
  projects: `${API_URL}/api/projects`,
  contact: `${API_URL}/api/contact`,
}

export const RAG_API = 'https://pritish-ai.onrender.com/chat'
