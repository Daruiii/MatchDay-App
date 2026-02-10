import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getObjectData } from '../storage/data';
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
 * Type pour une équipe stockée localement
 */
interface StoredTeam {
  teamName: string;
  [key: string]: unknown;
}

/**
 * Type pour le retour de la fonction
 */
export interface TeamLogo {
  teamName: string;
  logo: string | null;
}

/**
 * Récupérer les logos de toutes les équipes stockées
 */
const LogoApiData = async (router: Router | null = null): Promise<TeamLogo[] | undefined> => {
  const teamData = await getObjectData<StoredTeam[]>('teams');
  if (!teamData || teamData.length === 0) {
    return [];
  }

  try {
    const token = await getSecureToken();

    if (!token) {
      return [];
    }

    // Fetch logos for each team
    const logoPromises = teamData.map(async (team): Promise<TeamLogo> => {
      const options: AxiosRequestConfig = {
        method: 'GET',
        url: `https://api.pandascore.co/teams?search[slug]=${team.teamName}`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request<Team[]>(options);

      // Trouver le premier logo non-null
      let logoUrl: string | null = null;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i]?.image_url !== null) {
          logoUrl = response.data[i].image_url;
          break;
        }
      }

      return {
        teamName: team.teamName,
        logo: logoUrl,
      };
    });

    const logos = await Promise.all(logoPromises);
    return logos;
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
                const retryPromises = teamData.map(async (team): Promise<TeamLogo> => {
                  const options: AxiosRequestConfig = {
                    method: 'GET',
                    url: `https://api.pandascore.co/teams?search[slug]=${team.teamName}`,
                    headers: {
                      accept: 'application/json',
                      authorization: `Bearer ${newToken}`,
                    },
                  };
                  const response = await axios.request<Team[]>(options);
                  let logoUrl: string | null = null;
                  for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i]?.image_url !== null) {
                      logoUrl = response.data[i].image_url;
                      break;
                    }
                  }
                  return { teamName: team.teamName, logo: logoUrl };
                });
                return await Promise.all(retryPromises);
              } catch (retryError) {
                return undefined;
              }
            }
          }
          return undefined;
        }

        if (status === 401 && router) {
          router.replace('/token/initToken');
        }
      }
    }
    return undefined;
  }
};

export default LogoApiData;
