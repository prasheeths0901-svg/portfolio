import React from 'react';
import { Profile } from '../types/index.js';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section id="about" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="section-badge">Get To Know Me</span>
          <h2 className="display-6 fw-bold mt-1">{profile.aboutHeading || 'About Me'}</h2>
          <div className="mx-auto bg-primary rounded-pill mt-2" style={{ width: 50, height: 4 }}></div>
        </div>

        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-6">
            <div className="pe-lg-4">
              <h3 className="h4 fw-bold mb-3">
                {profile.aboutSubheading ||
                  'Crafting dependable digital solutions from the database to the browser.'}
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                {profile.aboutDescription ||
                  "I'm an engineer passionate about building high-performance applications that delight users and scale seamlessly. With expertise across the full stack, I translate complex business requirements into elegant, maintainable code."}
              </p>

              {profile.careerObjective && (
                <div className="p-3 mb-4 rounded-3 border-start border-primary border-4 bg-body-tertiary">
                  <small className="fw-bold text-primary d-block text-uppercase mb-1">Career Objective</small>
                  <p className="small text-muted mb-0">{profile.careerObjective}</p>
                </div>
              )}

              <div className="row g-3 pt-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-envelope-fill text-primary fs-5"></i>
                    <div>
                      <small className="text-secondary d-block">Email</small>
                      <span className="fw-semibold small">{profile.email}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
                    <div>
                      <small className="text-secondary d-block">Location</small>
                      <span className="fw-semibold small">{profile.location}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-telephone-fill text-success fs-5"></i>
                    <div>
                      <small className="text-secondary d-block">Phone</small>
                      <span className="fw-semibold small">{profile.phone || '+1 (555) 389-9402'}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-briefcase-fill text-info fs-5"></i>
                    <div>
                      <small className="text-secondary d-block">Employment</small>
                      <span className="fw-semibold small">{profile.workType || 'Full-Time / Contract'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6">
                <div className="glass-card p-4 text-center h-100">
                  <i className="bi bi-clock-history fs-1 text-primary mb-2 d-inline-block"></i>
                  <h4 className="display-6 fw-bold mb-1 text-primary">{profile.yearsOfExperience || 0}+</h4>
                  <p className="small text-secondary mb-0 fw-medium">Years of Experience</p>
                </div>
              </div>
              <div className="col-6">
                <div className="glass-card p-4 text-center h-100">
                  <i className="bi bi-kanban fs-1 text-success mb-2 d-inline-block"></i>
                  <h4 className="display-6 fw-bold mb-1 text-success">{profile.projectsCompleted || 0}+</h4>
                  <p className="small text-secondary mb-0 fw-medium">Projects Completed</p>
                </div>
              </div>
              <div className="col-6">
                <div className="glass-card p-4 text-center h-100">
                  <i className="bi bi-people fs-1 text-info mb-2 d-inline-block"></i>
                  <h4 className="display-6 fw-bold mb-1 text-info">{profile.satisfiedClients || 0}+</h4>
                  <p className="small text-secondary mb-0 fw-medium">Happy Clients & Teams</p>
                </div>
              </div>
              <div className="col-6">
                <div className="glass-card p-4 text-center h-100">
                  <i className="bi bi-git fs-1 text-warning mb-2 d-inline-block"></i>
                  <h4 className="display-6 fw-bold mb-1 text-warning">{profile.codeCommits || 0}+</h4>
                  <p className="small text-secondary mb-0 fw-medium">GitHub Commits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
