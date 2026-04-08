export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  category: 'nlp' | 'cv' | 'mlops';
  demoType: 'image' | 'text' | 'none';
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  techStack: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
