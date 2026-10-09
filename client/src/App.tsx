import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { AdminPage } from './pages/AdminPage.js';
import { portfolioService } from './services/api.js';
import { Profile } from './types/index.js';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  const [profile, setProfile] = useState<Profile>({
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
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    portfolioService.getProfile().then((data) => {
      if (data) setProfile(data);
    });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar theme={theme} toggleTheme={toggleTheme} brandName={profile.name} />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage profile={profile} setProfile={setProfile} />} />
          <Route path="/admin" element={<AdminPage profile={profile} setProfile={setProfile} />} />
        </Routes>
      </div>
      <Footer profile={profile} />
    </div>
  );
};

export default App;
