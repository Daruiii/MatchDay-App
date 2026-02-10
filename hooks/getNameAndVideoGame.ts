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
 * Type pour le retour de la fonction
 */
export interface TeamNameAndVideoGame {
  teamName: string;
  videoGame: string;
  videoGameSlug: string;
}

/**
 * Récupérer le nom et le jeu vidéo d'une équipe
 */
const getNameAndVideoGame = async (
  slug: string,
  router: Router | null = null
): Promise<TeamNameAndVideoGame | null> => {
  try {
    const token = await getSecureToken();

    if (!token) {
      return null;
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.pandascore.co/teams/${slug}`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<Team>(options);
    const teamName = response.data?.name || 'Unknown';
    const videoGame = response.data?.current_videogame?.name ?? 'Unknown';
    const videoGameSlug = response.data?.current_videogame?.slug ?? 'Unknown';

    return { teamName, videoGame, videoGameSlug };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 429) {
          const token = await getSecureToken();
          if (token) {
            const newToken = await refresh(token);
            // Retry avec le nouveau token
            if (newToken) {
              try {
                const retryOptions: AxiosRequestConfig = {
                  method: 'GET',
                  url: `https://api.pandascore.co/teams/${slug}`,
                  headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${newToken}`,
                  },
                };
                const retryResponse = await axios.request<Team>(retryOptions);
                return {
                  teamName: retryResponse.data?.name || 'Unknown',
                  videoGame: retryResponse.data?.current_videogame?.name ?? 'Unknown',
                  videoGameSlug: retryResponse.data?.current_videogame?.slug ?? 'Unknown',
                };
              } catch (retryError) {
                return null;
              }
            }
          }
        }

        if (status === 401 && router) {
          router.replace('/token/initToken');
        }
      }
    }
    return null;
  }
};

export default getNameAndVideoGame;
