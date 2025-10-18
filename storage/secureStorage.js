import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stockage sécurisé pour les données sensibles (token PS notamment)
 */

// Clés pour les données sensibles
const SECURE_KEYS = {
  TOKEN: 'secure_token',
  USER_CREDENTIALS: 'secure_credentials'
};

const isValidToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  // PandaScore tokens sont généralement des strings de 40+ caractères
  if (token.length < 20) return false;
  return /^[a-zA-Z0-9_-]+$/.test(token);
};

export const storeSecureToken = async (token) => {
  try {
    if (!isValidToken(token)) {
      throw new Error('Format de token invalide');
    }
    
    await SecureStore.setItemAsync(SECURE_KEYS.TOKEN, token);
    console.log('Token stocké de façon sécurisée');
    return true;
  } catch (error) {
    console.error('Erreur stockage sécurisé:', error.message);
    return false;
  }
};

export const getSecureToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(SECURE_KEYS.TOKEN);
    if (token && isValidToken(token)) {
      return token;
    }
    return null;
  } catch (error) {
    console.error('Erreur récupération token:', error.message);
    return null;
  }
};

export const removeSecureToken = async () => {
  try {
    await SecureStore.deleteItemAsync(SECURE_KEYS.TOKEN);
    console.log('Token supprimé de façon sécurisée');
    return true;
  } catch (error) {
    console.error('Erreur suppression token:', error.message);
    return false;
  }
};

export const hasValidToken = async () => {
  const token = await getSecureToken();
  return token !== null;
};

export const storeObjectData = async (key, value) => {
  try {
    // Attention : Ne jamais utiliser pour des tokens !
    if (key.toLowerCase().includes('token')) {
      throw new Error('Utiliser storeSecureToken() pour les tokens');
    }
    
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Données non-sensibles stockées: ${key}`);
    return true;
  } catch (error) {
    console.error('Erreur stockage données:', error.message);
    return false;
  }
};

export const getObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erreur récupération données:', error.message);
    return null;
  }
};

export const removeObjectData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Données supprimées: ${key}`);
    return true;
  } catch (error) {
    console.error('Erreur suppression données:', error.message);
    return false;
  }
};