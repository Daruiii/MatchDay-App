import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StoredTeam } from '../../types/api';

import styles from './defaultTeams.style';

interface DefaultTeamsProps {
  index: number;
  team: StoredTeam;
  addTeam: (team: StoredTeam) => void;
}

const DefaultTeams: React.FC<DefaultTeamsProps> = ({ index, team, addTeam }) => {
  const router = useRouter();

  return (
    <Pressable
      key={index}
      onPress={() => {
        addTeam(team);
      }}
      style={(styles.container as any)(team?.secondColor, team?.eventColor)}
    >
      <Image
        source={{ uri: team?.image_url }}
        style={{ width: 75, height: 75, margin: 10, alignSelf: 'center' }}
        resizeMode="contain"
      />
      <Text style={(styles.headText as any)(team?.eventTextColor)}>{team?.displayedName}</Text>
    </Pressable>
  );
};

export default DefaultTeams;
