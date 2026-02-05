import axios, { AxiosRequestConfig } from 'axios';
import { storeObjectData } from '../storage/data';

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
 */
const refresh = async (token: string, router: Router | null = null): Promise<void> => {
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

    await storeObjectData('token', newToken);

    if (router) {
      router.replace('/');
    }
  } catch (error) {
    // Error refreshing token - silently fail
    // TODO: Consider adding proper error handling/logging
  }
};

export default refresh;
