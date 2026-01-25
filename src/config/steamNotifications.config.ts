export interface SteamNotification {
  id: string
  type: 'friend-online' | 'playing' | 'invite' | 'achievement' | 'trade' | 'message'
  avatar?: string
  name: string
  message: string
  action?: string
}

export const steamNotifications: SteamNotification[] = [
  // Friends & Dev Circle
  {
    id: 'krishna-online',
    type: 'friend-online',
    name: 'Krishna Patil',
    message: 'is now online',
    avatar: '/profile-avatar.gif',
  },
  {
    id: 'teammate-online',
    type: 'friend-online',
    name: 'Hackathon Teammate',
    message: 'is now online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teammate',
  },

  // Playing (Dev Mode)
  {
    id: 'krishna-coding',
    type: 'playing',
    name: 'Krishna Patil',
    message: 'is now coding',
    action: 'AI & ML Models',
    avatar: '/profile-avatar.gif',
  },
  {
    id: 'python-playing',
    type: 'playing',
    name: 'Python',
    message: 'is now running',
    action: 'Machine Learning Pipeline',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Python',
  },
  {
    id: 'docker-playing',
    type: 'playing',
    name: 'Docker',
    message: 'is now running',
    action: 'Containerized Application',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Docker',
  },

  // Invites
  {
    id: 'hackathon-invite',
    type: 'invite',
    name: 'Hackathon Organizer',
    message: 'has invited you to',
    action: '24-Hour AI Hackathon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hackathon',
  },
  {
    id: 'internship-invite',
    type: 'invite',
    name: 'Startup Recruiter',
    message: 'has invited you to',
    action: 'AI/ML Internship Interview',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Recruiter',
  },

  // Achievements (Real You)
  {
    id: 'sharktank-win',
    type: 'achievement',
    name: 'Krishna Patil',
    message: 'unlocked achievement:',
    action: 'Shark Tank Winner 🏆',
    avatar: '/profile-avatar.gif',
  },
  {
    id: 'ml-achievement',
    type: 'achievement',
    name: 'AI System',
    message: 'unlocked achievement:',
    action: '95% Model Accuracy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AI',
  },

  // Messages
  {
    id: 'github-message',
    type: 'message',
    name: 'GitHub',
    message: 'sent you a message:',
    action: '"Your repo just got starred ⭐"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GitHub',
  },
  {
    id: 'mentor-message',
    type: 'message',
    name: 'Mentor',
    message: 'sent you a message:',
    action: '"Great progress on your ML project!"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mentor',
  },

  // Trade (Dev Humor)
  {
    id: 'coffee-trade',
    type: 'trade',
    name: 'Late Night Coding',
    message: 'wants to trade',
    action: 'sleep for clean code',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coffee',
  },
  {
    id: 'bug-trade',
    type: 'trade',
    name: 'Production Bug',
    message: 'wants to trade',
    action: 'peace for chaos',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bug',
  },
]

// Get random notification
export const getRandomNotification = (): SteamNotification => {
  const randomIndex = Math.floor(Math.random() * steamNotifications.length)
  return steamNotifications[randomIndex]
}
