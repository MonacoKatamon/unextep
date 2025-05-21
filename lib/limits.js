// Define subscription tier limits and features
export const SUBSCRIPTION_LIMITS = {
  FREE: {
    maxFileSize: 5 * 1024 * 1024, // 5MB per file
    totalStorage: 500 * 1024 * 1024, // 500MB total storage
    maxProjects: 3,
    apiCallsPerMonth: 1000,
    fileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'txt'],
  },
  PRO: {
    maxFileSize: 100 * 1024 * 1024, // 100MB per file
    totalStorage: 10 * 1024 * 1024 * 1024, // 10GB total storage
    maxProjects: Infinity,
    apiCallsPerMonth: Infinity,
    fileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'txt', 'psd', 'ai', 'xd', 'sketch', 'zip', 'rar'],
  }
};

// Helper function to get user's subscription tier limits
export function getUserLimits(subscription) {
  const tier = subscription?.plan_name === 'pro' ? 'PRO' : 'FREE';
  return SUBSCRIPTION_LIMITS[tier];
} 