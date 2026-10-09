import React, { useState } from 'react';
import { Skill } from '../types/index.js';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills', icon: 'bi-grid-fill' },
    { id: 'frontend', label: 'Frontend', icon: 'bi-window-sidebar' },
    { id: 'backend', label: 'Backend', icon: 'bi-hdd-stack-fill' },
    { id: 'database', label: 'Database', icon: 'bi-database-fill' },
    { id: 'devops', label: 'DevOps & Cloud', icon: 'bi-cloud-check-fill' },
    { id: 'tools', label: 'Tools', icon: 'bi-tools' },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="section-badge">Technical Arsenal</span>
          <h2 className="display-6 fw-bold mt-1">Skills & Proficiencies</h2>
          <div className="mx-auto bg-primary rounded-pill mt-2" style={{ width: 50, height: 4 }}></div>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            A continuous blend of core computer science fundamentals and modern framework mastery.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn btn-sm px-3 py-2 rounded-pill d-flex align-items-center gap-2 transition ${
                selectedCategory === cat.id
                  ? 'btn-primary shadow-sm'
                  : 'btn-outline-secondary'
              }`}
            >
              <i className={`bi ${cat.icon}`}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="row g-4">
          {filteredSkills.map((skill) => (
            <div key={skill._id} className="col-md-6 col-lg-4">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="p-2 rounded bg-primary-subtle text-primary">
                      <i className={`bi ${skill.icon || 'bi-code-slash'} fs-5`}></i>
                    </span>
                    <h5 className="h6 mb-0 fw-bold">{skill.name}</h5>
                  </div>
                  <span className="badge bg-secondary-subtle text-secondary rounded-pill">
                    {skill.proficiency}%
                  </span>
                </div>

                <div className="progress skill-bar mt-3 bg-secondary-subtle">
                  <div
                    className="progress-bar skill-bar-fill"
                    role="progressbar"
                    style={{ width: `${skill.proficiency}%` }}
                    aria-valuenow={skill.proficiency}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
