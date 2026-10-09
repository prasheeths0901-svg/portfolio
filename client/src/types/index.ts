export interface Profile {
  _id?: string;
  name: string;
  avatarUrl: string;
  title: string;
  location: string;
  availabilityStatus: string;
  email: string;
  phone: string;
  workType: string;

  // Hero Section
  greetingText: string;
  heroTitle: string;
  heroDescription: string;
  headline?: string;
  viewProjectsButtonText: string;
  resumeButtonText: string;

  // About Section
  aboutHeading: string;
  aboutSubheading: string;
  aboutDescription: string;
  about?: string;
  bio?: string;
  careerObjective: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  satisfiedClients: number;
  codeCommits: number;

  // Socials
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  otherSocialUrl: string;

  // Resume
  resumeUrl: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  featured?: boolean;
  order?: number;
}

export interface Project {
  _id?: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  order?: number;
}

export interface Education {
  _id?: string;
  collegeName: string;
  degree: string;
  department: string;
  year: string;
  cgpa: string;
  description: string;
  order?: number;
}

export interface Experience {
  _id?: string;
  companyName: string;
  role: string;
  duration: string;
  description: string;
  certificateUrl: string;
  order?: number;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
