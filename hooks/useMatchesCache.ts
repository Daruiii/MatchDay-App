import { useEffect, useState, useCallback, useRef } from 'react';
import { getUpcomingMatches, getPastMatches, getNextMatch } from './getMatches';
import { CACHE_CONFIG } from '../config';
import type { Match, CacheEntry } from '../types';

/**
 * Type pour le type de récupération des matches
 */
export type MatchType = 'upcoming' | 'past' | 'next';

/**
 * Interface pour le retour du hook
 */
interface UseMatchesCacheReturn {
  matches: Match[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Cache universel des matches avec TTL
 * Évite les API calls répétés pour les mêmes données
 */
const matchesCache = new Map<string, CacheEntry<Match[]>>();
const CACHE_TTL = CACHE_CONFIG.MATCHES_TTL;

/**
 * Hook optimisé pour récupérer les matches avec cache
 */
export const useMatchesCache = (
  slugs: string[] | undefined,
  type: MatchType = 'upcoming'
): UseMatchesCacheReturn => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef<boolean>(true);

  // Créer une clé de cache stable avec le type
  const cacheKey = `${type}|${slugs?.sort()?.join(',')}` || '';

  // Sélectionner la fonction API selon le type
  const getMatchesFunction =
    {
      upcoming: getUpcomingMatches,
      past: getPastMatches,
      next: getNextMatch,
    }[type] || getUpcomingMatches;

  const fetchMatches = useCallback(async (): Promise<void> => {
    if (!slugs?.length || !cacheKey) {
      setIsLoading(false);
      return;
    }

    // Vérifier le cache d'abord
    const cached = matchesCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setMatches(cached.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getMatchesFunction(slugs);

      // Vérifier si le composant est toujours monté
      if (!mountedRef.current) return;

      if (data) {
        // Convertir en tableau si c'est un seul match (pour getNextMatch)
        const dataArray = Array.isArray(data) ? data : [data];

        // Stocker en cache
        matchesCache.set(cacheKey, {
          data: dataArray,
          timestamp: Date.now(),
        });
        setMatches(dataArray);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [cacheKey, slugs, type, getMatchesFunction]);

  useEffect(() => {
    mountedRef.current = true;
    fetchMatches();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchMatches]);

  // Cleanup cache periodiquement
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      for (const [key, value] of matchesCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
          matchesCache.delete(key);
        }
      }
    }, CACHE_TTL);

    return () => clearInterval(cleanup);
  }, []);

  return {
    matches,
    isLoading,
    error,
    refetch: fetchMatches,
  };
};

/**
 * Vider le cache manuellement
 */
export const clearMatchesCache = (): void => {
  matchesCache.clear();
};
