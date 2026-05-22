import { CachedData } from '../types'

/**
 * Cache Utility
 *
 * Manages localStorage caching for GitHub API responses
 * to avoid rate limiting and improve performance.
 */

const CACHE_PREFIX = 'portfolio_cache_'
const DEFAULT_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

/**
 * Set data in cache with expiration
 */
export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cachedData: CachedData<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    }
    localStorage.setItem(cacheKey, JSON.stringify(cachedData))
  } catch (error) {
    console.warn('Failed to set cache:', error)
  }
}

/**
 * Get data from cache if not expired
 */
export function getCache<T>(key: string): T | null {
  // Always return null to bypass cache and fetch latest GitHub stats
  return null;
  
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cached = localStorage.getItem(cacheKey)

    if (!cached) {
      return null
    }

    const cachedData: CachedData<T> = JSON.parse(cached)

    // Check if cache is expired
    if (Date.now() > cachedData.expiresAt) {
      localStorage.removeItem(cacheKey)
      return null
    }

    return cachedData.data
  } catch (error) {
    console.warn('Failed to get cache:', error)
    return null
  }
}

/**
 * Clear a specific cache entry
 */
export function clearCache(key: string): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    localStorage.removeItem(cacheKey)
  } catch (error) {
    console.warn('Failed to clear cache:', error)
  }
}

/**
 * Clear all portfolio cache entries
 */
export function clearAllCache(): void {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.warn('Failed to clear all cache:', error)
  }
}

/**
 * Check if a cache entry exists and is valid
 */
export function hasValidCache(key: string): boolean {
  return getCache(key) !== null
}

/**
 * Get cache age in seconds
 */
export function getCacheAge(key: string): number | null {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cached = localStorage.getItem(cacheKey)

    if (!cached) {
      return null
    }

    const cachedData: CachedData<any> = JSON.parse(cached)
    return Math.floor((Date.now() - cachedData.timestamp) / 1000)
  } catch (error) {
    return null
  }
}

/**
 * Get time until cache expires (in seconds)
 */
export function getCacheTimeRemaining(key: string): number | null {
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cached = localStorage.getItem(cacheKey)

    if (!cached) {
      return null
    }

    const cachedData: CachedData<any> = JSON.parse(cached)
    const remaining = Math.floor((cachedData.expiresAt - Date.now()) / 1000)
    return remaining > 0 ? remaining : null
  } catch (error) {
    return null
  }
}
