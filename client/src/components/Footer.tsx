import React from 'react';
import { Profile } from '../types/index.js';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-5 border-top border-secondary-subtle bg-body-tertiary">
      <div className="container">
        <div className="row align-items-center justify-content-between g-4">
          <div className="col-md-6 text-center text-md-start">
            <h4 className="fw-bold mb-1 gradient-text">{profile.name || 'Prasheeth'}</h4>
            <p className="text-muted small mb-0">
              Designed & engineered with TypeScript, React 18, Express & MongoDB.
            </p>
            <p className="text-secondary small mt-2 mb-0">
              © {currentYear} {profile.name || 'Prasheeth'}. All rights reserved.
            </p>
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center justify-content-md-end gap-3">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
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
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
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
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
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
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
                title="Twitter"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            )}
            {profile.otherSocialUrl && (
              <a
                href={profile.otherSocialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
                title="Website / Link"
              >
                <i className="bi bi-globe"></i>
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: 38, height: 38 }}
              title="Back to Top"
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
