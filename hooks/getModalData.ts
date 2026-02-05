import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getObjectData } from '../storage/data';
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
 */
const handleApiError = async (error: unknown, router: Router | null = null): Promise<void> => {
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
 * Récupérer les données d'une équipe pour la modal
 */
export const getModalData = async (
  teamId: number,
  router: Router | null = null
): Promise<Team | null> => {
  try {
    const token = await getObjectData('token');

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
    await handleApiError(error, router);
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
    const token = await getObjectData('token');

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
    await handleApiError(error);
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
    const token = await getObjectData('token');

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
    await handleApiError(error, router);
    return null;
  }
};
