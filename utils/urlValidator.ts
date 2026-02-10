import * as Linking from 'expo-linking';
import { ALLOWED_URLS } from '@config';

/**
 * URLs autorisées pour l'application
 */
const ALLOWED_DOMAINS: string[] = [
  'app.pandascore.co',
  'pandascore.co',
  'www.pandascore.co',
  'youtube.com',
  'www.youtube.com',
  'twitch.tv',
  'www.twitch.tv',
];

export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);

    if (urlObj.protocol !== 'https:') {
      console.warn('URL non HTTPS détectée:', urlObj.protocol);
      return false;
    }

    // Vérifier le domaine autorisé
    const isAllowedDomain = ALLOWED_DOMAINS.some(
      (domain) => urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );

    if (!isAllowedDomain) {
      console.warn('Domaine non autorisé:', urlObj.hostname);
      return false;
    }

    return true;
  } catch (error) {
    console.error('URL malformée:', (error as Error).message);
    return false;
  }
};

export const navigateSecurely = async (url: string): Promise<void> => {
  if (!isValidUrl(url)) {
    throw new Error('URL non autorisée ou invalide');
  }

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      throw new Error("Impossible d'ouvrir cette URL");
    }
  } catch (error) {
    console.error('Erreur navigation:', (error as Error).message);
    throw error;
  }
};

/**
 * Sanitize URL pour éviter les attaques
 */
export const sanitizeUrl = (url: string | null | undefined): string => {
  if (!url || typeof url !== 'string') return '';

  // Supprimer les caractères dangereux
  return url
    .trim()
    .replace(/[<>"']/g, '') // Éviter XSS
    .replace(/javascript:/gi, '') // Éviter javascript:
    .replace(/data:/gi, ''); // Éviter data:
};
