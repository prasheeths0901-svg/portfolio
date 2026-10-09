import React from 'react';
import { Profile } from '../types/index.js';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section className="hero-wrapper py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-7 text-center text-lg-start">
            {/* Availability status badge */}
            {profile.availabilityStatus && (
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-4 rounded-pill border bg-body-tertiary">
                <span className="spinner-grow spinner-grow-sm text-success" role="status" style={{ width: 10, height: 10 }}></span>
                <span className="small fw-semibold">{profile.availabilityStatus}</span>
              </div>
            )}

            <h1 className="display-4 fw-extrabold mb-3 lh-sm">
              {profile.greetingText || "Hi, I'm"}{' '}
              <span className="gradient-text">{profile.name || 'Prasheeth'}</span>
            </h1>

            <h2 className="h3 fw-semibold text-secondary mb-4">
              {profile.heroTitle || profile.title || 'Full-Stack Software Engineer & Student'}
            </h2>

            <p className="lead text-muted mb-4 pe-lg-4 fs-5">
              {profile.heroDescription ||
                profile.headline ||
                'Architecting scalable cloud architectures, reactive frontends & modern microservices.'}
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-5">
              <a href="#projects" className="btn btn-lg btn-gradient px-4 py-2 rounded-pill shadow-sm">
                <i className="bi bi-briefcase me-2"></i>
                {profile.viewProjectsButtonText || 'View Projects'}
              </a>
              <a href="#contact" className="btn btn-lg btn-outline-primary px-4 py-2 rounded-pill shadow-sm">
                <i className="bi bi-envelope me-2"></i> Get in Touch
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn btn-lg btn-outline-secondary px-4 py-2 rounded-pill shadow-sm"
                >
                  <i className="bi bi-file-earmark-arrow-down me-2"></i>
                  {profile.resumeButtonText || 'Download Resume'}
                </a>
              )}
            </div>

            {/* Social links */}
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 flex-wrap">
              <span className="small text-secondary fw-semibold">Connect:</span>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary fs-4 text-decoration-none"
                  title="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary fs-4 text-decoration-none"
                  title="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {profile.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary fs-4 text-decoration-none"
                  title="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              )}
              {profile.twitterUrl && (
                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary fs-4 text-decoration-none"
                  title="Twitter / X"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
              )}
              {profile.otherSocialUrl && (
                <a
                  href={profile.otherSocialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary fs-4 text-decoration-none"
                  title="Website / Link"
                >
                  <i className="bi bi-globe"></i>
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-secondary fs-4 text-decoration-none"
                  title="Email"
                >
                  <i className="bi bi-envelope-at-fill"></i>
                </a>
              )}
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <div className="position-relative d-inline-block">
              {/* Decorative background glow */}
              <div
                className="position-absolute top-50 start-50 translate-middle rounded-circle bg-primary opacity-25"
                style={{ width: '320px', height: '320px', filter: 'blur(60px)' }}
              ></div>

              {/* Profile Avatar Card */}
              <div className="glass-card p-3 p-sm-4 position-relative z-1 shadow-lg text-center" style={{ maxWidth: '380px' }}>
                <img
                  src={profile.avatarUrl || '/prasheeth.jpg'}
                  alt={profile.name}
                  className="rounded-4 img-fluid mb-3 shadow"
                  style={{ maxHeight: '340px', width: '100%', objectFit: 'cover' }}
                />
                <div className="d-flex align-items-center justify-content-between px-2 pt-2">
                  <div className="text-start">
                    <span className="small text-secondary d-block">Location</span>
                    <span className="fw-semibold small">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                      {profile.location || 'San Francisco, CA'}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="small text-secondary d-block">Work Type</span>
                    <span className="fw-semibold small text-primary">
                      {profile.workType || 'Full-Time / Contract'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
