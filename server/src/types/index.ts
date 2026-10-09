import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export interface IUser {
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfile {
  // 1. Personal Information
  name: string;
  avatarUrl: string;
  title: string;
  location: string;
  availabilityStatus: string;
  email: string;
  phone: string;
  workType: string;

  // 2. Hero Section
  greetingText: string;
  heroTitle: string;
  heroDescription: string;
  viewProjectsButtonText: string;
  resumeButtonText: string;

  // 3. About Section
  aboutHeading: string;
  aboutSubheading: string;
  aboutDescription: string;
  careerObjective: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  satisfiedClients: number;
  codeCommits: number;

  // 8. Social Media & Contact
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  otherSocialUrl: string;

  // 9. Resume
  resumeUrl: string;
}

export interface ISkill {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  featured?: boolean;
  order: number;
}

export interface IProject {
  title: string;
  summary: string;
  description: string;
  category: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  order: number;
}

export interface IEducation {
  collegeName: string;
  degree: string;
  department: string;
  year: string;
  cgpa: string;
  description: string;
  order: number;
}

export interface IExperience {
  companyName: string;
  role: string;
  duration: string;
  description: string;
  certificateUrl: string;
  order: number;
}

export interface IMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
