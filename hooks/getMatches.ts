import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getSecureToken } from '../storage/secureStorage';
import refresh from './autoReloadToken';
import type { Match } from '../types';

/**
 * Type pour le router Expo
 */
interface Router {
  replace: (path: string) => void;
}

/**
 * Options de base pour les requêtes API
 */
interface MatchRequestOptions {
  slug: string;
  token: string;
  params: {
    'filter[status]'?: string;
    sort?: string;
    per_page: string;
  };
}

/**
 * Créer les options Axios pour une requête de matches
 */
const createMatchRequestOptions = (
  slug: string,
  token: string,
  params: MatchRequestOptions['params']
): AxiosRequestConfig => ({
  method: 'GET',
  url: `https://api.pandascore.co/teams/${slug}/matches`,
  params,
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${token}`,
  },
});

/**
 * Gérer les erreurs d'API communes
 * @returns Le nouveau token si refresh réussi, null sinon
 */
const handleApiError = async (error: unknown, router: Router | null): Promise<string | null> => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;

      if (status === 429) {
        const token = await getSecureToken();
        if (token) {
          const newToken = await refresh(token);
          return newToken; // Retourner le nouveau token pour retry
        }
      }

      if (status === 401 && router) {
        router.replace('/token/initToken');
      }
    }
  }
  return null;
};

/**
 * Récupérer les matches passés pour une liste de slugs
 */
export const getPastMatches = async (
  slugs: string[],
  router: Router | null = null
): Promise<Match[]> => {
  if (!slugs || slugs.length === 0) {
    return [];
  }

  try {
    const token = await getSecureToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Fetch data for each slug
    const matchPromises = slugs.map(async (slug): Promise<Match[]> => {
      const options = createMatchRequestOptions(slug, token, {
        'filter[status]': 'finished',
        sort: '-begin_at',
        per_page: '25',
      });

      const response = await axios.request<Match[]>(options);
      return response.data;
    });

    const matches = await Promise.all(matchPromises);
    const sortedMatches = matches
      .flat()
      .sort((a, b) => new Date(b.begin_at).getTime() - new Date(a.begin_at).getTime());

    return sortedMatches;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error, router);
    if (newToken) {
      try {
        const matchPromises = slugs.map(async (slug): Promise<Match[]> => {
          const options = createMatchRequestOptions(slug, newToken, {
            'filter[status]': 'finished',
            sort: '-begin_at',
            per_page: '25',
          });
          const response = await axios.request<Match[]>(options);
          return response.data;
        });

        const matches = await Promise.all(matchPromises);
        return matches
          .flat()
          .sort((a, b) => new Date(b.begin_at).getTime() - new Date(a.begin_at).getTime());
      } catch (retryError) {
        // Si retry échoue, abandonner
        return [];
      }
    }
    return [];
  }
};

/**
 * Récupérer les matches à venir pour une liste de slugs
 */
export const getUpcomingMatches = async (
  slugs: string[],
  router: Router | null = null
): Promise<Match[]> => {
  if (!slugs || slugs.length === 0) {
    return [];
  }

  try {
    const token = await getSecureToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const matchPromises = slugs.map(async (slug): Promise<Match[]> => {
      const options = createMatchRequestOptions(slug, token, {
        per_page: '15',
      });

      const response = await axios.request<Match[]>(options);
      const filteredMatch = response.data.filter(
        (match) => match.status === 'not_started' || match.status === 'running'
      );
      return filteredMatch;
    });

    const matches = await Promise.all(matchPromises);
    const sortedMatches = matches
      .flat()
      .sort((a, b) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime());

    return sortedMatches;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error, router);
    if (newToken) {
      try {
        const matchPromises = slugs.map(async (slug): Promise<Match[]> => {
          const options = createMatchRequestOptions(slug, newToken, {
            per_page: '15',
          });
          const response = await axios.request<Match[]>(options);
          return response.data.filter(
            (match) => match.status === 'not_started' || match.status === 'running'
          );
        });

        const matches = await Promise.all(matchPromises);
        return matches
          .flat()
          .sort((a, b) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime());
      } catch (retryError) {
        return [];
      }
    }
    return [];
  }
};

/**
 * Récupérer le prochain match pour une liste de slugs
 */
export const getNextMatch = async (
  slugs: string[],
  router: Router | null = null
): Promise<Match | undefined> => {
  if (!slugs || slugs.length === 0) {
    return undefined;
  }

  try {
    const token = await getSecureToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const matchPromises = slugs.map(async (slug): Promise<Match[]> => {
      const options = createMatchRequestOptions(slug, token, {
        per_page: '20',
      });

      const response = await axios.request<Match[]>(options);
      const filteredMatch = response.data.filter(
        (match) => match.status === 'not_started' || match.status === 'running'
      );
      return filteredMatch;
    });

    const matches = await Promise.all(matchPromises);
    const nextMatch = matches
      .flat()
      .sort((a, b) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime())[0];

    return nextMatch;
  } catch (error) {
    await handleApiError(error, router);
    return undefined;
  }
};
