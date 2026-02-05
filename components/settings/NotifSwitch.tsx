import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from "../../constants";
import { cancelAllScheduledNotifications } from '../../hooks/setNotifications';

import styles from './notifSwitch.style';

interface NotifSwitchProps {
  time: number;
}

const NotifSwitch: React.FC<NotifSwitchProps> = ({ time }) => {
  const [switchValue, setSwitchValue] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem('notifSwitch')
      .then((value) => {
        if (value) {
          const notifSwitch = JSON.parse(value);
          setSwitchValue(notifSwitch[time] || false);
        }
      })
      .catch(() => {
        // Error loading notification switch
      });
  }, [time]);

  const handleValueChange = () => {
    AsyncStorage.getItem('notifSwitch')
      .then((value) => {
        if (value) {
          const notifSwitch = JSON.parse(value);
          notifSwitch[time] = !notifSwitch[time];
          AsyncStorage.setItem('notifSwitch', JSON.stringify(notifSwitch));
          setSwitchValue(notifSwitch[time]);
          if (notifSwitch[time] === false) {
            cancelAllScheduledNotifications();
          }
        }
      })
      .catch(() => {
        // Error saving notification switch
      });
  };

  return (
    <View style={styles.container}>
      {time === 0 ? (
        <Text style={styles.headText}>At the start</Text>
      ) : (
        <Text style={styles.headText}>{time} min before</Text>
      )}
      <Switch
        trackColor={{ false: COLORS.gray, true: COLORS.primary }}
        thumbColor={COLORS.lightWhite}
        ios_backgroundColor={COLORS.gray}
        onValueChange={handleValueChange}
        value={switchValue}
      />
    </View>
  );
};

export default NotifSwitch;
