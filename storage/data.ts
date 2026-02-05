import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stocker un objet dans AsyncStorage
 * @param key - Clé de stockage
 * @param value - Valeur à stocker (sera stringifiée en JSON)
 */
export const storeObjectData = async (key: string, value: unknown): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    // Error storing data - silently fail
  }
};

/**
 * Récupérer un objet depuis AsyncStorage
 * @param key - Clé de stockage
 * @returns Objet parsé ou null si non trouvé/erreur
 */
export const getObjectData = async <T = unknown>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Supprimer un objet d'AsyncStorage
 * @param key - Clé de stockage
 */
export const removeObjectData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error removing data - silently fail
  }
};

/**
 * Mettre à jour un objet dans AsyncStorage
 * @param key - Clé de stockage
 * @param value - Nouvelle valeur (sera stringifiée en JSON)
 */
export const updateObjectData = async (key: string, value: unknown): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    // Error updating data - silently fail
  }
};
