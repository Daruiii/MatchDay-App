import axios, { AxiosRequestConfig } from 'axios';
import { storeSecureToken } from '../storage/secureStorage';

/**
 * Type pour le router Expo
 */
interface Router {
  replace: (path: string) => void;
}

/**
 * Type pour la réponse de refresh token
 */
interface RefreshTokenResponse {
  data: {
    data: {
      token: string;
    };
  };
}

/**
 * Rafraîchir le token d'authentification PandaScore
 * @param token - Token actuel à rafraîchir
 * @param router - Router Expo optionnel pour redirection
 * @returns Le nouveau token ou null en cas d'erreur
 */
const refresh = async (token: string, router: Router | null = null): Promise<string | null> => {
  try {
    const optionsRefresh: AxiosRequestConfig = {
      method: 'PUT',
      url: 'https://registration.pandascore.co/dashboard_api/users/me/access_token',
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request<RefreshTokenResponse['data']>(optionsRefresh);
    const newToken = response.data.data.token;

    await storeSecureToken(newToken);

    if (router) {
      router.replace('/');
    }

    return newToken;
  } catch (error) {
    return null;
  }
};

export default refresh;
