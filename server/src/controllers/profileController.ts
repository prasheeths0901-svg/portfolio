import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile.js';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Default fallback profile if not yet seeded
      profile = await Profile.create({
        name: 'Prasheeth',
        title: 'Full Stack Engineer & Software Developer',
        headline: 'Crafting scalable web applications, robust APIs, and delightful user experiences.',
        bio: 'Passionate student and software engineer with experience building modern web applications, distributed systems, and cloud-native solutions.',
        about: "Hello! I'm Prasheeth, a passionate software developer and student. I specialize in TypeScript, React, Node.js, Express, and modern web technologies. I enjoy solving complex problems, architecting clean applications, and crafting pixel-perfect, accessible user interfaces.",
        avatarUrl: '/prasheeth.jpg',
        email: 'prasheeth.dev@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        resumeUrl: '#',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        twitterUrl: 'https://twitter.com',
        yearsOfExperience: 4,
        projectsCompleted: 28,
        satisfiedClients: 19,
        codeCommits: 1840,
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json({ success: true, message: 'Profile updated successfully', profile });
  } catch (error) {
    next(error);
  }
};
