const API_URL = import.meta.env.VITE_API_URL || ''

export const api = {
  projects: `${API_URL}/api/projects`,
  contact: `${API_URL}/api/contact`,
}
