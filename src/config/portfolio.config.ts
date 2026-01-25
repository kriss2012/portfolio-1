import { PortfolioConfig } from '../types'

/**
 * Portfolio Configuration
 * Customized for Krishna Patil
 */

export const portfolioConfig: PortfolioConfig = {
  // Personal Information
  personal: {
    name: 'Krishna Patil',
    title: 'Python Developer | AI & ML Engineer | Web Developer',
    location: 'Pachora, Maharashtra, India',
    bio: 'Results-driven BCA student specializing in Artificial Intelligence, Machine Learning, and full-stack development. Passionate about building scalable, data-driven, real-world solutions.',
    email: '202krishnapatil@gmail.com',
    phone: '+91 9850159631',
    birthday: '2006-02-20',
    banner: '/profile-background.jpg',
    resumeUrl: '/resume.pdf',
    avatar: '/profile-avatar.gif',
  },

  // Social Media Links
  social: {
    github: 'kriss2012',
    linkedin: 'https://www.linkedin.com/in/krishna-patil-33969536b/',
    twitter: undefined,
    website: undefined,
  },

  // Current Work Status
  workStatus: {
    status: 'available', // 'available' | 'employed' | 'away' | 'busy'
    message: 'Open to Internships & Entry-Level Roles',
  },

  // Featured Projects
  featuredProjects: [
    {
      repo: 'Fake-Reviews-Identification-System',
      demoUrl: '#',
      featured: true,
    },
    {
      repo: 'AI-Medical-Consultancy-System',
      demoUrl: '#',
      featured: true,
    },
    {
      repo: 'AI-Desktop-Assistant-Kirito',
      demoUrl: '#',
      featured: true,
    },
  ],

  // Achievements & Awards
  achievements: [
    {
      id: 1,
      title: 'Shark Tank Winner',
      description: '1st Prize – Innovation Competition',
      icon: '🏆',
      year: 2025,
      unlocked: true,
      rarity: 'legendary',
    },
    {
      id: 2,
      title: 'Shark Tank Runner-Up',
      description: '2nd Prize – Startup Pitch Event',
      icon: '🥈',
      year: 2024,
      unlocked: true,
      rarity: 'epic',
    },
    {
      id: 3,
      title: 'AI & Machine Learning Internship',
      description: 'iBase Electrosoft LLP (150 Hours)',
      icon: '🤖',
      year: 2025,
      unlocked: true,
      rarity: 'epic',
    },
    {
      id: 4,
      title: '95% ML Model Accuracy',
      description: 'Fake Reviews Detection System',
      icon: '📊',
      year: 2025,
      unlocked: true,
      rarity: 'rare',
    },
  ],

  // Personal Hobbies & Interests
  hobbies: [
    {
      id: 1,
      title: 'AI Experimentation',
      description: 'Building and testing machine learning and NLP models',
      icon: '🧠',
    },
    {
      id: 2,
      title: 'Problem Solving',
      description: 'Enjoy solving real-world problems using data and code',
      icon: '🧩',
    },
    {
      id: 3,
      title: 'Tech Learning',
      description: 'Continuously learning new technologies and frameworks',
      icon: '📚',
    },
    {
      id: 4,
      title: 'Hackathons & Competitions',
      description: 'Participating in innovation challenges and startup events',
      icon: '🚀',
    },
  ],

  // Technical Skills
  technicalSkills: {
    'Programming Languages': [
      'Python',
      'Java',
      'C++',
      'JavaScript',
    ],
    'Web & Backend': [
      'Django',
      'Flask',
      'React',
      'Node.js',
      'REST APIs',
    ],
    'AI / Machine Learning': [
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'Natural Language Processing (NLP)',
      'Computer Vision',
      'Generative AI',
    ],
    'Databases': [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
    ],
    'Cloud & DevOps': [
      'AWS',
      'Azure',
      'Google Cloud Platform',
      'Docker',
      'Kubernetes',
      'Git',
      'CI/CD',
    ],
    'Concepts & Practices': [
      'MLOps',
      'Agile / Scrum',
      'Linux',
      'Model Deployment',
      'System Design',
    ],
  },

  // Display Settings
  showTestimonials: false,
  showAllRepos: false,
}

// Helper function to calculate years of experience
export const getYearsOfExperience = (): number => {
  const startYear = 2024 // active development start
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}

// Helper function to get work status display
export const getWorkStatusConfig = (status: string) => {
  const statusConfig = {
    available: {
      badge: 'online',
      text: 'Open to Work',
      color: '#a4d007',
    },
    employed: {
      badge: 'busy',
      text: 'Currently Employed',
      color: '#f39c12',
    },
    away: {
      badge: 'away',
      text: 'Away',
      color: '#95a5a6',
    },
    busy: {
      badge: 'busy',
      text: 'Busy',
      color: '#e74c3c',
    },
  }

  return statusConfig[status as keyof typeof statusConfig] || statusConfig.away
}

// Helper function to calculate age
export const getAge = (): number => {
  if (!portfolioConfig.personal.birthday) return 0

  const birthday = new Date(portfolioConfig.personal.birthday)
  const today = new Date()

  let age = today.getFullYear() - birthday.getFullYear()
  const monthDiff = today.getMonth() - birthday.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--
  }

  return age
}

export default portfolioConfig
