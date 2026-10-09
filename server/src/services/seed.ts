import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { Skill } from '../models/Skill.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Message } from '../models/Message.js';
import { connectDB, disconnectDB } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const seedDatabase = async (): Promise<void> => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already contains data, skipping seed.');
      return;
    }

    console.log('Seeding initial portfolio data...');

    // 1. Seed Admin User
    await User.create({
      username: 'prasheethadmin',
      email: 'admin@portfolio.dev',
      password: 'Admin@123456',
      role: 'admin',
    });

    // 2. Seed Developer Profile
    await Profile.create({
      name: 'Prasheeth',
      title: 'Full-Stack Software Engineer & Student',
      headline: 'Architecting scalable cloud architectures, reactive frontends & modern microservices.',
      bio: 'Versatile software engineer and student with deep experience developing modern web applications, high-throughput distributed systems, and delightful user interfaces.',
      about: "Hello! I'm Prasheeth, a passionate software developer and student. I thrive at the intersection of robust backend infrastructure and fluid frontend engineering. I enjoy designing scalable platforms, optimizing databases, and crafting clean, maintainable code.\n\nWhen I'm not writing code or deploying containers, you'll find me contributing to open-source software, building innovative tech projects, or learning emerging frameworks.",
      avatarUrl: '/prasheeth.jpg',
      email: 'prasheeth.dev@example.com',
      phone: '+1 (555) 389-9402',
      location: 'San Francisco, CA & Remote',
      resumeUrl: '#',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://twitter.com',
      yearsOfExperience: 5,
      projectsCompleted: 34,
      satisfiedClients: 22,
      codeCommits: 2840,
    });

    // 3. Seed Skills
    const skillsData = [
      // Frontend
      { name: 'TypeScript', category: 'frontend', proficiency: 95, icon: 'bi-filetype-tsx', featured: true, order: 1 },
      { name: 'React.js & Next.js', category: 'frontend', proficiency: 92, icon: 'bi-lightning-charge', featured: true, order: 2 },
      { name: 'HTML5 & Modern CSS / Sass', category: 'frontend', proficiency: 94, icon: 'bi-filetype-css', featured: false, order: 3 },
      { name: 'Tailwind CSS & Bootstrap', category: 'frontend', proficiency: 90, icon: 'bi-palette', featured: true, order: 4 },
      { name: 'State Management (Redux, Zustand)', category: 'frontend', proficiency: 88, icon: 'bi-boxes', featured: false, order: 5 },

      // Backend
      { name: 'Node.js & Express', category: 'backend', proficiency: 94, icon: 'bi-hdd-network', featured: true, order: 6 },
      { name: 'RESTful API & GraphQL', category: 'backend', proficiency: 91, icon: 'bi-diagram-3', featured: true, order: 7 },
      { name: 'Microservices Architecture', category: 'backend', proficiency: 86, icon: 'bi-diagram-2', featured: true, order: 8 },
      { name: 'Python & FastAPI', category: 'backend', proficiency: 84, icon: 'bi-terminal', featured: false, order: 9 },

      // Database
      { name: 'MongoDB & Mongoose', category: 'database', proficiency: 92, icon: 'bi-database-check', featured: true, order: 10 },
      { name: 'PostgreSQL & Prisma', category: 'database', proficiency: 88, icon: 'bi-database', featured: true, order: 11 },
      { name: 'Redis Caching', category: 'database', proficiency: 85, icon: 'bi-speedometer2', featured: false, order: 12 },

      // DevOps & Cloud
      { name: 'Docker & Containerization', category: 'devops', proficiency: 90, icon: 'bi-box-seam', featured: true, order: 13 },
      { name: 'AWS (S3, EC2, Lambda, RDS)', category: 'devops', proficiency: 87, icon: 'bi-cloud-check', featured: true, order: 14 },
      { name: 'CI/CD Pipelines (GitHub Actions)', category: 'devops', proficiency: 89, icon: 'bi-gear-wide-connected', featured: true, order: 15 },
      { name: 'Kubernetes Orchestration', category: 'devops', proficiency: 78, icon: 'bi-grid-3x3', featured: false, order: 16 },

      // Tools
      { name: 'Git & Version Control', category: 'tools', proficiency: 96, icon: 'bi-git', featured: true, order: 17 },
      { name: 'Jest, Vitest & Cypress', category: 'tools', proficiency: 86, icon: 'bi-check2-circle', featured: false, order: 18 },
      { name: 'Webpack, Vite & Rollup', category: 'tools', proficiency: 89, icon: 'bi-cpu', featured: false, order: 19 },
    ];
    await Skill.insertMany(skillsData);

    // 4. Seed Projects
    const projectsData = [
      {
        title: 'Nexus Cloud Analytics Platform',
        summary: 'Real-time telemetry and cloud cost monitoring dashboard processing millions of data points.',
        description: 'An enterprise-grade observability and cost optimization dashboard for multi-cloud deployments. Features live streaming metrics, anomaly detection alerts, and interactive customizable analytics dashboards.',
        category: 'Full Stack',
        techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Chart.js', 'Docker'],
        githubUrl: 'https://github.com/example/nexus-cloud-analytics',
        liveUrl: 'https://nexus-demo.example.com',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        featured: true,
        order: 1,
      },
      {
        title: 'DevPulse Code Collaboration Suite',
        summary: 'Interactive real-time peer code review and collaborative markdown workspace.',
        description: 'A modern development workspace supporting syntax highlighting for 40+ languages, WebSocket live collaboration, automated PR summaries, and secure team permission management.',
        category: 'Full Stack',
        techStack: ['React 18', 'TypeScript', 'Express', 'WebSocket', 'Tailwind', 'MongoDB'],
        githubUrl: 'https://github.com/example/devpulse-workspace',
        liveUrl: 'https://devpulse.example.com',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        featured: true,
        order: 2,
      },
      {
        title: 'HyperScale Distributed Queue & Cache',
        summary: 'High-throughput async job processor and caching layer built for microservices.',
        description: 'Engineered an asynchronous task queuing service with Redis persistence, automatic retry mechanisms, exponential backoff, rate limiting, and an admin telemetry dashboard.',
        category: 'Backend',
        techStack: ['Node.js', 'Express', 'Redis', 'Docker', 'Jest', 'TypeScript'],
        githubUrl: 'https://github.com/example/hyperscale-queue',
        liveUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        featured: true,
        order: 3,
      },
      {
        title: 'Aura UI - Accessible Design System',
        summary: 'Comprehensive accessible React component library with WCAG 2.1 AA compliance.',
        description: 'Created 45+ modular, fully accessible, themeable UI components featuring dark mode toggle, keyboard navigation, fluid animations, and comprehensive Storybook documentation.',
        category: 'Frontend',
        techStack: ['React', 'TypeScript', 'CSS Modules', 'Storybook', 'Framer Motion'],
        githubUrl: 'https://github.com/example/aura-design-system',
        liveUrl: 'https://aura-ui.example.com',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        featured: false,
        order: 4,
      },
      {
        title: 'CognitiveDoc AI Intelligence Engine',
        summary: 'Semantic search and document synthesis utilizing vector embeddings and LLM APIs.',
        description: 'Document intelligence assistant that chunks, embeds, and indexes technical PDF repositories for natural language question answering and automated code generation.',
        category: 'Mobile/AI',
        techStack: ['Python', 'FastAPI', 'Node.js', 'LangChain', 'React', 'MongoDB'],
        githubUrl: 'https://github.com/example/cognitivedoc-ai',
        liveUrl: 'https://cognitivedoc.example.com',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        featured: true,
        order: 5,
      },
      {
        title: 'SwiftCart Headless Commerce Engine',
        summary: 'High-performance e-commerce platform with sub-second page transitions.',
        description: 'Headless storefront with dynamic cart calculations, Stripe payments integration, inventory webhooks, and an optimized mobile shopping experience.',
        category: 'Full Stack',
        techStack: ['React', 'Express', 'MongoDB', 'Stripe API', 'Bootstrap 5', 'TypeScript'],
        githubUrl: 'https://github.com/example/swiftcart-headless',
        liveUrl: 'https://swiftcart-demo.example.com',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
        featured: false,
        order: 6,
      },
    ];
    await Project.insertMany(projectsData);

    // 5. Seed Experience / Internships
    const experiencesData = [
      {
        companyName: 'Vanguard Systems',
        role: 'Senior Software Engineering Intern',
        duration: 'Jun 2024 - Present',
        description: 'Designed high-throughput distributed microservices, improved API response times by 38%, and spearheaded containerization workflows across the platform.',
        certificateUrl: 'https://example.com/certificate-vanguard.pdf',
        order: 1,
      },
      {
        companyName: 'Apex Cloud Solutions',
        role: 'Full-Stack Developer Intern',
        duration: 'Jan 2023 - May 2024',
        description: 'Developed scalable client-facing web applications and RESTful APIs using React, Node.js, and MongoDB. Collaborated closely with engineering squads to deliver core features.',
        certificateUrl: 'https://example.com/certificate-apex.pdf',
        order: 2,
      },
      {
        companyName: 'NextGen Digital Lab',
        role: 'Frontend Engineering Intern',
        duration: 'May 2022 - Dec 2022',
        description: 'Built interactive dashboard interfaces, authored reusable component modules, and integrated backend telemetry endpoints.',
        certificateUrl: '',
        order: 3,
      },
    ];
    await Experience.insertMany(experiencesData);

    // 6. Seed Education
    const educationsData = [
      {
        collegeName: 'Stanford University / UC Berkeley',
        degree: 'Bachelor of Technology / B.S.',
        department: 'Computer Science & Engineering',
        year: '2021 - 2025',
        cgpa: '9.2 / 10.0',
        description: 'Relevant Coursework: Data Structures, Distributed Computing, Cloud Architecture, Algorithms, Database Management Systems, Web Technologies.',
        order: 1,
      },
      {
        collegeName: 'National Higher Secondary Academy',
        degree: 'Higher Secondary Certificate (HSC)',
        department: 'Science & Mathematics',
        year: '2019 - 2021',
        cgpa: '95.6%',
        description: 'Graduated with Distinction in Mathematics, Physics, and Computer Science.',
        order: 2,
      },
    ];
    await Education.insertMany(educationsData);

    // 6. Seed Sample Messages
    const sampleMessages = [
      {
        name: 'Sarah Jenkins',
        email: 'sarah.j@techventures.io',
        subject: 'Senior Full Stack Role Opportunity',
        message: 'Hi Prasheeth, I was really impressed by your cloud analytics project and would love to chat regarding an engineering position on our team!',
        isRead: false,
      },
      {
        name: 'David Chen',
        email: 'd.chen@startupstudio.com',
        subject: 'Consulting Inquiry for SaaS MVP',
        message: 'Hello Prasheeth! We are building an enterprise developer tool and looking for a seasoned full stack consultant for architectural advice. Let us know your availability.',
        isRead: true,
      },
    ];
    await Message.insertMany(sampleMessages);

    console.log('Database seeded successfully with sample portfolio data.');
  } catch (error) {
    console.error('Error during database seed:', error);
  }
};

// If run directly via CLI
if (process.argv[1]?.includes('seed')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await disconnectDB();
    process.exit(0);
  })();
}
