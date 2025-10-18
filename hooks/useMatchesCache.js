import { useEffect, useState, useCallback, useRef } from 'react';
import { getUpcomingMatches, getPastMatches, getNextMatch } from './getMatches';

/**
 * Cache universel des matches avec TTL
 * Évite les API calls répétés pour les mêmes données
 */
const matchesCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Hook optimisé pour récupérer les matches avec cache
 */
export const useMatchesCache = (slugs, type = 'upcoming') => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  
  // Créer une clé de cache stable avec le type
  const cacheKey = `${type}|${slugs?.sort()?.join(',')}` || '';
  
  // Sélectionner la fonction API selon le type
  const getMatchesFunction = {
    upcoming: getUpcomingMatches,
    past: getPastMatches,
    next: getNextMatch
  }[type] || getUpcomingMatches;
  
  const fetchMatches = useCallback(async () => {
    if (!slugs?.length || !cacheKey) {
      setIsLoading(false);
      return;
    }

    // Vérifier le cache d'abord
    const cached = matchesCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      console.log(`📦 Cache hit [${type}]:`, cacheKey.split('|')[1]);
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
        // Stocker en cache
        matchesCache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
        console.log(`💾 Cache [${type}] mis à jour:`, cacheKey.split('|')[1]);
        
        setMatches(data);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      console.error('Erreur fetch matches:', err);
      setError(err);
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
          console.log('🗑️ Cache expiré supprimé:', key);
        }
      }
    }, CACHE_TTL);

    return () => clearInterval(cleanup);
  }, []);

  return {
    matches,
    isLoading,
    error,
    refetch: fetchMatches
  };
};

/**
 * Vider le cache manuellement
 */
export const clearMatchesCache = () => {
  matchesCache.clear();
  console.log('🧹 Cache matches vidé');
};