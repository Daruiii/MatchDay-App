import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { deleteTeam, updateTeam } from '../../storage/teamsData';
import EventBtn from '../teams/button/EventBtn';
import NavbarBtn from '../navbar/button/NavbarBtn';
import { useRouter } from 'expo-router';
import { StoredTeam } from '../../types/api';

import { icons, images } from '../../constants';
import { cancelAllScheduledNotifications } from '../../hooks/setNotifications';

import styles from './myTeams.style';

interface MyTeamsProps {
  team: StoredTeam;
  updateTeams: React.Dispatch<React.SetStateAction<StoredTeam[]>>;
  teams: StoredTeam[];
  iconUrl?: string;
  refresh: () => void;
}

const MyTeams: React.FC<MyTeamsProps> = ({ team, updateTeams, teams, iconUrl, refresh }) => {
  const router = useRouter();

  useEffect(() => {
    // useEffect for teams changes
  }, [teams]);

  return (
    <View style={(styles.container as any)(team.eventColor)}>
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
      }}>
        {iconUrl ? (
          <NavbarBtn 
            iconUrl={(icons as any)[iconUrl] ? (icons as any)[iconUrl] : { uri: iconUrl }}
            dimension="60%" 
            handlePress={() => {
              router.push(`/team/${team.teamName}`);
            }} 
          />
        ) : (
          <NavbarBtn 
            iconUrl={images.unknownTeam} 
            dimension="60%"
            handlePress={() => {
              router.replace(`/team/${team.teamName}`);
            }} 
          />
        )}

        <Text style={(styles.headText as any)(team.eventTextColor)}>{team.teamName}</Text>
      </View>
      <View style={styles.btnContainer}>
        {team.notificate ? (
          <EventBtn 
            iconUrl={icons.notification} 
            dimension="60%" 
            handlePress={() => {
              updateTeam(
                team.teamName, 
                team.backgroundColor, 
                team.secondColor, 
                team.eventColor, 
                team.eventTextColor, 
                team.slugs || [], 
                team.disableSlugs || [], 
                team.image_url, 
                false
              );
              cancelAllScheduledNotifications();
              refresh();
            }} 
          />
        ) : (
          <EventBtn 
            iconUrl={icons.notificationOff} 
            dimension="60%" 
            handlePress={() => {
              updateTeam(
                team.teamName, 
                team.backgroundColor, 
                team.secondColor, 
                team.eventColor, 
                team.eventTextColor, 
                team.slugs || [], 
                team.disableSlugs || [], 
                team.image_url, 
                true
              );
              refresh();
            }} 
          />
        )}
        <EventBtn 
          iconUrl={icons.filter} 
          dimension="60%" 
          handlePress={() => {
            router.push(`/team/edit/${team.teamName}`);
          }} 
        />
        <EventBtn 
          iconUrl={icons.delet} 
          dimension="60%" 
          handlePress={async () => {
            await deleteTeam(team.teamName);
            await updateTeams(teams.filter(t => t.teamName !== team.teamName));
            cancelAllScheduledNotifications();
            refresh();
          }} 
        />
      </View>
    </View>
  );
};

export default MyTeams;
