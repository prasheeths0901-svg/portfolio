import React, { useState } from 'react';
import { portfolioService } from '../services/api.js';
import { Profile } from '../types/index.js';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await portfolioService.sendMessage(formData);
      setStatusMessage({ type: 'success', text: response });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      const errText = err.response?.data?.message || 'Failed to send message. Please try again.';
      setStatusMessage({ type: 'error', text: errText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="section-badge">Reach Out</span>
          <h2 className="display-6 fw-bold mt-1">Get In Touch</h2>
          <div className="mx-auto bg-primary rounded-pill mt-2" style={{ width: 50, height: 4 }}></div>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            Have a project in mind, an engineering leadership opportunity, or just want to chat tech? Let's connect!
          </p>
        </div>

        <div className="row g-5 align-items-center">
          {/* Contact Information & Channels */}
          <div className="col-lg-5">
            <div className="pe-lg-4">
              <h3 className="h4 fw-bold mb-3">Let's discuss how we can build something exceptional together.</h3>
              <p className="text-muted leading-relaxed mb-4">
                I am actively considering full-stack engineering roles, technical advisory positions, and high-impact software consulting projects.
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="glass-card p-3 d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-primary-subtle text-primary">
                    <i className="bi bi-envelope-at-fill fs-4"></i>
                  </div>
                  <div>
                    <span className="small text-secondary d-block">Email Directly</span>
                    <a href={`mailto:${profile.email}`} className="fw-semibold text-decoration-none">
                      {profile.email || 'prasheeth.dev@example.com'}
                    </a>
                  </div>
                </div>

                <div className="glass-card p-3 d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-success-subtle text-success">
                    <i className="bi bi-telephone-fill fs-4"></i>
                  </div>
                  <div>
                    <span className="small text-secondary d-block">Phone / WhatsApp</span>
                    <span className="fw-semibold">{profile.phone || '+1 (555) 389-9402'}</span>
                  </div>
                </div>

                <div className="glass-card p-3 d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-danger-subtle text-danger">
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <span className="small text-secondary d-block">Location</span>
                    <span className="fw-semibold">{profile.location || 'San Francisco, CA'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-3 bg-body-secondary small text-muted">
                <i className="bi bi-shield-check text-success me-2"></i>
                Guaranteed fast response time within 24 business hours.
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div className="glass-card p-4 p-md-5">
              <h4 className="fw-bold mb-4">Send a Direct Message</h4>

              {statusMessage && (
                <div
                  className={`alert alert-${
                    statusMessage.type === 'success' ? 'success' : 'danger'
                  } alert-dismissible fade show`}
                  role="alert"
                >
                  <i
                    className={`bi bi-${
                      statusMessage.type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'
                    } me-2`}
                  ></i>
                  {statusMessage.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setStatusMessage(null)}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Your Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Project collaboration / Job offer"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Message *</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows={5}
                      placeholder="Describe your project, timeline, or query..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-gradient px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill"></i>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
