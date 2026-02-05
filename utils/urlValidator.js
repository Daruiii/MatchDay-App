import * as Linking from 'expo-linking';
import { ALLOWED_URLS } from '../config';

/**
 * URLs autorisées pour l'application
 */
const ALLOWED_DOMAINS = [
  'app.pandascore.co',
  'pandascore.co',
  'www.pandascore.co',
  'youtube.com',
  'www.youtube.com',
  'twitch.tv',
  'www.twitch.tv'
];

export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);

    if (urlObj.protocol !== 'https:') {
      console.warn('URL non HTTPS détectée:', urlObj.protocol);
      return false;
    }
    
    // Vérifier le domaine autorisé
    const isAllowedDomain = ALLOWED_DOMAINS.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );
    
    if (!isAllowedDomain) {
      console.warn('Domaine non autorisé:', urlObj.hostname);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('URL malformée:', error.message);
    return false;
  }
};


export const navigateSecurely = async (url) => {
  if (!isValidUrl(url)) {
    throw new Error('URL non autorisée ou invalide');
  }
  
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      throw new Error('Impossible d\'ouvrir cette URL');
    }
  } catch (error) {
    console.error('Erreur navigation:', error.message);
    throw error;
  }
};

/**
 * Sanitize URL pour éviter les attaques
 */
export const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  
  // Supprimer les caractères dangereux
  return url
    .trim()
    .replace(/[<>"']/g, '') // Éviter XSS
    .replace(/javascript:/gi, '') // Éviter javascript:
    .replace(/data:/gi, ''); // Éviter data:
};