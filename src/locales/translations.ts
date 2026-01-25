import { Language } from '../services/languageService'

export interface Translations {
  // Header Navigation
  profile: string
  projects: string
  contact: string
  skills: string
  info: string
  portfolioTitle: string

  // Profile Section
  developerLevel: string
  yearsOfExperience: string
  repositories: string
  followers: string
  totalStars: string
  achievements: string
  workStatus: string
  profileDescription: string

  // Sections
  recentActivity: string
  contributions: string
  viewAllActivity: string
  featuredProjects: string
  achievementShowcase: string
  personalHobbies: string
  technicalSkills: string
  connectWithMe: string
  githubFollowers: string

  // Buttons
  viewResume: string
  viewAll: string
  sendMessage: string

  // Stats
  level: string
  developer: string

  // Common
  loading: string
  more: string
  less: string

  // Modal tabs
  allTab: string
  unlockedTab: string
  lockedTab: string

  // Footer
  footerQuickLinks: string
  footerAbout: string
  footerTagline: string
  footerCopyright: string
  footerMadeWith: string

  // GitHub Replay
  replayTitle: string
  replayLoading: string
  replayError: string
  replayOverviewTitle: string
  replayOverviewCommits: string
  replayOverviewMostActiveMonth: string
  replayOverviewLongestStreak: string
  replayOverviewDaysCoded: string
  replayLanguageTitle: string
  replayLanguageSubtitle: string
  replayImpactTitle: string
  replayImpactStarsEarned: string
  replayImpactForks: string
  replayImpactReposCreated: string
  replayImpactTopRepo: string
  replayProductivityTitle: string
  replayProductivityMostProductiveDay: string
  replayProductivityPeakHour: string
  replayProductivityNightOwl: string
  replayProductivityWeekendWarrior: string
  replayCollaborationTitle: string
  replayCollaborationPrsCreated: string
  replayCollaborationPrsMerged: string
  replayCollaborationIssuesClosed: string
  replayCollaborationTopCollabRepo: string
  replayGrowthTitle: string
  replayGrowthFollowers: string
  replayGrowthTotalRepos: string
  replayGrowthContributionGraph: string
  replayGrowthFooter: string
}

export const translations: Record<Language, Translations> = {
  english: {
    profile: 'Profile',
    projects: 'Projects',
    contact: 'Contact',
    skills: 'Skills',
    info: 'Info',
    portfolioTitle: "Krishna'S PORTFOLIO",

    developerLevel: 'Developer Level',
    yearsOfExperience: 'Years of Experience',
    repositories: 'Repositories',
    followers: 'Followers',
    totalStars: 'Total Stars',
    achievements: 'Achievements',
    workStatus: 'looking for work',
    profileDescription: "Just your average developer from the Pachora -- I'm passionate about turning innovative ideas into real, working solutions and love approaching challenges from a fresh perspective. Off the clock, I'm just a chill guy who enjoys learning, building, and improving things.",

    recentActivity: 'Recent Activity',
    contributions: 'contributions in last 12 weeks',
    viewAllActivity: 'View all activity on GitHub',
    featuredProjects: 'Featured Projects',
    achievementShowcase: 'Achievement Showcase',
    personalHobbies: 'Personal Hobbies & Interests',
    technicalSkills: 'Technical Skills',
    connectWithMe: 'Connect With Me',
    githubFollowers: 'GitHub Followers',

    viewResume: 'View Resume',
    viewAll: 'View All',
    sendMessage: 'Send Message',

    level: 'Level',
    developer: 'Developer',

    loading: 'Loading...',
    more: 'More',
    less: 'Less',

    allTab: 'All',
    unlockedTab: 'Unlocked',
    lockedTab: 'Locked',

    footerQuickLinks: 'Quick Links',
    footerAbout: 'About',
    footerTagline: 'Steam-inspired portfolio showcasing projects and achievements',
    footerCopyright: '© 2025 Krishna Patil. All rights reserved.',
    footerMadeWith: 'Made with my Steam profile inspiration',

    replayTitle: 'GitHub Replay',
    replayLoading: 'Loading your replay...',
    replayError: 'Unable to load replay stats',
    replayOverviewTitle: 'Your Year in Code',
    replayOverviewCommits: 'Total Commits',
    replayOverviewMostActiveMonth: 'Most Active Month',
    replayOverviewLongestStreak: 'Longest Streak',
    replayOverviewDaysCoded: 'Days Coded',
    replayLanguageTitle: 'Language Mastery',
    replayLanguageSubtitle: "You're a {language} wizard!",
    replayImpactTitle: 'Your Impact',
    replayImpactStarsEarned: 'Stars Earned',
    replayImpactForks: 'Forks Gained',
    replayImpactReposCreated: 'Repos Created',
    replayImpactTopRepo: 'Top Starred Repository',
    replayProductivityTitle: 'Productivity Patterns',
    replayProductivityMostProductiveDay: 'Most Productive Day',
    replayProductivityPeakHour: 'Peak Coding Hour',
    replayProductivityNightOwl: 'Night Owl',
    replayProductivityWeekendWarrior: 'Weekend Warrior',
    replayCollaborationTitle: 'Collaboration Stats',
    replayCollaborationPrsCreated: 'PRs Created',
    replayCollaborationPrsMerged: 'PRs Merged',
    replayCollaborationIssuesClosed: 'Issues Closed',
    replayCollaborationTopCollabRepo: 'Most Collaborated',
    replayGrowthTitle: 'Your Growth Story',
    replayGrowthFollowers: 'Followers',
    replayGrowthTotalRepos: 'Total Repositories',
    replayGrowthContributionGraph: 'Contribution Heatmap',
    replayGrowthFooter: 'That was your {year} in code!'
  },

  sarcasm: {
    profile: 'Profile (Totally Unique)',
    projects: 'Projects (Revolutionary)',
    contact: 'Contact (I\'ll Respond, Promise)',
    skills: 'Skills (World-Class, Obviously)',
    info: 'Info (Spoilers)',
    portfolioTitle: "KRISHNA'S HUMBLE PORTFOLIO",

    developerLevel: 'Developer Level (Self-Proclaimed)',
    yearsOfExperience: 'Years of Pretending',
    repositories: 'Code Dumps',
    followers: 'Stalkers',
    totalStars: 'Pity Stars',
    achievements: 'Participation Trophies',
    workStatus: 'Definitely not desperate for opportunities',
    profileDescription: "Just another genius from the Philippines (humble brag) -- allegedly leading a team while mostly Googling .NET errors. Wore the Scrum Master hat once, got some PDFs to prove it.\n\nSupposedly passionate about revolutionary ideas (read: copied from StackOverflow) and fresh perspectives (Ctrl+C, Ctrl+V). Off the clock, I'm just a guy pretending to enjoy continuous self-improvement.",

    recentActivity: 'Recent Excuses',
    contributions: 'attempts at productivity',
    viewAllActivity: 'See all my procrastination',
    featuredProjects: 'Featured Experiments',
    achievementShowcase: 'Trophy Case (Empty Soon)',
    personalHobbies: 'Time Wasters & Distractions',
    technicalSkills: 'Things I Googled Once',
    connectWithMe: 'Contact Me (At Your Own Risk)',
    githubFollowers: 'People Who Clicked Wrong',

    viewResume: 'Read My Life Story',
    viewAll: 'See Everything (If You Must)',
    sendMessage: 'Spam Me',

    level: 'Imaginary Level',
    developer: 'Code Monkey',

    loading: 'Pretending to load...',
    more: 'Ugh, More',
    less: 'Thank God, Less',

    allTab: 'Everything (Overwhelming)',
    unlockedTab: 'My Sad Victories',
    lockedTab: 'Future Disappointments',

    footerQuickLinks: 'Quick Links (Like You\'ll Use Them)',
    footerAbout: 'About (My Inflated Ego)',
    footerTagline: 'Yet another portfolio pretending to be unique (Steam-inspired edition)',
    footerCopyright: '© 2025 Krishna Patil. All rights reserved (not that anyone cares).',
    footerMadeWith: 'Built with questionable decisions and Steam copying',

    replayTitle: 'GitHub Replay (Your Annual Highlight Reel)',
    replayLoading: 'Pretending to compile your achievements...',
    replayError: 'Failed to load your mediocre stats',
    replayOverviewTitle: 'Your Year in "Productivity"',
    replayOverviewCommits: 'Code Submissions',
    replayOverviewMostActiveMonth: 'Least Lazy Month',
    replayOverviewLongestStreak: 'Lucky Streak',
    replayOverviewDaysCoded: 'Days Pretending to Work',
    replayLanguageTitle: 'Language "Expertise"',
    replayLanguageSubtitle: "You copy-pasted {language} a lot!",
    replayImpactTitle: 'Your "Impact"',
    replayImpactStarsEarned: 'Pity Stars Collected',
    replayImpactForks: 'Desperate Forks',
    replayImpactReposCreated: 'Repos Abandoned',
    replayImpactTopRepo: 'Least Embarrassing Repo',
    replayProductivityTitle: 'Procrastination Patterns',
    replayProductivityMostProductiveDay: 'Least Unproductive Day',
    replayProductivityPeakHour: 'Deadline Panic Hour',
    replayProductivityNightOwl: 'Insomniac Coder',
    replayProductivityWeekendWarrior: 'No-Life Developer',
    replayCollaborationTitle: 'Social Coding (Kinda)',
    replayCollaborationPrsCreated: 'PRs Thrown Into Void',
    replayCollaborationPrsMerged: 'PRs Actually Accepted',
    replayCollaborationIssuesClosed: 'Problems Swept Under Rug',
    replayCollaborationTopCollabRepo: 'Most Bothered Project',
    replayGrowthTitle: 'Your "Progress"',
    replayGrowthFollowers: 'Random Followers',
    replayGrowthTotalRepos: 'Code Graveyards',
    replayGrowthContributionGraph: 'Green Squares of Shame',
    replayGrowthFooter: 'That was your {year} in "achievement" (sure...)'
  },

  binary: {
    profile: '01010000 01110010 01101111',
    projects: '01010000 01110010 01101111 01101010',
    contact: '01000011 01101111 01101110',
    skills: '01010011 01101011 01101001',
    info: '01001001 01101110 01100110',
    portfolioTitle: '01011010 01011001 01001111 01001110',

    developerLevel: '01000100 01100101 01110110',
    yearsOfExperience: '01011001 01100101 01100001',
    repositories: '01010010 01100101 01110000',
    followers: '01000110 01101111 01101100',
    totalStars: '01010011 01110100 01100001',
    achievements: '01000001 01100011 01101000',
    workStatus: '01001110 01101111 00100000 01110111 01101111 01110010 01101011',
    profileDescription: '01000100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010...',

    recentActivity: '01000001 01100011 01110100',
    contributions: '01100011 01101111 01101110 01110100',
    viewAllActivity: '01110110 01101001 01100101 01110111',
    featuredProjects: '01000110 01100101 01100001 01110100',
    achievementShowcase: '01000001 01100011 01101000 01101001',
    personalHobbies: '01001000 01101111 01100010 01100010',
    technicalSkills: '01010100 01100101 01100011 01101000',
    connectWithMe: '01000011 01101111 01101110 01101110',
    githubFollowers: '01000111 01101001 01110100 01001000',

    viewResume: '01010010 01100101 01110011',
    viewAll: '01000001 01101100 01101100',
    sendMessage: '01001101 01110011 01100111',

    level: '01001100 01110110 01101100',
    developer: '01000100 01100101 01110110',

    loading: '01001100 01101111 01100001 01100100',
    more: '01001101 01101111 01110010 01100101',
    less: '01001100 01100101 01110011 01110011',

    allTab: '01000001 01101100 01101100',
    unlockedTab: '01010101 01101110 01101100',
    lockedTab: '01001100 01101111 01100011 01101011',

    footerQuickLinks: '01010001 01110101 01101001 01100011 01101011',
    footerAbout: '01000001 01100010 01101111 01110101 01110100',
    footerTagline: '01010011 01110100 01100101 01100001 01101101...',
    footerCopyright: '00101110 00101110 00101110',
    footerMadeWith: '01001101 01100001 01100100 01100101',

    replayTitle: '01010010 01100101 01110000 01101100 01100001 01111001',
    replayLoading: '01001100 01101111 01100001 01100100...',
    replayError: '01000101 01110010 01110010 01101111 01110010',
    replayOverviewTitle: '01011001 01100101 01100001 01110010',
    replayOverviewCommits: '01000011 01101111 01101101 01101101',
    replayOverviewMostActiveMonth: '01001101 01101111 01101110 01110100 01101000',
    replayOverviewLongestStreak: '01010011 01110100 01110010 01100101 01100001 01101011',
    replayOverviewDaysCoded: '01000100 01100001 01111001 01110011',
    replayLanguageTitle: '01001100 01100001 01101110 01100111',
    replayLanguageSubtitle: '01010111 01101001 01111010 01100001 01110010 01100100',
    replayImpactTitle: '01001001 01101101 01110000 01100001 01100011 01110100',
    replayImpactStarsEarned: '01010011 01110100 01100001 01110010 01110011',
    replayImpactForks: '01000110 01101111 01110010 01101011 01110011',
    replayImpactReposCreated: '01010010 01100101 01110000 01101111 01110011',
    replayImpactTopRepo: '01010100 01101111 01110000',
    replayProductivityTitle: '01010000 01110010 01101111 01100100',
    replayProductivityMostProductiveDay: '01000100 01100001 01111001',
    replayProductivityPeakHour: '01001000 01101111 01110101 01110010',
    replayProductivityNightOwl: '01001110 01101001 01100111 01101000 01110100',
    replayProductivityWeekendWarrior: '01010111 01100101 01100101 01101011 01100101 01101110 01100100',
    replayCollaborationTitle: '01000011 01101111 01101100 01101100 01100001 01100010',
    replayCollaborationPrsCreated: '01010000 01010010 01110011',
    replayCollaborationPrsMerged: '01001101 01100101 01110010 01100111 01100101 01100100',
    replayCollaborationIssuesClosed: '01001001 01110011 01110011 01110101 01100101 01110011',
    replayCollaborationTopCollabRepo: '01010100 01101111 01110000 01010010 01100101 01110000 01101111',
    replayGrowthTitle: '01000111 01110010 01101111 01110111 01110100 01101000',
    replayGrowthFollowers: '01000110 01101111 01101100 01101100 01101111 01110111',
    replayGrowthTotalRepos: '01010010 01100101 01110000 01101111 01110011',
    replayGrowthContributionGraph: '01001000 01100101 01100001 01110100 01101101 01100001 01110000',
    replayGrowthFooter: '01011001 01100101 01100001 01110010 00100001'
  },

  emoji: {
    profile: '👤',
    projects: '💼',
    contact: '📧',
    skills: '🎯',
    info: 'ℹ️',
    portfolioTitle: '🎨 ZYON 🚀',

    developerLevel: '👨‍💻 📊',
    yearsOfExperience: '📅 ⏳',
    repositories: '📦',
    followers: '👥',
    totalStars: '⭐',
    achievements: '🏆',
    workStatus: '🚫 💼',
    profileDescription: '🇵🇭 👨‍💻 .NET 💻 Scrum Master 📋...',

    recentActivity: '⚡ 📋',
    contributions: '🎯',
    viewAllActivity: '👀 📊',
    featuredProjects: '⭐ 💼',
    achievementShowcase: '🏆 ✨',
    personalHobbies: '🎮 🎨 ⚽',
    technicalSkills: '💻 🛠️',
    connectWithMe: '🤝 📱',
    githubFollowers: '👥 💻',

    viewResume: '📄 👀',
    viewAll: '👀 ✨',
    sendMessage: '📨 ✉️',

    level: '📈',
    developer: '👨‍💻',

    loading: '⏳...',
    more: '➕',
    less: '➖',

    allTab: '📊',
    unlockedTab: '✅',
    lockedTab: '🔒',

    footerQuickLinks: '⚡ 🔗',
    footerAbout: 'ℹ️ 👨‍💻',
    footerTagline: '🎮 💻 🎨 ⭐',
    footerCopyright: '© 2025 👨‍💻 ✨',
    footerMadeWith: '❤️ 🎮',

    replayTitle: '🎮 🔄 📊',
    replayLoading: '⏳ 📊...',
    replayError: '❌ 📊',
    replayOverviewTitle: '📅 💻 🎯',
    replayOverviewCommits: '📝 ✅',
    replayOverviewMostActiveMonth: '🔥 📅',
    replayOverviewLongestStreak: '🏃 🔥',
    replayOverviewDaysCoded: '📆 💻',
    replayLanguageTitle: '💻 🎯',
    replayLanguageSubtitle: '🧙 {language} ⭐',
    replayImpactTitle: '💥 📊',
    replayImpactStarsEarned: '⭐ 📈',
    replayImpactForks: '🍴 📈',
    replayImpactReposCreated: '📦 ➕',
    replayImpactTopRepo: '🏆 📦',
    replayProductivityTitle: '⏰ 📊',
    replayProductivityMostProductiveDay: '🔥 📅',
    replayProductivityPeakHour: '⏰ 🎯',
    replayProductivityNightOwl: '🌙 🦉',
    replayProductivityWeekendWarrior: '🏖️ ⚔️',
    replayCollaborationTitle: '🤝 📊',
    replayCollaborationPrsCreated: '🔀 ➕',
    replayCollaborationPrsMerged: '✅ 🔀',
    replayCollaborationIssuesClosed: '✅ 🐛',
    replayCollaborationTopCollabRepo: '🏆 🤝',
    replayGrowthTitle: '📈 🌟',
    replayGrowthFollowers: '👥 📈',
    replayGrowthTotalRepos: '📦 📊',
    replayGrowthContributionGraph: '🟩 📊',
    replayGrowthFooter: '🎉 {year} 💻 ✨'
  },

  lorem: {
    profile: 'Profile',
    projects: 'Projects',
    contact: 'Contact',
    skills: 'Skills',
    info: 'Information',
    portfolioTitle: 'PORTFOLIO',

    developerLevel: 'Developer Level',
    yearsOfExperience: 'Years of Experience',
    repositories: 'Repositories',
    followers: 'Followers',
    totalStars: 'Total Stars',
    achievements: 'Achievements',
    workStatus: 'Looking for Work',
    profileDescription:
      'A passionate developer focused on creating quality software solutions. Continuously learning, improving skills, and building meaningful projects.',

    recentActivity: 'Recent Activity',
    contributions: 'Contributions',
    viewAllActivity: 'View All Activity',
    featuredProjects: 'Featured Projects',
    achievementShowcase: 'Achievement Showcase',
    personalHobbies: 'Personal Interests',
    technicalSkills: 'Technical Skills',
    connectWithMe: 'Connect With Me',
    githubFollowers: 'GitHub Followers',

    viewResume: 'View Resume',
    viewAll: 'View All',
    sendMessage: 'Send Message',

    level: 'Level',
    developer: 'Developer',

    loading: 'Loading...',
    more: 'More',
    less: 'Less',

    allTab: 'All',
    unlockedTab: 'Unlocked',
    lockedTab: 'Locked',

    footerQuickLinks: 'Quick Links',
    footerAbout: 'About',
    footerTagline: 'A portfolio showcasing projects and achievements',
    footerCopyright:
      '© 2025 Krishna Chandrakant Patil. All rights reserved.',
    footerMadeWith: 'Made with inspiration from Steam',

    replayTitle: 'Code Replay',
    replayLoading: 'Loading data...',
    replayError: 'An error occurred while loading data',
    replayOverviewTitle: 'Year in Code',
    replayOverviewCommits: 'Total Commits',
    replayOverviewMostActiveMonth: 'Most Active Month',
    replayOverviewLongestStreak: 'Longest Streak',
    replayOverviewDaysCoded: 'Days Coded',
    replayLanguageTitle: 'Top Language',
    replayLanguageSubtitle: 'You are a master of {language}!',
    replayImpactTitle: 'Your Impact',
    replayImpactStarsEarned: 'Stars Earned',
    replayImpactForks: 'Forks Earned',
    replayImpactReposCreated: 'Repositories Created',
    replayImpactTopRepo: 'Top Repository',
    replayProductivityTitle: 'Productivity Patterns',
    replayProductivityMostProductiveDay: 'Most Productive Day',
    replayProductivityPeakHour: 'Peak Hour',
    replayProductivityNightOwl: 'Night Coder',
    replayProductivityWeekendWarrior: 'Weekend Warrior',
    replayCollaborationTitle: 'Collaboration Statistics',
    replayCollaborationPrsCreated: 'Pull Requests Created',
    replayCollaborationPrsMerged: 'Pull Requests Merged',
    replayCollaborationIssuesClosed: 'Issues Closed',
    replayCollaborationTopCollabRepo: 'Most Collaborated Repository',
    replayGrowthTitle: 'Growth History',
    replayGrowthFollowers: 'Followers',
    replayGrowthTotalRepos: 'Total Repositories',
    replayGrowthContributionGraph: 'Contribution Map',
    replayGrowthFooter: 'This was your {year} in code!'
  },

  youngStunnah: {
    profile: 'Awesome Profile',
    projects: 'High-Impact Projects',
    contact: 'Let’s Talk',
    skills: 'Cool Skills',
    info: 'Details',
    portfolioTitle: 'ZYON’S PORTFOLIO',

    developerLevel: 'Top Developer Level',
    yearsOfExperience: 'Years of Solid Experience',
    repositories: 'Code Sessions',
    followers: 'Crew',
    totalStars: 'Strong Stars',
    achievements: 'Showcase Badges',
    workStatus: 'Not actively job hunting (staying chill)',
    profileDescription:
      'A simple developer from the Jalgoan — Passionate about innovation and building real-world solutions. Off-duty time is spent learning new technologies, improving skills, and staying sharp.',

    recentActivity: 'Latest Work',
    contributions: 'Power Moves',
    viewAllActivity: 'View Everything on GitHub',
    featuredProjects: 'Top Favorite Projects',
    achievementShowcase: 'Flex Wall',
    personalHobbies: 'Relaxing and Chilling',
    technicalSkills: 'Technical Skills',
    connectWithMe: 'Let’s Connect',
    githubFollowers: 'GitHub Followers',

    viewResume: 'Read Resume',
    viewAll: 'View Everything',
    sendMessage: 'Send a Message',

    level: 'Level',
    developer: 'Lead Developer',

    loading: 'Please wait...',
    more: 'More',
    less: 'Enough',

    allTab: 'All',
    unlockedTab: 'Unlocked',
    lockedTab: 'Locked',

    footerQuickLinks: 'Quick Links',
    footerAbout: 'About',
    footerTagline:
      'A Steam-inspired portfolio to showcase projects and achievements',
    footerCopyright:
      '© 2025 Krishna Chandrakant Patil. All rights reserved.',
    footerMadeWith: 'Built using Steam-inspired vibes',

    replayTitle: 'My GitHub Replay',
    replayLoading: 'Fetching your data...',
    replayError: 'Failed to load stats',
    replayOverviewTitle: 'Your Coding Year',
    replayOverviewCommits: 'Total Commits',
    replayOverviewMostActiveMonth: 'Most Active Month',
    replayOverviewLongestStreak: 'Longest Streak',
    replayOverviewDaysCoded: 'Days Coded',
    replayLanguageTitle: 'Language Expertise',
    replayLanguageSubtitle: 'You truly mastered {language}!',
    replayImpactTitle: 'Your Impact',
    replayImpactStarsEarned: 'Stars Earned',
    replayImpactForks: 'Forks Earned',
    replayImpactReposCreated: 'Repositories Created',
    replayImpactTopRepo: 'Top Starred Repository',
    replayProductivityTitle: 'Productivity Habits',
    replayProductivityMostProductiveDay: 'Most Productive Day',
    replayProductivityPeakHour: 'Peak Coding Hour',
    replayProductivityNightOwl: 'Late-Night Coder',
    replayProductivityWeekendWarrior: 'Weekend Grinder',
    replayCollaborationTitle: 'Collaboration Stats',
    replayCollaborationPrsCreated: 'Pull Requests Created',
    replayCollaborationPrsMerged: 'Pull Requests Merged',
    replayCollaborationIssuesClosed: 'Issues Closed',
    replayCollaborationTopCollabRepo: 'Top Collaboration Repository',
    replayGrowthTitle: 'Your Growth Story',
    replayGrowthFollowers: 'Followers',
    replayGrowthTotalRepos: 'Total Repositories',
    replayGrowthContributionGraph: 'Contribution Heatmap',
    replayGrowthFooter: 'That was your {year} in coding!'
  }
}
export function getTranslation(language: Language): Translations {
  return translations[language] || translations.english
}
