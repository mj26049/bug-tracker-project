export const sampleUsers = [
  
];

export const sampleBugs = [
  {
    id: '1',
    title: 'Login button not working on mobile',
    description: 'Users are unable to click the login button when accessing the site on mobile devices.',
    status: 'open',
    priority: 'high',
    createdBy: '2',
    assignedTo: '1',
    createdAt: '2025-09-15 10:00:00',
    updatedAt: '2025-09-15 10:00:00',
    type: 'bug',
    environment: 'production',
    version: '1.0.0',
  },
  {
    id: '2',
    title: 'Dashboard loading slowly',
    description: 'The dashboard takes more than 5 seconds to load on the production environment.',
    status: 'in-progress',
    priority: 'medium',
    createdBy: '1',
    assignedTo: '3',
    createdAt: '2025-09-14 15:30:00',
    updatedAt: '2025-09-16 09:15:00',
    type: 'performance',
    environment: 'production',
    version: '1.0.0',
  },
  {
    id: '3',
    title: 'Profile picture upload failing',
    description: 'Users are getting an error when trying to upload profile pictures larger than 1MB.',
    status: 'resolved',
    priority: 'low',
    createdBy: '3',
    assignedTo: '2',
    createdAt: '2025-09-13 11:45:00',
    updatedAt: '2025-09-15 16:20:00',
    type: 'bug',
    environment: 'development',
    version: '1.1.0-beta',
  },
];

export const bugPriorities = ['low', 'medium', 'high', 'critical'];
export const bugStatuses = ['open', 'in-progress', 'resolved', 'completed', 'closed'];
export const bugTypes = ['bug', 'feature', 'performance', 'security'];