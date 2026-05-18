// Resume data – single source of truth for the entire portfolio

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
}

export interface ProfileData {
  summary: string;
}

export interface SkillItem {
  id: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  score: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Prasanna G',
  role: 'Software Developer Engineer 1',
  location: 'Trichy, India',
  phone: '9790261696',
  email: 'prasanakithiyon53@gmail.com',
  dateOfBirth: '30/06/2002',
  nationality: 'Indian',
};

export const profileData: ProfileData = {
  summary:
    'Results-driven Software Developer Engineer 1 with one year of professional experience at Calibraint Technologies, specializing in modern web development and full-stack software architectures. Expert in crafting responsive frontend experiences using React alongside robust backend systems with NestJS, Node.js, and databases (MongoDB, MySQL). Skilled in utilizing AI-assisted development tools and strict spec-driven methodologies to optimize delivery speed while keeping high standards of code efficiency, testability, and full software development life cycle (SDLC) best practices.',
};

export const skills: SkillItem[] = [
  { id: 'skill-1', label: 'Full-Stack Web Development' },
  { id: 'skill-2', label: 'Full Software Development Life Cycle (SDLC)' },
  { id: 'skill-3', label: 'AI-assisted & Spec-driven Development' },
  { id: 'skill-4', label: 'Database Design & Query Optimization' },
  { id: 'skill-5', label: 'Clean Code & SOLID Design Principles' },
  { id: 'skill-6', label: 'Cross-functional Team Collaboration' },
];

export const techSkills: SkillItem[] = [
  { id: 'tech-1', label: 'React' },
  { id: 'tech-2', label: 'TypeScript' },
  { id: 'tech-3', label: 'NestJS' },
  { id: 'tech-4', label: 'MongoDB' },
  { id: 'tech-5', label: 'MySQL' },
  { id: 'tech-6', label: 'Supabase' },
  { id: 'tech-7', label: 'Node.js' },
  { id: 'tech-8', label: 'RESTful API Design' }
];

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Developer Engineer 1',
    company: 'Calibraint Technologies Pvt. Ltd.',
    duration: 'JUL 2025 – Present',
    description:
      'Engineered and optimized high-performance web applications, improving client retention and user engagement by 22%. Participated actively in all phases of the Full Software Development Life Cycle (SDLC), delivering project milestones 15% ahead of deadlines. Leveraged AI-assisted development and spec-driven protocols to accelerate scaffolding cycles while keeping codebase test coverage above 90%. Collaborated closely with product managers and frontend/backend engineers to analyze, refactor, and streamline software workflows.',
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Casaperks Website',
    description:
      'A multi-tenant apartment rent reward platform that drives tenant loyalty and on-time rent transactions. Built highly interactive React components for the resident portal and engineered high-throughput NestJS APIs with schema validation and optimized MongoDB aggregations, increasing transactional processing speed by 35%.',
    techStack: ['React', 'NestJS', 'MongoDB'],
  },
  {
    id: 'proj-2',
    name: 'Maxistime',
    description:
      'An enterprise-grade employee time-tracking and organizational log platform with Role-Based Access Control (RBAC). Developed high-security NestJS REST endpoints, constructed relational MySQL database models with indexing optimizations, and designed custom time-logging components in React to support automated payroll processing.',
    techStack: ['React', 'NestJS', 'MySQL'],
  },
  {
    id: 'proj-3',
    name: 'Footballu',
    description:
      'An American football match simulation engine using a serverless backend. Programmed high-efficiency game simulation algorithms within PostgreSQL RPC database functions, and leveraged Supabase real-time triggers to keep player match metrics synchronized across active user client sessions.',
    techStack: ['Supabase', 'RPC Functions'],
  },
];

export const education: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Information Technology',
    institution: 'Erode Sengunthar Engineering College',
    duration: 'APR 2022 – APR 2025',
    score: 'CGPA of 7.9 / 10',
  },
  {
    id: 'edu-2',
    degree: 'HSC (Higher Secondary Certificate)',
    institution: 'Government Boys Higher Secondary School, Perundurai',
    duration: 'JUN 2020 – JUN 2021',
    score: '87%',
  },
  {
    id: 'edu-3',
    degree: 'SSLC (Secondary School Leaving Certificate)',
    institution: 'Government Boys Higher Secondary School, Perundurai',
    duration: 'JUN 2018 – JUN 2019',
    score: '82%',
  },
];

export const interests: string[] = [
  'Web Development',
  'AI Spec-driven Development',
  'Code optimization',
];

export const socials = {
  linkedin: 'https://www.linkedin.com/in/prasanna-g07',
  github: 'https://github.com/prasannaG300618',
};
