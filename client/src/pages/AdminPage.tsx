import React, { useEffect, useState } from 'react';
import { portfolioService } from '../services/api.js';
import {
  Profile,
  Skill,
  Project,
  Education,
  Experience,
  Message,
  User,
} from '../types/index.js';

interface AdminPageProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const AdminPage: React.FC<AdminPageProps> = ({ profile, setProfile }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Active section tab
  const [activeSection, setActiveSection] = useState<
    | 'personal-hero'
    | 'about'
    | 'skills'
    | 'projects'
    | 'education'
    | 'experience'
    | 'socials'
    | 'resume'
    | 'messages'
  >('personal-hero');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@portfolio.dev');
  const [loginPassword, setLoginPassword] = useState('Admin@123456');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Notification state
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState<Profile>(profile);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Modals / Item editing states
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    category: 'frontend',
    proficiency: 85,
    icon: 'bi-code-slash',
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: 'Full Stack',
    summary: '',
    description: '',
    techStack: [],
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
  });
  const [techInput, setTechInput] = useState('');

  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    collegeName: '',
    degree: '',
    department: '',
    year: '',
    cgpa: '',
    description: '',
  });

  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    companyName: '',
    role: '',
    duration: '',
    description: '',
    certificateUrl: '',
  });

  // Uploading flags
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingProjectImg, setUploadingProjectImg] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await portfolioService.getMe();
      if (user) {
        setCurrentUser(user);
        loadAllData();
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, []);

  const showAlert = (type: 'success' | 'danger', text: string) => {
    setAlert({ type, text });
    setTimeout(() => setAlert(null), 4000);
  };

  const loadAllData = async () => {
    try {
      const [profData, skillsData, projData, eduData, expData, msgsData] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getSkills(),
        portfolioService.getProjects(),
        portfolioService.getEducations(),
        portfolioService.getExperiences(),
        portfolioService.getMessages(),
      ]);
      if (profData) {
        setProfile(profData);
        setProfileForm(profData);
      }
      setSkills(skillsData || []);
      setProjects(projData || []);
      setEducations(eduData || []);
      setExperiences(expData || []);
      setMessages(msgsData || []);
    } catch (err) {
      console.error('Failed to load portfolio CMS data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const data = await portfolioService.login({ email: loginEmail, password: loginPassword });
      setCurrentUser(data.user);
      await loadAllData();
      showAlert('success', `Welcome back, ${data.user.username}!`);
    } catch (err: any) {
      setLoginError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    portfolioService.logout();
    setCurrentUser(null);
  };

  // Profile Save
  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await portfolioService.updateProfile(profileForm);
      setProfile(updated);
      setProfileForm(updated);
      showAlert('success', 'Profile and section details saved successfully!');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Avatar Upload
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const fileUrl = await portfolioService.uploadFile(file);
      const updatedForm = { ...profileForm, avatarUrl: fileUrl };
      setProfileForm(updatedForm);
      const updated = await portfolioService.updateProfile(updatedForm);
      setProfile(updated);
      showAlert('success', 'Profile photo uploaded and updated successfully!');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to upload photo.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Resume Upload
  const handleResumeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const fileUrl = await portfolioService.uploadFile(file);
      const updatedForm = { ...profileForm, resumeUrl: fileUrl };
      setProfileForm(updatedForm);
      const updated = await portfolioService.updateProfile(updatedForm);
      setProfile(updated);
      showAlert('success', 'Resume PDF uploaded successfully! Download button now points to it.');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to upload resume PDF.');
    } finally {
      setUploadingResume(false);
    }
  };

  // Skills handlers
  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      const created = await portfolioService.createSkill(newSkill);
      setSkills((prev) => [...prev, created]);
      setNewSkill({ name: '', category: 'frontend', proficiency: 85, icon: 'bi-code-slash' });
      showAlert('success', `Skill "${created.name}" added successfully!`);
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to add skill.');
    }
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill._id) return;
    try {
      const updated = await portfolioService.updateSkill(editingSkill._id, editingSkill);
      setSkills((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
      setEditingSkill(null);
      showAlert('success', `Skill "${updated.name}" updated successfully!`);
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to update skill.');
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await portfolioService.deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s._id !== id));
      showAlert('success', `Skill "${name}" deleted.`);
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to delete skill.');
    }
  };

  // Projects handlers
  const handleProjectImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditing: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingProjectImg(true);
    try {
      const fileUrl = await portfolioService.uploadFile(file);
      if (isEditing && editingProject) {
        setEditingProject({ ...editingProject, imageUrl: fileUrl });
      } else {
        setNewProject({ ...newProject, imageUrl: fileUrl });
      }
      showAlert('success', 'Project image uploaded.');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to upload project image.');
    } finally {
      setUploadingProjectImg(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      const techArray = techInput
        ? techInput.split(',').map((t) => t.trim()).filter(Boolean)
        : newProject.techStack || [];
      const projectPayload = { ...newProject, techStack: techArray };
      const created = await portfolioService.createProject(projectPayload);
      setProjects((prev) => [created, ...prev]);
      setNewProject({
        title: '',
        category: 'Full Stack',
        summary: '',
        description: '',
        techStack: [],
        imageUrl: '',
        githubUrl: '',
        liveUrl: '',
      });
      setTechInput('');
      showAlert('success', `Project "${created.title}" added successfully!`);
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to create project.');
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject._id) return;
    try {
      const updated = await portfolioService.updateProject(editingProject._id, editingProject);
      setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      setEditingProject(null);
      showAlert('success', `Project "${updated.title}" updated successfully!`);
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to update project.');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await portfolioService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      showAlert('success', `Project "${title}" deleted.`);
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to delete project.');
    }
  };

  // Education handlers
  const handleCreateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEducation.collegeName || !newEducation.degree) return;
    try {
      const created = await portfolioService.createEducation(newEducation);
      setEducations((prev) => [...prev, created]);
      setNewEducation({
        collegeName: '',
        degree: '',
        department: '',
        year: '',
        cgpa: '',
        description: '',
      });
      showAlert('success', 'Education record added!');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to add education.');
    }
  };

  const handleUpdateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation || !editingEducation._id) return;
    try {
      const updated = await portfolioService.updateEducation(editingEducation._id, editingEducation);
      setEducations((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
      setEditingEducation(null);
      showAlert('success', 'Education record updated!');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to update education.');
    }
  };

  const handleDeleteEducation = async (id: string, name: string) => {
    if (!window.confirm(`Delete education record for "${name}"?`)) return;
    try {
      await portfolioService.deleteEducation(id);
      setEducations((prev) => prev.filter((e) => e._id !== id));
      showAlert('success', 'Education record deleted.');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to delete education.');
    }
  };

  // Experience handlers
  const handleCreateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExperience.companyName || !newExperience.role) return;
    try {
      const created = await portfolioService.createExperience(newExperience);
      setExperiences((prev) => [...prev, created]);
      setNewExperience({
        companyName: '',
        role: '',
        duration: '',
        description: '',
        certificateUrl: '',
      });
      showAlert('success', 'Experience record added!');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to add experience.');
    }
  };

  const handleUpdateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience || !editingExperience._id) return;
    try {
      const updated = await portfolioService.updateExperience(editingExperience._id, editingExperience);
      setExperiences((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
      setEditingExperience(null);
      showAlert('success', 'Experience record updated!');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to update experience.');
    }
  };

  const handleDeleteExperience = async (id: string, name: string) => {
    if (!window.confirm(`Delete experience record for "${name}"?`)) return;
    try {
      await portfolioService.deleteExperience(id);
      setExperiences((prev) => prev.filter((x) => x._id !== id));
      showAlert('success', 'Experience record deleted.');
    } catch (err: any) {
      showAlert('danger', err.response?.data?.message || 'Failed to delete experience.');
    }
  };

  // Message handlers
  const handleMarkMessageRead = async (id: string) => {
    try {
      await portfolioService.markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await portfolioService.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      showAlert('success', 'Message deleted.');
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!currentUser) {
    return (
      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="glass-card p-4 p-sm-5 shadow-lg">
              <div className="text-center mb-4">
                <span className="p-3 rounded-circle bg-primary-subtle text-primary d-inline-flex mb-3">
                  <i className="bi bi-shield-lock-fill fs-2"></i>
                </span>
                <h3 className="fw-bold">CMS Admin Login</h3>
                <p className="text-muted small">
                  Sign in to manage and edit all portfolio sections dynamically without editing code.
                </p>
              </div>

              {loginError && (
                <div className="alert alert-danger py-2 small" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Admin Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <div className="form-text small">Default: <code>admin@portfolio.dev</code></div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <div className="form-text small">Default: <code>Admin@123456</code></div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="btn btn-primary w-100 py-2 rounded-pill fw-semibold shadow-sm"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Authenticating...
                    </>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED CMS DASHBOARD
  return (
    <div className="container-fluid px-lg-5 py-4">
      {/* Top Banner */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
        <div>
          <span className="section-badge">Content Management System</span>
          <h2 className="fw-bold mb-0">Portfolio CMS Dashboard</h2>
          <small className="text-muted">
            Signed in as <strong>{currentUser.username}</strong> ({currentUser.email})
          </small>
        </div>

        <div className="d-flex align-items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill px-3">
            <i className="bi bi-box-arrow-up-right me-1"></i> Preview Live Site
          </a>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger rounded-pill px-3">
            <i className="bi bi-box-arrow-right me-1"></i> Sign Out
          </button>
        </div>
      </div>

      {/* Global Alert */}
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <i className={`bi bi-${alert.type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'} me-2`}></i>
          {alert.text}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Navigation Sidebar */}
        <div className="col-lg-3 col-md-4">
          <div className="glass-card p-3 sticky-top" style={{ top: '90px' }}>
            <h6 className="text-uppercase fw-bold text-secondary small px-3 mb-3">Portfolio Sections</h6>
            <div className="nav flex-column nav-pills gap-1">
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'personal-hero' ? 'active' : ''}`}
                onClick={() => setActiveSection('personal-hero')}
              >
                <i className="bi bi-person-badge-fill me-2"></i> 1. Personal & Hero
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setActiveSection('about')}
              >
                <i className="bi bi-file-person-fill me-2"></i> 2. About & Bio
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveSection('skills')}
              >
                <i className="bi bi-lightning-charge-fill me-2"></i> 3. Skills ({skills.length})
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveSection('projects')}
              >
                <i className="bi bi-kanban-fill me-2"></i> 4. Projects ({projects.length})
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'education' ? 'active' : ''}`}
                onClick={() => setActiveSection('education')}
              >
                <i className="bi bi-mortarboard-fill me-2"></i> 5. Education ({educations.length})
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveSection('experience')}
              >
                <i className="bi bi-briefcase-fill me-2"></i> 6. Experience / Internships ({experiences.length})
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveSection('socials')}
              >
                <i className="bi bi-share-fill me-2"></i> 7. Social Links & Contact
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'resume' ? 'active' : ''}`}
                onClick={() => setActiveSection('resume')}
              >
                <i className="bi bi-file-earmark-pdf-fill me-2"></i> 8. Resume PDF
              </button>
              <button
                className={`nav-link text-start rounded-3 py-2 px-3 ${activeSection === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveSection('messages')}
              >
                <i className="bi bi-inbox-fill me-2"></i> 9. Inquiries ({messages.filter((m) => !m.isRead).length} new)
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-lg-9 col-md-8">
          {/* SECTION 1: PERSONAL & HERO */}
          {activeSection === 'personal-hero' && (
            <div className="glass-card p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Personal Information & Hero Section</h4>
                  <p className="text-muted small mb-0">Edit your name, title, profile picture, greeting, and call-to-action buttons.</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile}>
                {/* Profile Photo Upload */}
                <div className="mb-4 p-3 rounded-3 border bg-body-tertiary">
                  <label className="form-label fw-bold small text-uppercase">Profile Photo</label>
                  <div className="d-flex flex-wrap align-items-center gap-4">
                    <img
                      src={profileForm.avatarUrl || '/prasheeth.jpg'}
                      alt="Avatar Preview"
                      className="rounded-4 shadow"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <div className="mb-2">
                        <label className="form-label small">Upload New Photo File (JPG, PNG, WebP)</label>
                        <input
                          type="file"
                          className="form-control form-control-sm"
                          accept="image/*"
                          onChange={handleAvatarFileChange}
                          disabled={uploadingAvatar}
                        />
                      </div>
                      <div>
                        <label className="form-label small">Or Enter Image URL</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={profileForm.avatarUrl || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        />
                      </div>
                      {uploadingAvatar && (
                        <div className="text-primary small mt-1">
                          <span className="spinner-border spinner-border-sm me-1"></span> Uploading photo...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.name || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Greeting Text</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hi, I'm"
                      value={profileForm.greetingText || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, greetingText: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Professional Title / Headline Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.heroTitle || profileForm.title || ''}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          heroTitle: e.target.value,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Availability Status Badge</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.availabilityStatus || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, availabilityStatus: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Hero Description / Tagline</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={profileForm.heroDescription || profileForm.headline || ''}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          heroDescription: e.target.value,
                          headline: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.location || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Work Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full-Time / Contract"
                      value={profileForm.workType || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, workType: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={profileForm.email || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.phone || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">View Projects Button Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.viewProjectsButtonText || ''}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, viewProjectsButtonText: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Resume Button Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.resumeButtonText || ''}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, resumeButtonText: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" disabled={isSaving} className="btn btn-primary px-4 rounded-pill">
                    {isSaving ? 'Saving...' : 'Save Personal & Hero Info'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile)}
                    className="btn btn-outline-secondary px-4 rounded-pill"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 2: ABOUT SECTION */}
          {activeSection === 'about' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">About Section</h4>
              <p className="text-muted small mb-4">Edit your biography, career objective, and key statistics counters.</p>

              <form onSubmit={handleSaveProfile}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">About Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.aboutHeading || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, aboutHeading: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">About Sub-Headline</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.aboutSubheading || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, aboutSubheading: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">About Description / Biography *</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      value={profileForm.aboutDescription || profileForm.about || ''}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          aboutDescription: e.target.value,
                          about: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Career Objective</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={profileForm.careerObjective || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, careerObjective: e.target.value })}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Years of Experience</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.yearsOfExperience || 0}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, yearsOfExperience: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Projects Completed</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.projectsCompleted || 0}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, projectsCompleted: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Satisfied Clients / Teams</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.satisfiedClients || 0}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, satisfiedClients: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">GitHub Commits Counter</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profileForm.codeCommits || 0}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, codeCommits: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" disabled={isSaving} className="btn btn-primary px-4 rounded-pill">
                    {isSaving ? 'Saving...' : 'Save About Section'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile)}
                    className="btn btn-outline-secondary px-4 rounded-pill"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 3: SKILLS MANAGEMENT */}
          {activeSection === 'skills' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">Skills Management</h4>
              <p className="text-muted small mb-4">Add, edit, or remove technical skills with categories and proficiency percentages.</p>

              {/* Add Skill Form */}
              <div className="p-3 mb-4 rounded-3 border bg-body-tertiary">
                <h6 className="fw-bold mb-3">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h6>
                <form onSubmit={editingSkill ? handleUpdateSkill : handleCreateSkill}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Skill Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. React.js, Python, Docker"
                        value={editingSkill ? editingSkill.name : newSkill.name || ''}
                        onChange={(e) =>
                          editingSkill
                            ? setEditingSkill({ ...editingSkill, name: e.target.value })
                            : setNewSkill({ ...newSkill, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Category *</label>
                      <select
                        className="form-select form-select-sm"
                        value={editingSkill ? editingSkill.category : newSkill.category || 'frontend'}
                        onChange={(e) =>
                          editingSkill
                            ? setEditingSkill({ ...editingSkill, category: e.target.value })
                            : setNewSkill({ ...newSkill, category: e.target.value })
                        }
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">Database</option>
                        <option value="devops">DevOps & Cloud</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">
                        Proficiency Level: {editingSkill ? editingSkill.proficiency : newSkill.proficiency}%
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="10"
                        max="100"
                        value={editingSkill ? editingSkill.proficiency : newSkill.proficiency || 80}
                        onChange={(e) =>
                          editingSkill
                            ? setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })
                            : setNewSkill({ ...newSkill, proficiency: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label small fw-semibold">Icon Class</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="bi-code-slash"
                        value={editingSkill ? editingSkill.icon : newSkill.icon || ''}
                        onChange={(e) =>
                          editingSkill
                            ? setEditingSkill({ ...editingSkill, icon: e.target.value })
                            : setNewSkill({ ...newSkill, icon: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3">
                        {editingSkill ? 'Save Skill Changes' : 'Add Skill'}
                      </button>
                      {editingSkill && (
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Skills List */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Skill Name</th>
                      <th>Category</th>
                      <th>Proficiency</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill) => (
                      <tr key={skill._id}>
                        <td>
                          <i className={`bi ${skill.icon || 'bi-code-slash'} fs-5 text-primary`}></i>
                        </td>
                        <td className="fw-semibold">{skill.name}</td>
                        <td>
                          <span className="badge bg-secondary-subtle text-secondary text-capitalize">
                            {skill.category}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2" style={{ maxWidth: '160px' }}>
                            <div className="progress flex-grow-1" style={{ height: '6px' }}>
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: `${skill.proficiency}%` }}
                              ></div>
                            </div>
                            <small className="fw-bold">{skill.proficiency}%</small>
                          </div>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="btn btn-sm btn-outline-primary rounded-pill me-2 px-2 py-1"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill._id!, skill.name)}
                            className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 4: PROJECTS MANAGEMENT */}
          {activeSection === 'projects' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">Projects Section</h4>
              <p className="text-muted small mb-4">Add, edit, or delete showcased portfolio projects with GitHub and Live demo links.</p>

              {/* Add / Edit Project Form */}
              <div className="p-3 mb-4 rounded-3 border bg-body-tertiary">
                <h6 className="fw-bold mb-3">{editingProject ? 'Edit Project' : 'Add New Project'}</h6>
                <form onSubmit={editingProject ? handleUpdateProject : handleCreateProject}>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold">Project Title *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editingProject ? editingProject.title : newProject.title || ''}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, title: e.target.value })
                            : setNewProject({ ...newProject, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Category</label>
                      <select
                        className="form-select form-select-sm"
                        value={editingProject ? editingProject.category : newProject.category || 'Full Stack'}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, category: e.target.value })
                            : setNewProject({ ...newProject, category: e.target.value })
                        }
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Mobile/AI">Mobile/AI</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Short Summary</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="One-line summary for project card"
                        value={editingProject ? editingProject.summary : newProject.summary || ''}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, summary: e.target.value })
                            : setNewProject({ ...newProject, summary: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Detailed Description</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows={3}
                        value={editingProject ? editingProject.description : newProject.description || ''}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, description: e.target.value })
                            : setNewProject({ ...newProject, description: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">
                        Technologies Used {editingProject ? '' : '(comma-separated)'}
                      </label>
                      {editingProject ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editingProject.techStack?.join(', ') || ''}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              techStack: e.target.value.split(',').map((t) => t.trim()),
                            })
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="e.g. React, Node.js, MongoDB, Docker"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                        />
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Project Image (Upload or URL)</label>
                      <div className="input-group input-group-sm">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => handleProjectImageUpload(e, !!editingProject)}
                          disabled={uploadingProjectImg}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Or image URL"
                          value={editingProject ? editingProject.imageUrl : newProject.imageUrl || ''}
                          onChange={(e) =>
                            editingProject
                              ? setEditingProject({ ...editingProject, imageUrl: e.target.value })
                              : setNewProject({ ...newProject, imageUrl: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">GitHub Repository URL</label>
                      <input
                        type="url"
                        className="form-control form-control-sm"
                        value={editingProject ? editingProject.githubUrl : newProject.githubUrl || ''}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, githubUrl: e.target.value })
                            : setNewProject({ ...newProject, githubUrl: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Live Demo URL</label>
                      <input
                        type="url"
                        className="form-control form-control-sm"
                        value={editingProject ? editingProject.liveUrl : newProject.liveUrl || ''}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, liveUrl: e.target.value })
                            : setNewProject({ ...newProject, liveUrl: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12 d-flex gap-2 mt-3">
                      <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3">
                        {editingProject ? 'Save Project Changes' : 'Add Project'}
                      </button>
                      {editingProject && (
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Projects List */}
              <div className="row g-3">
                {projects.map((proj) => (
                  <div key={proj._id} className="col-md-6">
                    <div className="p-3 rounded-3 border bg-body-tertiary h-100 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <span className="badge bg-primary-subtle text-primary mb-1">{proj.category}</span>
                          <h6 className="fw-bold mb-0">{proj.title}</h6>
                        </div>
                        <div className="d-flex gap-1">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="btn btn-sm btn-outline-primary rounded-circle"
                            style={{ width: 32, height: 32 }}
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj._id!, proj.title)}
                            className="btn btn-sm btn-outline-danger rounded-circle"
                            style={{ width: 32, height: 32 }}
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>

                      <p className="small text-muted mb-2 flex-grow-1">{proj.summary || proj.description}</p>

                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {proj.techStack?.map((t, i) => (
                          <span key={i} className="badge bg-secondary-subtle text-secondary small">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="d-flex gap-2 small">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-secondary">
                            <i className="bi bi-github me-1"></i> Repo
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-primary">
                            <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: EDUCATION SECTION */}
          {activeSection === 'education' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">Education Section</h4>
              <p className="text-muted small mb-4">Manage academic credentials, degrees, CGPA scores, and departments.</p>

              {/* Add / Edit Form */}
              <div className="p-3 mb-4 rounded-3 border bg-body-tertiary">
                <h6 className="fw-bold mb-3">{editingEducation ? 'Edit Education' : 'Add New Education'}</h6>
                <form onSubmit={editingEducation ? handleUpdateEducation : handleCreateEducation}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">College / University Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editingEducation ? editingEducation.collegeName : newEducation.collegeName || ''}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, collegeName: e.target.value })
                            : setNewEducation({ ...newEducation, collegeName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Degree *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. B.Tech, B.S., Diploma"
                        value={editingEducation ? editingEducation.degree : newEducation.degree || ''}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, degree: e.target.value })
                            : setNewEducation({ ...newEducation, degree: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Department / Major</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. Computer Science & Engineering"
                        value={editingEducation ? editingEducation.department : newEducation.department || ''}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, department: e.target.value })
                            : setNewEducation({ ...newEducation, department: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Year *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. 2021 - 2025"
                        value={editingEducation ? editingEducation.year : newEducation.year || ''}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, year: e.target.value })
                            : setNewEducation({ ...newEducation, year: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">CGPA / Percentage</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. 9.2 / 10.0 or 92%"
                        value={editingEducation ? editingEducation.cgpa : newEducation.cgpa || ''}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, cgpa: e.target.value })
                            : setNewEducation({ ...newEducation, cgpa: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Description / Key Coursework</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows={2}
                        value={editingEducation ? editingEducation.description : newEducation.description || ''}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, description: e.target.value })
                            : setNewEducation({ ...newEducation, description: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3">
                        {editingEducation ? 'Save Education Changes' : 'Add Education'}
                      </button>
                      {editingEducation && (
                        <button
                          type="button"
                          onClick={() => setEditingEducation(null)}
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Education List */}
              <div className="d-flex flex-column gap-3">
                {educations.map((edu) => (
                  <div key={edu._id} className="p-3 rounded-3 border bg-body-tertiary">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <h6 className="fw-bold mb-0 text-primary">{edu.degree}</h6>
                        <span className="small text-secondary">{edu.collegeName}</span>
                      </div>
                      <div className="d-flex gap-1 align-items-center">
                        <span className="badge bg-secondary-subtle text-secondary me-2">{edu.year}</span>
                        <button
                          onClick={() => setEditingEducation(edu)}
                          className="btn btn-sm btn-outline-primary rounded-circle"
                          style={{ width: 30, height: 30 }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(edu._id!, edu.degree)}
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          style={{ width: 30, height: 30 }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>

                    <div className="small text-muted mb-2">
                      {edu.department && <span>Department: {edu.department} • </span>}
                      {edu.cgpa && <strong className="text-success">CGPA: {edu.cgpa}</strong>}
                    </div>

                    {edu.description && <p className="small text-muted mb-0">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: EXPERIENCE & INTERNSHIPS */}
          {activeSection === 'experience' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">Experience / Internships</h4>
              <p className="text-muted small mb-4">Add, update, or remove work experience and internship milestones with certificates.</p>

              {/* Add / Edit Form */}
              <div className="p-3 mb-4 rounded-3 border bg-body-tertiary">
                <h6 className="fw-bold mb-3">{editingExperience ? 'Edit Experience' : 'Add New Experience'}</h6>
                <form onSubmit={editingExperience ? handleUpdateExperience : handleCreateExperience}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Company / Organization Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editingExperience ? editingExperience.companyName : newExperience.companyName || ''}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, companyName: e.target.value })
                            : setNewExperience({ ...newExperience, companyName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Role / Title *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. Software Engineer Intern"
                        value={editingExperience ? editingExperience.role : newExperience.role || ''}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, role: e.target.value })
                            : setNewExperience({ ...newExperience, role: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Duration *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. Jun 2024 - Present"
                        value={editingExperience ? editingExperience.duration : newExperience.duration || ''}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, duration: e.target.value })
                            : setNewExperience({ ...newExperience, duration: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Certificate / Offer Letter Link</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="https://... or /uploads/..."
                        value={editingExperience ? editingExperience.certificateUrl : newExperience.certificateUrl || ''}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, certificateUrl: e.target.value })
                            : setNewExperience({ ...newExperience, certificateUrl: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Description / Key Accomplishments *</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows={3}
                        value={editingExperience ? editingExperience.description : newExperience.description || ''}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, description: e.target.value })
                            : setNewExperience({ ...newExperience, description: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3">
                        {editingExperience ? 'Save Experience Changes' : 'Add Experience'}
                      </button>
                      {editingExperience && (
                        <button
                          type="button"
                          onClick={() => setEditingExperience(null)}
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Experience List */}
              <div className="d-flex flex-column gap-3">
                {experiences.map((exp) => (
                  <div key={exp._id} className="p-3 rounded-3 border bg-body-tertiary">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <h6 className="fw-bold mb-0 text-primary">{exp.role}</h6>
                        <span className="small text-secondary">{exp.companyName}</span>
                      </div>
                      <div className="d-flex gap-1 align-items-center">
                        <span className="badge bg-secondary-subtle text-secondary me-2">{exp.duration}</span>
                        <button
                          onClick={() => setEditingExperience(exp)}
                          className="btn btn-sm btn-outline-primary rounded-circle"
                          style={{ width: 30, height: 30 }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp._id!, exp.role)}
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          style={{ width: 30, height: 30 }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>

                    <p className="small text-muted mb-2">{exp.description}</p>

                    {exp.certificateUrl && (
                      <a
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="small text-decoration-none text-primary fw-semibold"
                      >
                        <i className="bi bi-file-earmark-check me-1"></i> View Certificate / Letter
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: SOCIAL MEDIA & CONTACT */}
          {activeSection === 'socials' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">Social Media & Contact Information</h4>
              <p className="text-muted small mb-4">Edit all your social handles, direct communication channels, and links.</p>

              <form onSubmit={handleSaveProfile}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-github me-1"></i> GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileForm.githubUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-linkedin me-1 text-primary"></i> LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileForm.linkedinUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-instagram me-1 text-danger"></i> Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileForm.instagramUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, instagramUrl: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-twitter-x me-1"></i> Twitter / X Profile URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileForm.twitterUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, twitterUrl: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-globe me-1 text-info"></i> Other Website / Link
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Personal blog, LeetCode, or portfolio link"
                      value={profileForm.otherSocialUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, otherSocialUrl: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-envelope-fill me-1 text-warning"></i> Contact Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={profileForm.email || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-telephone-fill me-1 text-success"></i> Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.phone || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">
                      <i className="bi bi-geo-alt-fill me-1 text-danger"></i> Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.location || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" disabled={isSaving} className="btn btn-primary px-4 rounded-pill">
                    {isSaving ? 'Saving...' : 'Save Social & Contact Links'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile)}
                    className="btn btn-outline-secondary px-4 rounded-pill"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 8: RESUME MANAGEMENT */}
          {activeSection === 'resume' && (
            <div className="glass-card p-4 p-lg-5">
              <h4 className="fw-bold mb-1">Resume Management</h4>
              <p className="text-muted small mb-4">
                Upload or replace your resume PDF. The "Download Resume" buttons on the portfolio will automatically use the latest uploaded file.
              </p>

              <div className="p-4 rounded-3 border bg-body-tertiary mb-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                  <div>
                    <h6 className="fw-bold mb-1">
                      <i className="bi bi-file-earmark-pdf-fill text-danger fs-5 me-2"></i>
                      Current Resume Target
                    </h6>
                    <code className="small text-break">{profileForm.resumeUrl || 'None configured'}</code>
                  </div>
                  {profileForm.resumeUrl && (
                    <a
                      href={profileForm.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                    >
                      <i className="bi bi-download me-1"></i> Test Download
                    </a>
                  )}
                </div>

                <hr />

                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase">Upload New Resume PDF</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf"
                    onChange={handleResumeFileChange}
                    disabled={uploadingResume}
                  />
                  <div className="form-text small">Accepted file format: <code>.pdf</code> (Max 15MB)</div>
                  {uploadingResume && (
                    <div className="text-primary small mt-2">
                      <span className="spinner-border spinner-border-sm me-1"></span> Uploading resume file...
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label small fw-bold text-uppercase">Or Specify Direct Resume URL</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://drive.google.com/... or /uploads/resume.pdf"
                      value={profileForm.resumeUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveProfile()}
                      className="btn btn-primary"
                      disabled={isSaving}
                    >
                      Save URL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 9: INQUIRIES & MESSAGES */}
          {activeSection === 'messages' && (
            <div className="glass-card p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Visitor Inquiries</h4>
                  <p className="text-muted small mb-0">Direct messages submitted from the public portfolio contact form.</p>
                </div>
                <button onClick={loadAllData} className="btn btn-sm btn-outline-secondary rounded-pill">
                  <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-muted text-center py-4">No contact messages received yet.</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`p-3 rounded-3 border ${
                        msg.isRead ? 'bg-body-tertiary' : 'border-primary bg-primary-subtle'
                      }`}
                    >
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                        <div>
                          <span className="fw-bold fs-6">{msg.name}</span>
                          <span className="text-muted small ms-2">&lt;{msg.email}&gt;</span>
                          {!msg.isRead && (
                            <span className="badge bg-primary ms-2 rounded-pill">New / Unread</span>
                          )}
                        </div>
                        <div className="small text-secondary">
                          {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="fw-semibold text-secondary small mb-2">
                        Subject: {msg.subject}
                      </div>

                      <p className="mb-3 text-muted">{msg.message}</p>

                      <div className="d-flex gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="btn btn-sm btn-primary rounded-pill px-3"
                        >
                          <i className="bi bi-reply-fill me-1"></i> Reply
                        </a>
                        {!msg.isRead && (
                          <button
                            onClick={() => handleMarkMessageRead(msg._id)}
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                          >
                            <i className="bi bi-check2 me-1"></i> Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                        >
                          <i className="bi bi-trash3 me-1"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
