import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getSecureToken } from '../storage/secureStorage';
import refresh from './autoReloadToken';
import type { Team, Match, Standing } from '../types';

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
const handleApiError = async (
  error: unknown,
  router: Router | null = null
): Promise<string | null> => {
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
 * Récupérer les données d'une équipe pour la modal
 */
export const getModalData = async (
  teamId: number,
  router: Router | null = null
): Promise<Team | null> => {
  try {
    const token = await getSecureToken();

    if (!token) {
      return null;
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.pandascore.co/teams/${teamId}`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<Team>(options);
    return response.data;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error, router);
    if (newToken) {
      try {
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: `https://api.pandascore.co/teams/${teamId}`,
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${newToken}`,
          },
        };
        const response = await axios.request<Team>(options);
        return response.data;
      } catch (retryError) {
        return null;
      }
    }
    return null;
  }
};

/**
 * Récupérer les standings d'un tournoi pour la modal
 */
export const getModalTournamentRankingData = async (
  tournamentId: number
): Promise<Standing[] | null> => {
  try {
    const token = await getSecureToken();

    if (!token) {
      return null;
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.pandascore.co/tournaments/${tournamentId}/standings`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<Standing[]>(options);
    return response.data;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error);
    if (newToken) {
      try {
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: `https://api.pandascore.co/tournaments/${tournamentId}/standings`,
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${newToken}`,
          },
        };
        const response = await axios.request<Standing[]>(options);
        return response.data;
      } catch (retryError) {
        return null;
      }
    }
    return null;
  }
};

/**
 * Récupérer les matches d'un tournoi pour la modal
 */
export const getModalTournamentData = async (
  tournamentId: number,
  router: Router | null = null
): Promise<Match[] | null> => {
  try {
    const token = await getSecureToken();

    if (!token) {
      return null;
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `https://api.pandascore.co/tournaments/${tournamentId}/matches`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<Match[]>(options);
    return response.data;
  } catch (error) {
    // Tenter de refresh le token et retry une fois
    const newToken = await handleApiError(error, router);
    if (newToken) {
      try {
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: `https://api.pandascore.co/tournaments/${tournamentId}/matches`,
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${newToken}`,
          },
        };
        const response = await axios.request<Match[]>(options);
        return response.data;
      } catch (retryError) {
        return null;
      }
    }
    return null;
  }
};
