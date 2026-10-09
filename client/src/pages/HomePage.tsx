import React, { useEffect, useState } from 'react';
import { portfolioService } from '../services/api.js';
import {
  Profile,
  Skill,
  Project,
  Experience as ExperienceType,
  Education as EducationType,
} from '../types/index.js';
import { Hero } from '../components/Hero.js';
import { About } from '../components/About.js';
import { Skills } from '../components/Skills.js';
import { Projects } from '../components/Projects.js';
import { Experience } from '../components/Experience.js';
import { Contact } from '../components/Contact.js';

interface HomePageProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const HomePage: React.FC<HomePageProps> = ({ profile, setProfile }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [educations, setEducations] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, skillsData, projData, expData, eduData] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getSkills(),
          portfolioService.getProjects(),
          portfolioService.getExperiences(),
          portfolioService.getEducations(),
        ]);
        if (profData) setProfile(profData);
        setSkills(skillsData || []);
        setProjects(projData || []);
        setExperiences(expData || []);
        setEducations(eduData || []);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setProfile]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-secondary fw-semibold">Loading developer portfolio...</p>
      </div>
    );
  }

  return (
    <main>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} educations={educations} />
      <Contact profile={profile} />
    </main>
  );
};
