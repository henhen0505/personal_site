// Single source of truth for everything on the site that isn't a project page.
//
// Rule for this file: nothing goes in that isn't on the resume or the transcript.
// If a claim can't be checked, it doesn't ship.

export const site = {
  name: 'Henry Yu',
  tagline: 'I build and test backend systems for financial data and LLM pipelines.',
  location: 'New York, NY',
  email: 'henryyu0505@gmail.com',
  linkedin: 'https://www.linkedin.com/in/henryyu0505/',
  github: 'https://github.com/henhen0505',
  resume: '/resume.pdf',
};

export const education = {
  school: 'Stony Brook University',
  location: 'Stony Brook, NY',
  graduation: 'May 2027',
  degrees: [
    'B.S. Computer Science, focus in Algorithms and Systems',
    'B.S. Applied Mathematics and Statistics, concentration in Probability and Optimization',
  ],
  honors: "Dean's List, Fall 2023 and Fall 2025",
  coursework: [
    'Analysis of Algorithms (Honors)',
    'Data Structures (Honors)',
    'Systems Fundamentals I',
    'Computer Networks',
    'Theory of Computation (Honors)',
    'Software Development',
    'Probability Theory',
    'Mathematical Statistics',
    'Data Analysis',
    'Data Mining',
    'Quantitative Finance',
    'Machine Learning',
    'Applied Linear Algebra',
    'Operations Research I',
    'Applied Algebra',
  ],
  inProgress: [
    'Systems Fundamentals II',
    'Introduction to Data Science',
    'Statistics for Data Science',
    'Time Series Analysis',
    'Operations Research II: Stochastic Models',
    'Undergraduate Teaching Practicum',
  ],
};

export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  upcoming?: boolean;
  bullets: string[];
}

export const experience: Role[] = [
  {
    company: 'ReWild Long Island',
    title: 'Software Engineer, Dev Team',
    period: 'August 2026 – Present',
    location: 'Long Island, NY',
    bullets: [
      'Architected and containerized a full-stack backend (FastAPI, PostgreSQL 16, pgvector) with Docker Compose and Alembic migrations; designed an 11-table schema with composite keys, custom enums, and a many-to-many crosswalk for 100+ Long Island communities.',
    ],
  },
  {
    company: 'Stony Brook University',
    title: 'Undergraduate Teaching Assistant',
    period: 'August 2026 – Present',
    location: 'Stony Brook, NY',
    bullets: [
      'CSE 260: Honors Data Structures and Programming Abstractions. Run lab sections for ~80 students, guiding implementation and analysis of data structures and programming abstractions.',
    ],
  },
  {
    company: 'BetterTherapy',
    title: 'Software Engineering Intern',
    period: 'May – August 2025',
    location: 'New York, NY',
    bullets: [
      'Designed a SQLAlchemy data layer over SQLite for an automated LLM evaluation pipeline: schema with a reusable timestamp mixin, cascading request/response relationships and a session decorator.',
      'Wrote atomic upserts (ON CONFLICT DO UPDATE) for a node blacklist, incrementing violation counts on the SQL side so concurrent writes stay correct.',
      'Avoided N+1 round trips with selectinload eager loading, added bulk inserts and polled the OpenAI Batch API on 24-hour windows.',
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Go', 'SQL', 'R', 'Java', 'C', 'C++', 'Bash', 'HTML/CSS'],
  },
  {
    group: 'Web',
    items: ['React', 'Node.js', 'Express', 'Django', 'FastAPI', 'Astro', 'REST APIs', 'JWT auth'],
  },
  {
    group: 'Data & storage',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'SQLAlchemy', 'Sequelize', 'Mongoose'],
  },
  {
    group: 'Libraries',
    items: ['pandas', 'NumPy', 'SciPy', 'statsmodels', 'matplotlib', 'Pydantic', 'PyTorch/TensorFlow'],
  },
  {
    group: 'AI & LLM',
    items: ['Anthropic Claude API', 'OpenAI Batch API', 'RAG', 'Schema-validated model output'],
  },
  {
    group: 'Testing & tooling',
    items: ['pytest', 'Vitest', 'GoogleTest', 'Git', 'Linux', 'eBPF', 'Docker', 'Kubernetes', 'AWS', 'Vercel', 'CI/CD', 'LaTeX'],
  },
  {
    group: 'Concepts',
    items: [
      'Data structures & algorithms',
      'System design',
      'API design',
      'Full-stack web development',
      'Event-driven architecture',
      'Concurrency',
      'Probability & statistics',
      'Regression modeling',
      'Options pricing (Black-Scholes, SSVI)',
      'Monte Carlo simulation',
    ],
  },
];
