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
    'sort'?: string;
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
 */
const handleApiError = async (error: unknown, router: Router | null): Promise<void> => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      
      if (status === 429) {
        const token = await getSecureToken();
        if (token) {
          refresh(token);
        }
      }
      
      if (status === 401 && router) {
        router.replace('/token/initToken');
      }
    }
  }
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
    await handleApiError(error, router);
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
    await handleApiError(error, router);
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
