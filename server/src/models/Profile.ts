import mongoose, { Document, Schema } from 'mongoose';
import { IProfile } from '../types/index.js';

export interface IProfileDocument extends IProfile, Document {}

const profileSchema = new Schema<IProfileDocument>(
  {
    // 1. Personal Information
    name: { type: String, default: 'Prasheeth' },
    avatarUrl: { type: String, default: '/prasheeth.jpg' },
    title: { type: String, default: 'Full-Stack Software Engineer & Student' },
    location: { type: String, default: 'San Francisco, CA & Remote' },
    availabilityStatus: { type: String, default: 'Available for new opportunities & contracts' },
    email: { type: String, default: 'prasheeth.dev@example.com' },
    phone: { type: String, default: '+1 (555) 389-9402' },
    workType: { type: String, default: 'Full-Time / Contract' },

    // 2. Hero Section
    greetingText: { type: String, default: "Hi, I'm" },
    heroTitle: { type: String, default: 'Full-Stack Software Engineer & Student' },
    heroDescription: {
      type: String,
      default: 'Architecting scalable cloud architectures, reactive frontends & modern microservices.',
    },
    viewProjectsButtonText: { type: String, default: 'View Projects' },
    resumeButtonText: { type: String, default: 'Download Resume' },

    // 3. About Section
    aboutHeading: { type: String, default: 'About Me' },
    aboutSubheading: {
      type: String,
      default: 'Crafting dependable digital solutions from the database to the browser.',
    },
    aboutDescription: {
      type: String,
      default:
        "Hello! I'm Prasheeth, a passionate software craftsman and student. I thrive at the intersection of robust backend infrastructure and fluid frontend engineering. Over the past few years, I've designed enterprise SaaS platforms, optimized distributed databases for millions of queries, and built high-performance web applications.",
    },
    careerObjective: {
      type: String,
      default:
        'Seeking opportunities to engineer scalable distributed systems, solve high-impact algorithmic problems, and build intuitive developer tools.',
    },
    yearsOfExperience: { type: Number, default: 5 },
    projectsCompleted: { type: Number, default: 34 },
    satisfiedClients: { type: Number, default: 22 },
    codeCommits: { type: Number, default: 2840 },

    // 8. Social Media & Contact
    githubUrl: { type: String, default: 'https://github.com' },
    linkedinUrl: { type: String, default: 'https://linkedin.com' },
    instagramUrl: { type: String, default: 'https://instagram.com' },
    twitterUrl: { type: String, default: 'https://twitter.com' },
    otherSocialUrl: { type: String, default: '' },

    // 9. Resume
    resumeUrl: { type: String, default: '/uploads/resume.pdf' },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfileDocument>('Profile', profileSchema);
