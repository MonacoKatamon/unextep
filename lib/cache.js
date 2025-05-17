// Simple in-memory cache implementation
class MemoryCache {
  constructor(defaultTTL = 300) { // default TTL is 5 minutes (300 seconds)
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  // Set a value in the cache with optional TTL
  set(key, value, ttl = this.defaultTTL) {
    const expiry = Date.now() + (ttl * 1000);
    this.cache.set(key, { value, expiry });
    return value;
  }

  // Get a value from the cache
  get(key) {
    const item = this.cache.get(key);
    
    // Return null if item doesn't exist
    if (!item) return null;
    
    // Check if the item has expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  // Delete a value from the cache
  delete(key) {
    return this.cache.delete(key);
  }

  // Clear all values from the cache
  clear() {
    this.cache.clear();
  }

  // Get all keys in the cache
  keys() {
    return [...this.cache.keys()];
  }
}

// Create cache instances with different TTLs for different types of data
export const userCache = new MemoryCache(300); // Cache user data for 5 minutes
export const subscriptionCache = new MemoryCache(600); // Cache subscription data for 10 minutes
export const settingsCache = new MemoryCache(1800); // Cache settings for 30 minutes
export const filesCache = new MemoryCache(120); // Cache file lists for 2 minutes

// Helper function to get data with caching
export async function getCachedData(cacheKey, cacheName, fetchFunction) {
  // Try to get from cache first
  const cache = getCacheByName(cacheName);
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch the data
  const data = await fetchFunction();
  
  // Store in cache for next time
  cache.set(cacheKey, data);
  
  return data;
}

// Helper to get cache instance by name
function getCacheByName(name) {
  switch(name) {
    case 'user':
      return userCache;
    case 'subscription':
      return subscriptionCache;
    case 'settings':
      return settingsCache;
    case 'files':
      return filesCache;
    default:
      return userCache;
  }
}

// Clear all caches related to a specific user
export function clearUserCaches(userId) {
  const caches = [userCache, subscriptionCache, settingsCache, filesCache];
  
  caches.forEach(cache => {
    const keys = cache.keys();
    keys.forEach(key => {
      if (key.includes(userId)) {
        cache.delete(key);
      }
    });
  });
} 