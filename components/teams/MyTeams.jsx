import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { deleteTeam } from '../../storage/teamsData'
import EventBtn from '../teams/button/EventBtn'
import NavbarBtn from '../navbar/button/NavbarBtn'
import { useRouter } from 'expo-router';
import { getObjectData, storeObjectData, updateObjectData } from '../../storage/data';
import { updateTeam } from '../../storage/teamsData'

import { icons, images } from '../../constants';
import { cancelAllScheduledNotifications } from '../../hooks/setNotifications';

import styles from './myTeams.style'

const MyTeams = ({ team, updateTeams, teams, iconUrl, refresh }) => {
  const router = useRouter()

  return (
    useEffect(() => {
      // console.log(team)
    }, [teams]),
    <View style={styles.container(team.eventColor)}>
      <View style={{
        flexDirection: 'row', justifyContent: 'start', alignItems: 'center'
      }}>
        {iconUrl ? (
          <NavbarBtn iconUrl={icons[iconUrl] ? icons[iconUrl] : { uri: iconUrl }}
            dimension={"60%"} handlePress={() => {
              router.push(`/team/${team.teamName}`)
            }} />
        ) : <NavbarBtn iconUrl={icons[iconUrl] ? icons[iconUrl] : images.unknownTeam} dimension="60%"
          handlePress={() => {
            router.replace(`/team/${team.teamName}`)
          }} />
        }

        <Text style={styles.headText(team.eventTextColor)}>{team.teamName}</Text>
      </View>
      <View style={styles.btnContainer}>
        {team.notificate ? (
          <EventBtn iconUrl={icons.notification} dimension={"60%"} handlePress={() => {
            updateTeam(team.teamName, team.backgroundColor, team.secondColor, team.eventColor, team.eventTextColor, team.slugs, team.disabledSlugs, team.image_url, false)
            cancelAllScheduledNotifications();
            refresh()
          }} />
        ) :
          <EventBtn iconUrl={icons.notificationOff} dimension={"60%"} handlePress={() => {
            updateTeam(team.teamName, team.backgroundColor, team.secondColor, team.eventColor, team.eventTextColor, team.slugs, team.disabledSlugs, team.image_url, true)
            refresh();
            
          }} />
        }
        <EventBtn iconUrl={icons.filter} dimension={"60%"} handlePress={() => {
          router.push(`/team/edit/${team.teamName}`)
        }} />
        <EventBtn iconUrl={icons.delet} dimension={"60%"} handlePress={async () => {
          await deleteTeam(team.teamName)
          await updateTeams(teams.filter(t => t.teamName !== team.teamName))
          cancelAllScheduledNotifications();
          refresh()
        }} />
      </View>
    </View>
  )
}

export default MyTeams