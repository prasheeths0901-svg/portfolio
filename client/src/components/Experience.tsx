import React, { useState } from 'react';
import { Experience as ExperienceType, Education as EducationType } from '../types/index.js';

interface ExperienceProps {
  experiences: ExperienceType[];
  educations: EducationType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences, educations }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');

  return (
    <section id="experience" className="py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="section-badge">Career Track</span>
          <h2 className="display-6 fw-bold mt-1">Experience & Education</h2>
          <div className="mx-auto bg-primary rounded-pill mt-2" style={{ width: 50, height: 4 }}></div>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            A chronicle of professional responsibilities, academic foundations, and high-impact teams.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="d-flex justify-content-center gap-2 mb-5">
          <button
            onClick={() => setActiveTab('all')}
            className={`btn btn-sm px-4 py-2 rounded-pill ${
              activeTab === 'all' ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`btn btn-sm px-4 py-2 rounded-pill ${
              activeTab === 'experience' ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
            }`}
          >
            <i className="bi bi-briefcase me-1"></i> Experience / Internships ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`btn btn-sm px-4 py-2 rounded-pill ${
              activeTab === 'education' ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
            }`}
          >
            <i className="bi bi-mortarboard me-1"></i> Education ({educations.length})
          </button>
        </div>

        {/* Timeline */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="timeline-container">
              {/* Experience items */}
              {(activeTab === 'all' || activeTab === 'experience') &&
                experiences.map((item, idx) => (
                  <div key={item._id || `exp-${idx}`} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="glass-card p-4">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <h4 className="h5 fw-bold mb-0 text-primary">{item.role}</h4>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                          {item.duration}
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-2 text-secondary mb-3 small">
                        <span className="fw-semibold fs-6 text-body">{item.companyName}</span>
                        <span>•</span>
                        <span className="badge bg-secondary-subtle text-secondary">Work / Internship</span>
                      </div>

                      <p className="text-muted leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {item.certificateUrl && (
                        <div className="pt-1">
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                          >
                            <i className="bi bi-patch-check-fill me-1"></i> View Certificate / Offer Letter
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* Education items */}
              {(activeTab === 'all' || activeTab === 'education') &&
                educations.map((edu, idx) => (
                  <div key={edu._id || `edu-${idx}`} className="timeline-item">
                    <div className="timeline-dot" style={{ background: '#06b6d4' }}></div>
                    <div className="glass-card p-4">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <h4 className="h5 fw-bold mb-0 text-info">{edu.degree}</h4>
                        <span className="badge bg-info-subtle text-info rounded-pill px-3 py-2">
                          {edu.year}
                        </span>
                      </div>

                      <div className="d-flex flex-wrap align-items-center gap-2 text-secondary mb-3 small">
                        <span className="fw-semibold fs-6 text-body">{edu.collegeName}</span>
                        {edu.department && (
                          <>
                            <span>•</span>
                            <span>{edu.department}</span>
                          </>
                        )}
                        {edu.cgpa && (
                          <>
                            <span>•</span>
                            <span className="badge bg-success-subtle text-success">
                              CGPA / Score: {edu.cgpa}
                            </span>
                          </>
                        )}
                      </div>

                      {edu.description && (
                        <p className="text-muted leading-relaxed mb-0">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
