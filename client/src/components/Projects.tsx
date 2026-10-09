import React, { useState } from 'react';
import { Project } from '../types/index.js';
import { ProjectModal } from './ProjectModal.js';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile/AI'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="section-badge">Featured Work</span>
          <h2 className="display-6 fw-bold mt-1">Highlighted Projects</h2>
          <div className="mx-auto bg-primary rounded-pill mt-2" style={{ width: 50, height: 4 }}></div>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            A selection of production-ready systems, tools, and platforms I've engineered.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm px-3 py-2 rounded-pill ${
                activeCategory === cat ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="row g-4">
          {filteredProjects.map((project) => (
            <div key={project._id} className="col-md-6 col-lg-4">
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={
                      project.imageUrl ||
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={project.title}
                    className="w-100 h-100 object-fit-cover transition"
                    style={{ transition: 'transform 0.5s ease' }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark text-white bg-opacity-75 backdrop-blur rounded-pill px-3 py-2">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h3 className="h5 fw-bold mb-2">{project.title}</h3>
                  <p className="text-muted small mb-3 flex-grow-1 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="d-flex flex-wrap gap-1 mb-4">
                    {project.techStack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                    {project.techStack?.length > 4 && (
                      <span className="tech-pill text-secondary">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary-subtle">
                    <button
                      className="btn btn-sm btn-link text-primary text-decoration-none p-0 fw-semibold"
                      onClick={() => setSelectedProject(project)}
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </button>

                    <div className="d-flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 34, height: 34 }}
                          title="Source Code"
                        >
                          <i className="bi bi-github"></i>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 34, height: 34 }}
                          title="Live Demo"
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
