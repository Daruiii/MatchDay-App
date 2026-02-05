import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { getSecureToken } from '../storage/secureStorage';
import refresh from './autoReloadToken';
import type { Match } from '../types';

/**
 * Type pour le router Expo
 */
interface Router {
  replace: (path: string) => void;
}

/**
 * Type pour les détails de notification
 */
interface NotificationDetails {
  id: number;
  title: string;
  body: string;
  data: Record<string, unknown>;
  scheduledTime: number;
  matchDate: string;
}

/**
 * Type pour les switches de notifications
 */
type NotificationSwitch = Record<string, boolean>;

/**
 * Récupérer le prochain match pour les notifications
 */
export const getNextMatch = async (
  slugs: string[],
  router: Router | null = null
): Promise<Match | undefined> => {
  if (!slugs || slugs.length === 0) {
    return undefined;
  }

  try {
    const token = await getSecureToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const matchPromises = slugs.map(async (slug): Promise<Match[]> => {
      const options: AxiosRequestConfig = {
        method: 'GET',
        url: `https://api.pandascore.co/teams/${slug}/matches?filter[status]=not_started`,
        params: {
          per_page: '20',
        },
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request<Match[]>(options);
      return response.data;
    });

    const matches = await Promise.all(matchPromises);
    const nextMatch = matches
      .flat()
      .sort((a, b) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime())[0];

    if (nextMatch) {
      const notifSwitchValue = await AsyncStorage.getItem('notifSwitch');
      if (notifSwitchValue) {
        const notifSwitch: NotificationSwitch = JSON.parse(notifSwitchValue);
        for (const [key, val] of Object.entries(notifSwitch)) {
          if (val === true) {
            await scheduleNotification(nextMatch, key);
          }
        }
      }
    }

    return nextMatch;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 429) {
          const token = await getSecureToken();
          if (token) {
            refresh(token);
          }
        }

        if (status === 401 && router) {
          router.replace('/token/initToken');
        }
      }
    }
    return undefined;
  }
};

/**
 * Planifier une notification pour un match
 */
export const scheduleNotification = async (nextMatch: Match, key: string): Promise<void> => {
  // Configure notification for they can emit a sound
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Check device type
  const deviceType = Device.deviceType;
  if (deviceType !== Device.DeviceType.PHONE) {
    return;
  }

  const matchStartDate = new Date(nextMatch.begin_at).getTime();
  const now = new Date().getTime();
  // Convert key (minutes) to seconds
  const keyToSeconds = parseInt(key, 10) * 60;
  const secondsUntilMatch = Math.floor((matchStartDate - now) / 1000) - keyToSeconds;

  // Destroy notification from local storage after some time
  const destroyIn = secondsUntilMatch + 5;
  setTimeout(() => {
    cancelScheduledNotification(nextMatch.id, key);
  }, destroyIn * 1000);

  const notificationKey = `match_notification_${nextMatch.id}_${key}`;

  try {
    // Save notification identifier in local storage
    const notificationDetails: NotificationDetails = {
      id: nextMatch.id,
      title: `${nextMatch.opponents[0]?.opponent?.acronym} vs ${nextMatch.opponents[1]?.opponent?.acronym} starts in ${key} minutes !`,
      body: nextMatch.name,
      data: { data: 'goes here' },
      scheduledTime: matchStartDate,
      matchDate: nextMatch.begin_at,
    };

    // Check if notification for this match already exists
    const existingNotification = await AsyncStorage.getItem(notificationKey);
    if (existingNotification) {
      return;
    }

    // Save notification details
    await AsyncStorage.setItem(notificationKey, JSON.stringify(notificationDetails));

    // Request notification permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      if (key === '0') {
        Toast.show({
          type: 'error',
          text1: 'Permission Required',
          text2: 'Enable notifications in settings to receive match alerts',
        });
      }
      return;
    }

    // Schedule the notification
    const notificationContent = {
      title:
        key === '0'
          ? `${nextMatch.opponents[0]?.opponent?.acronym} vs ${nextMatch.opponents[1]?.opponent?.acronym} starts now !`
          : `${nextMatch.opponents[0]?.opponent?.acronym} vs ${nextMatch.opponents[1]?.opponent?.acronym} starts in ${key} minutes !`,
      body: `[${nextMatch.videogame?.name}](${nextMatch.league?.name}) ${nextMatch.name}`,
      data: { data: 'goes here' },
      sound: 'default' as const,
    };

    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsUntilMatch, 
        repeats: false 
      },
    });
  } catch (error) {
    // Error scheduling notification - silently fail
  }
};

/**
 * Annuler une notification planifiée
 */
export const cancelScheduledNotification = async (
  matchId: number,
  key: string
): Promise<void> => {
  try {
    const notificationKey = `match_notification_${matchId}_${key}`;

    // Cancel scheduled notification
    await Notifications.cancelScheduledNotificationAsync(notificationKey);

    // Remove associated record from local storage
    await AsyncStorage.removeItem(notificationKey);
  } catch (error) {
    // Error canceling scheduled notification - silently fail
  }
};

/**
 * Annuler toutes les notifications planifiées
 */
export const cancelAllScheduledNotifications = async (): Promise<void> => {
  try {
    // Cancel all scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Remove all associated records from local storage
    const keys = await AsyncStorage.getAllKeys();
    const matchNotificationKeys = keys.filter((key) => key.startsWith('match_notification_'));
    await AsyncStorage.multiRemove(matchNotificationKeys);
  } catch (error) {
    // Error canceling all scheduled notifications - silently fail
  }
};

/**
 * Récupérer les clés de notifications actives
 */
export const getNotificationActive = async (): Promise<string[]> => {
  await Notifications.getPermissionsAsync();
  const keys = await AsyncStorage.getAllKeys();
  const matchNotificationKeys = keys.filter((key) => key.startsWith('match_notification_'));
  return matchNotificationKeys;
};
