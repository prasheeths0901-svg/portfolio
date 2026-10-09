import axios from 'axios';
import { Profile, Skill, Project, Education, Experience, Message, User } from '../types/index.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback initial data in case of initial fetch
const defaultProfile: Profile = {
  name: 'Prasheeth',
  avatarUrl: '/prasheeth.jpg',
  title: 'Full-Stack Software Engineer & Student',
  location: 'San Francisco, CA & Remote',
  availabilityStatus: 'Available for new opportunities & contracts',
  email: 'prasheeth.dev@example.com',
  phone: '+1 (555) 389-9402',
  workType: 'Full-Time / Contract',

  greetingText: "Hi, I'm",
  heroTitle: 'Full-Stack Software Engineer & Student',
  heroDescription: 'Architecting scalable cloud architectures, reactive frontends & modern microservices.',
  viewProjectsButtonText: 'View Projects',
  resumeButtonText: 'Download Resume',

  aboutHeading: 'About Me',
  aboutSubheading: 'Crafting dependable digital solutions from the database to the browser.',
  aboutDescription:
    "Hello! I'm Prasheeth, a passionate software developer and student. I thrive at the intersection of robust backend infrastructure and fluid frontend engineering. Over the past few years, I've designed scalable platforms, optimized databases, and built high-performance web applications.",
  careerObjective:
    'Seeking opportunities to engineer scalable distributed systems, solve high-impact algorithmic problems, and build intuitive developer tools.',
  yearsOfExperience: 5,
  projectsCompleted: 34,
  satisfiedClients: 22,
  codeCommits: 2840,

  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: 'https://twitter.com',
  otherSocialUrl: '',

  resumeUrl: '/uploads/resume.pdf',
};

export const portfolioService = {
  // Profile
  getProfile: async (): Promise<Profile> => {
    try {
      const res = await api.get('/profile');
      return res.data.profile || defaultProfile;
    } catch {
      return defaultProfile;
    }
  },
  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const res = await api.put('/profile', data);
    return res.data.profile;
  },

  // Skills
  getSkills: async (category?: string): Promise<Skill[]> => {
    try {
      const url = category && category !== 'all' ? `/skills?category=${category}` : '/skills';
      const res = await api.get(url);
      return res.data.skills || [];
    } catch {
      return [];
    }
  },
  createSkill: async (data: Partial<Skill>): Promise<Skill> => {
    const res = await api.post('/skills', data);
    return res.data.skill;
  },
  updateSkill: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    const res = await api.put(`/skills/${id}`, data);
    return res.data.skill;
  },
  deleteSkill: async (id: string): Promise<void> => {
    await api.delete(`/skills/${id}`);
  },

  // Projects
  getProjects: async (category?: string): Promise<Project[]> => {
    try {
      const url = category && category !== 'All' ? `/projects?category=${encodeURIComponent(category)}` : '/projects';
      const res = await api.get(url);
      return res.data.projects || [];
    } catch {
      return [];
    }
  },
  createProject: async (data: Partial<Project>): Promise<Project> => {
    const res = await api.post('/projects', data);
    return res.data.project;
  },
  updateProject: async (id: string, data: Partial<Project>): Promise<Project> => {
    const res = await api.put(`/projects/${id}`, data);
    return res.data.project;
  },
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Experiences
  getExperiences: async (): Promise<Experience[]> => {
    try {
      const res = await api.get('/experiences');
      return res.data.experiences || [];
    } catch {
      return [];
    }
  },
  createExperience: async (data: Partial<Experience>): Promise<Experience> => {
    const res = await api.post('/experiences', data);
    return res.data.experience;
  },
  updateExperience: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    const res = await api.put(`/experiences/${id}`, data);
    return res.data.experience;
  },
  deleteExperience: async (id: string): Promise<void> => {
    await api.delete(`/experiences/${id}`);
  },

  // Educations
  getEducations: async (): Promise<Education[]> => {
    try {
      const res = await api.get('/educations');
      return res.data.educations || [];
    } catch {
      return [];
    }
  },
  createEducation: async (data: Partial<Education>): Promise<Education> => {
    const res = await api.post('/educations', data);
    return res.data.education;
  },
  updateEducation: async (id: string, data: Partial<Education>): Promise<Education> => {
    const res = await api.put(`/educations/${id}`, data);
    return res.data.education;
  },
  deleteEducation: async (id: string): Promise<void> => {
    await api.delete(`/educations/${id}`);
  },

  // File Upload
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.url;
  },

  // Messages
  sendMessage: async (data: { name: string; email: string; subject?: string; message: string }): Promise<string> => {
    const res = await api.post('/messages', data);
    return res.data.message || 'Message sent successfully!';
  },
  getMessages: async (): Promise<Message[]> => {
    const res = await api.get('/messages');
    return res.data.messages || [];
  },
  markMessageRead: async (id: string): Promise<void> => {
    await api.patch(`/messages/${id}/read`);
  },
  deleteMessage: async (id: string): Promise<void> => {
    await api.delete(`/messages/${id}`);
  },

  // Auth
  login: async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  },
  getMe: async (): Promise<User | null> => {
    try {
      const res = await api.get('/auth/me');
      return res.data.user;
    } catch {
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};
