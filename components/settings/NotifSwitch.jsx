import React from 'react'
import { TouchableOpacity, Image, Switch, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SIZES } from "../../constants";
import { useEffect, useState } from "react";
import { cancelAllScheduledNotifications } from '../../hooks/setNotifications';

import styles from './notifSwitch.style'

const NotifSwitch = ({ time }) => {
  const [switchValue, setSwitchValue] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('notifSwitch').then((value) => {
      const notifSwitch = JSON.parse(value)
      // console.log(notifSwitch[time])
      setSwitchValue(notifSwitch[time])
      // console.log(switchValue)
    }).catch((err) => {
      console.log(err)
    }
    )
  }
    , [])
  return (
    <View style={styles.container}>
      {time == 0 ? <Text style={styles.headText}>At the start</Text>
        : <Text style={styles.headText}>{time} min before</Text>
      }
      <Switch
        trackColor={{ false: COLORS.gray, true: COLORS.primary }}
        thumbColor={COLORS.lightWhite}
        ios_backgroundColor={COLORS.gray}
        onValueChange={() => {
          AsyncStorage.getItem('notifSwitch').then((value) => {
            const notifSwitch = JSON.parse(value)
            notifSwitch[time] = !notifSwitch[time]
            AsyncStorage.setItem('notifSwitch', JSON.stringify(notifSwitch))
            setSwitchValue(notifSwitch[time])
            if (notifSwitch[time] == false) {
              cancelAllScheduledNotifications();
            }
          }
          ).catch((err) => {
            console.log(err)
          }
          )
        }
        }
        value={switchValue}
      /></View>
  )
}

export default NotifSwitch