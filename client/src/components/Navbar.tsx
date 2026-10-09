import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  brandName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, brandName = 'Prasheeth' }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar navbar-expand-lg sticky-top sticky-nav py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <span className="p-2 rounded-3 bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
            <i className="bi bi-terminal-fill fs-6"></i>
          </span>
          <span>
            <span className="gradient-text">{brandName}</span>
            <span className="text-secondary fs-6 ms-1 font-monospace">.dev</span>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {!isAdmin ? (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3 fw-medium">
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills">Skills</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#experience">Experience</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-primary" to="/">
                  <i className="bi bi-arrow-left me-1"></i> Back to Public Portfolio
                </Link>
              </li>
            </ul>
          )}

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Theme Toggle Button */}
            <button
              className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40 }}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              <i className={`bi bi-${theme === 'dark' ? 'sun-fill text-warning' : 'moon-stars-fill text-dark'}`}></i>
            </button>

            {/* Admin Dashboard / Return Link */}
            {isAdmin ? (
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
              </span>
            ) : (
              <Link
                to="/admin"
                className="btn btn-sm btn-outline-primary rounded-pill px-3 py-2 d-flex align-items-center gap-1"
                title="Admin Control Center"
              >
                <i className="bi bi-speedometer2"></i>
                <span className="d-none d-sm-inline">Admin</span>
              </Link>
            )}

            {!isAdmin && (
              <a href="#contact" className="btn btn-sm btn-gradient rounded-pill px-3 py-2 ms-1">
                Let's Talk
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
