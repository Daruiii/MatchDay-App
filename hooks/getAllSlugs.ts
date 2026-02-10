import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getSecureToken } from '../storage/secureStorage';
import refresh from './autoReloadToken';
import type { Team } from '../types';

/**
 * Type pour le router Expo
 */
interface Router {
  replace: (path: string) => void;
}

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
 * Récupérer tous les slugs d'une équipe
 * @param teamName - Nom de l'équipe à rechercher
 * @param router - Router Expo optionnel pour redirection
 * @returns Array de slugs ou array vide en cas d'erreur
 */
export const getAllSlugs = async (
  teamName: string,
  router: Router | null = null
): Promise<string[]> => {
  try {
    const token = await getSecureToken();

    if (!token) {
      return [];
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.pandascore.co/teams?search[slug]=${teamName}`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<Team[]>(options);
    const allSlugs = response.data.map((team) => team.slug);
    return allSlugs;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error, router);
    if (newToken) {
      try {
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: `https://api.pandascore.co/teams?search[slug]=${teamName}`,
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${newToken}`,
          },
        };
        const response = await axios.request<Team[]>(options);
        return response.data.map((team) => team.slug);
      } catch (retryError) {
        return [];
      }
    }
    return [];
  }
};

/**
 * Récupérer le logo d'une équipe
 * @param teamName - Nom de l'équipe à rechercher
 * @param router - Router Expo optionnel pour redirection
 * @returns URL du logo ou null si non trouvé
 */
export const getTeamLogo = async (
  teamName: string,
  router: Router | null = null
): Promise<string | null> => {
  try {
    const token = await getSecureToken();

    if (!token) {
      return null;
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.pandascore.co/teams?search[slug]=${teamName}`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<Team[]>(options);

    // Trouver le premier logo non-null
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i]?.image_url !== null) {
        return response.data[i].image_url;
      }
    }

    return null;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error, router);
    if (newToken) {
      try {
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: `https://api.pandascore.co/teams?search[slug]=${teamName}`,
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${newToken}`,
          },
        };
        const response = await axios.request<Team[]>(options);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]?.image_url !== null) {
            return response.data[i].image_url;
          }
        }
        return null;
      } catch (retryError) {
        return null;
      }
    }
    return null;
  }
};
