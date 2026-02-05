import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VALIDATION } from '../config';

/**
 * Stockage sécurisé pour les données sensibles (token PS notamment)
 */

// Clés pour les données sensibles
const SECURE_KEYS = {
  TOKEN: 'secure_token',
  USER_CREDENTIALS: 'secure_credentials',
} as const;

/**
 * Valider le format d'un token
 */
const isValidToken = (token: unknown): token is string => {
  if (!token || typeof token !== 'string') return false;
  if (token.length < VALIDATION.TOKEN_MIN_LENGTH) return false;
  return VALIDATION.TOKEN_REGEX.test(token);
};

/**
 * Stocker un token de manière sécurisée
 * @throws {Error} Si le token est invalide
 */
export const storeSecureToken = async (token: string): Promise<boolean> => {
  try {
    if (!isValidToken(token)) {
      throw new Error('Format de token invalide');
    }

    await SecureStore.setItemAsync(SECURE_KEYS.TOKEN, token);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Récupérer le token sécurisé
 * @returns Le token s'il est valide, null sinon
 */
export const getSecureToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(SECURE_KEYS.TOKEN);
    if (token && isValidToken(token)) {
      return token;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Supprimer le token sécurisé
 */
export const removeSecureToken = async (): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync(SECURE_KEYS.TOKEN);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Vérifier si un token valide existe
 */
export const hasValidToken = async (): Promise<boolean> => {
  const token = await getSecureToken();
  return token !== null;
};

/**
 * Stocker un objet dans AsyncStorage
 * @throws {Error} Si la clé contient 'token'
 */
export const storeObjectData = async (key: string, value: unknown): Promise<boolean> => {
  try {
    // Attention : Ne jamais utiliser pour des tokens !
    if (key.toLowerCase().includes('token')) {
      throw new Error('Utiliser storeSecureToken() pour les tokens');
    }

    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Récupérer un objet depuis AsyncStorage
 */
export const getObjectData = async <T = unknown>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Supprimer un objet d'AsyncStorage
 */
export const removeObjectData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
