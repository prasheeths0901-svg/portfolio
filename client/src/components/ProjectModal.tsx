import React from 'react';
import { Project } from '../types/index.js';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content glass-card border-0 shadow-lg">
          <div className="modal-header border-bottom-0 pb-0">
            <div>
              <span className="badge bg-primary-subtle text-primary mb-1">
                {project.category}
              </span>
              <h4 className="modal-title fw-bold">{project.title}</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body py-4">
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="img-fluid rounded-3 mb-4 shadow-sm w-100"
                style={{ maxHeight: '350px', objectFit: 'cover' }}
              />
            )}

            <h5 className="h6 fw-bold text-secondary uppercase mb-2">Project Overview</h5>
            <p className="text-muted leading-relaxed mb-4">
              {project.description || project.summary}
            </p>

            <h5 className="h6 fw-bold text-secondary uppercase mb-2">Technologies Used</h5>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.techStack?.map((tech, idx) => (
                <span key={idx} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gradient rounded-pill px-4"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary rounded-pill px-4"
                >
                  <i className="bi bi-github me-2"></i> View Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
