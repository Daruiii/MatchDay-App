import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getObjectData } from '../storage/data';
import refresh from "./autoReloadToken";

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const getNextMatch = async (slugs, router = null) => {

    if (!slugs) {
        return;
    }
    try {
        const token = await getObjectData('token');
        const matchPromises = slugs.map(async (slug) => {
            const options = {
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
            const match = await axios.request(options).then(function (response) {
                return response.data;
            });
            return match;
        });

        const matches = await Promise.all(matchPromises);
        const nextMatch = matches.flat().sort((a, b) => new Date(a.begin_at) - new Date(b.begin_at))[0];
        if (nextMatch) {
            await AsyncStorage.getItem("notifSwitch").then((value) => {
                if (value) {
                    const notifSwitch = JSON.parse(value);
                    for (const [key, val] of Object.entries(notifSwitch)) {
                        if (val === true) {
                            scheduleNotification(nextMatch, key);
                        }
                        console.log(`${key}: is ${val}`);
                    }
                }
            }
            );
        }
        return nextMatch;
    } catch (error) {
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
            // alert("Refreshing token... ");
            console.log("Refreshing token... by getNextMatch");
            refresh(token);
        }
        if (error.response && error.response.status === 401) {
            console.log("Token expired. Please check your token.");
            if (router) {
                router.replace("/token/initToken");
            }
        }
        else {
            console.log(error);
        }
    }
}

const scheduleNotification = async (nextMatch, key) => {
    //configure notification for they can emit a sound
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    // check device type
    const deviceType = Device.deviceType;
    if (deviceType !== Device.DeviceType.PHONE) {
        console.log("Device not a phone");
        return;
    }
    const matchStartDate = new Date(nextMatch?.begin_at).getTime();
    const now = new Date().getTime();
    //convert key(minutes) to seconds
    const keyToSeconds = parseInt(key) * 60;
    const secondsUntilMatch = Math.floor((matchStartDate - now) / 1000) - keyToSeconds;
    // const secondsUntilMatch = 20 - parseInt(key); // for testing
    //destroy notification from local storage after 20 seconds
    const destroyIn = secondsUntilMatch + 5;
    setTimeout(() => {
        cancelScheduledNotification(nextMatch?.id, key);
    }, destroyIn * 1000);

    const notificationKey = `match_notification_${nextMatch?.id}_${key}`;

    try {
        // Enregistrer l'identifiant de la notification dans le stockage local
        const notificationDetails = {
            id: nextMatch?.id,
            title: `${nextMatch?.opponents[0]?.opponent?.acronym} vs ${nextMatch?.opponents[1]?.opponent?.acronym} starts in ${key} minutes !`,
            body: nextMatch?.name,
            data: { data: 'goes here' },
            scheduledTime: matchStartDate,
            matchDate: nextMatch?.begin_at,
        };

        // Vérifier si une notification pour ce match existe déjà
        const existingNotification = await AsyncStorage.getItem(notificationKey);
        if (existingNotification) {
            console.log(`Notification already scheduled for match ${nextMatch?.id}`);
            return;
        }

        // Enregistrer les détails de la notification
        await AsyncStorage.setItem(notificationKey, JSON.stringify(notificationDetails));
        if (key === "0") {
            // check if notification is enabled with expo-notifications
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('You need to enable permissions in order to receive notifications');
                return;
            }
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `${nextMatch?.opponents[0]?.opponent?.acronym} vs ${nextMatch?.opponents[1].opponent.acronym} starts now !`,
                    body: `[${nextMatch?.videogame?.name}](${nextMatch?.league?.name}) ${nextMatch?.name}`,
                    data: { data: 'goes here' },
                    sound: 'default',
                },
                trigger: { seconds: secondsUntilMatch, repeats: false },
            });
        }
        else {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `${nextMatch?.opponents[0]?.opponent?.acronym} vs ${nextMatch?.opponents[1].opponent.acronym} starts in ${key} minutes !`,
                    body: `[${nextMatch?.videogame?.name}](${nextMatch?.league?.name}) ${nextMatch?.name}`,
                    data: { data: 'goes here' },
                    sound: 'default',
                },
                trigger: { seconds: secondsUntilMatch, repeats: false },
            });
        }
        const secondsUntilMatchToHours = secondsUntilMatch / 3600;
        console.log(`Notification scheduled for match ${nextMatch?.id} in ${secondsUntilMatchToHours} hours`);
    } catch (error) {
        console.error('Error scheduling notification:', error);
    }
};

const cancelScheduledNotification = async (matchId, key) => {
    try {
        const notificationKey = `match_notification_${matchId}_${key}`;

        // Supprimer la notification planifiée
        await Notifications.cancelScheduledNotificationAsync(notificationKey);

        // Supprimer l'enregistrement associé dans le stockage local
        await AsyncStorage.removeItem(notificationKey);

        console.log(`Notification canceled for match ${matchId}`);
    } catch (error) {
        console.error('Error canceling scheduled notification:', error);
    }
};

const cancelAllScheduledNotifications = async () => {
    try {
        // Supprimer toutes les notifications planifiées
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Supprimer tous les enregistrements associés dans le stockage local
        const keys = await AsyncStorage.getAllKeys();
        const matchNotificationKeys = keys.filter((key) => key.startsWith('match_notification_'));
        await AsyncStorage.multiRemove(matchNotificationKeys);

        console.log('All scheduled notifications canceled');
    } catch (error) {
        console.error('Error canceling all scheduled notifications:', error);
    }
};


const getNotificationActive = async () => {
    const notificationActive = await Notifications.getPermissionsAsync();
    console.log("Notification active:");
    console.log(notificationActive);
    // get notification active in local storage
    const keys = await AsyncStorage.getAllKeys();
    const matchNotificationKeys = keys.filter((key) => key.startsWith('match_notification_'));
    console.log("Local storage Notification keys:");
    console.log(matchNotificationKeys);
    matchNotificationKeys.map(async (key) => {
        const notification = await AsyncStorage.getItem(key);
        // console.log(JSON.parse(notification).title);
        alert(JSON.parse(notification).title);
    });
    return matchNotificationKeys;
}

export { getNextMatch, scheduleNotification, cancelScheduledNotification, cancelAllScheduledNotifications, getNotificationActive };