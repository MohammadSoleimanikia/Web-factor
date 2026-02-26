import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Represents a single cached data entry with metadata
 * @template T - The type of data being cached
 */
interface CacheEntry<T = any> {
    /** The cached data */
    data: T;
    /** Timestamp when the cache was created (in milliseconds) */
    timestamp: number;
}

/**
 * Cache store state and actions
 * Manages caching of API responses with automatic expiration and invalidation
 */
interface CacheState {
    /** Map of cache keys to their entries */
    cache: Record<string, CacheEntry>;
    /** Set or update cache entry for a specific key */
    setCache: <T>(key: string, data: T) => void;
    /** Retrieve cached data if valid, otherwise return null */
    getCache: <T>(key: string) => T | null;
    /** Check if a cache entry is still valid (not expired) */
    isCacheValid: (key: string) => boolean;
    /** Invalidate one or multiple cache entries */
    invalidateCache: (key: string | string[]) => void;
    /** Clear all cached data */
    clearAllCache: () => void;
}

/** Cache duration in milliseconds (30 minutes) */
const CACHE_DURATION = 30 * 60 * 1000;

/**
 * Zustand cache store with persistence
 * Provides caching functionality with localStorage persistence and automatic expiration
 */
export const useCacheStore = create<CacheState>()(
    persist(
        (set, get) => ({
            cache: {},

            /**
             * Store data in cache with current timestamp
             * @template T - The type of data to cache
             * @param key - The cache key
             * @param data - The data to store
             */
            setCache: <T>(key: string, data: T) => {
                set((state) => ({
                    cache: {
                        ...state.cache,
                        [key]: {
                            data,
                            timestamp: Date.now(),
                        },
                    },
                }));
            },

            /**
             * Retrieve cached data if it exists and is valid
             * @template T - The type of cached data
             * @param key - The cache key
             * @returns The cached data or null if not found/expired
             */
            getCache: <T>(key: string): T | null => {
                const state = get();
                const entry = state.cache[key];

                if (!entry) return null;

                if (!get().isCacheValid(key)) {
                    get().invalidateCache(key);
                    return null;
                }

                return entry.data as T;
            },

            /**
             * Check if a cache entry is still valid (not expired)
             * @param key - The cache key to validate
             * @returns true if cache is valid, false if expired or doesn't exist
             */
            isCacheValid: (key: string) => {
                const state = get();
                const entry = state.cache[key];

                if (!entry) return false;

                const age = Date.now() - entry.timestamp;
                return age < CACHE_DURATION;
            },

            /**
             * Invalidate (remove) one or multiple cache entries
             * @param keys - A single key or array of keys to invalidate
             */
            invalidateCache: (keys: string | string[]) => {
                set((state) => {
                    const keysToInvalidate = Array.isArray(keys)
                        ? keys
                        : [keys];
                    const newCache = { ...state.cache };

                    keysToInvalidate.forEach((key) => {
                        delete newCache[key];
                    });

                    return { cache: newCache };
                });
            },

            /**
             * Clear all cached data
             */
            clearAllCache: () => {
                set({ cache: {} });
            },
        }),
        {
            name: "cache-store",
        },
    ),
);
