import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getObjectData } from '../storage/data';
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
 */
const handleApiError = async (error: unknown, router: Router | null): Promise<void> => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const status = axiosError.response.status;
      
      if (status === 429) {
        const token = await getObjectData('token');
        if (token) {
          refresh(token as string);
        }
      }
      
      if (status === 401 && router) {
        router.replace('/token/initToken');
      }
    }
  }
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
    const token = await getObjectData('token');

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
    await handleApiError(error, router);
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
    const token = await getObjectData('token');

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
    await handleApiError(error, router);
    return null;
  }
};
