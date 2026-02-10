import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { COLORS, SIZES } from '../../../constants';
import { Navbar, TeamForm, GradientBackground, PageHeader } from '../../../components';
import { StoredTeam } from '../../../types/api';

import { getObjectData } from '../../../storage/data';

const Update: React.FC = () => {
  const params = useLocalSearchParams<{ teamToUpdate: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<StoredTeam[]>([]);
  const [team, setTeam] = useState<StoredTeam[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const data = await getObjectData<StoredTeam[]>('teams');
        if (data) {
          const team = data.filter((t) => t.teamName === params.teamToUpdate);
          setTeam(team);
          setTeams(data);
        }
      } catch (err) {
        setError((err as Error).message);
      }
      setIsLoading(false);
    };
    fetchTeam();
  }, []);

  if (team.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.headerBg }}>
        <GradientBackground>
          <></>
        </GradientBackground>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <PageHeader title="Edit" />
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 90 }}>
            <Image
              source={{ uri: team[0].image_url }}
              style={{ width: 40, height: 40, alignSelf: 'center', marginTop: 20 }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: COLORS.lightWhite,
                fontSize: SIZES.medium,
                fontFamily: 'RogueHero2',
                marginTop: 20,
                textAlign: 'center',
              }}
            >
              UPDATE TEAM
            </Text>
            <TeamForm updateTeams={setTeams} teams={teams} team={team} />
          </View>
        </ScrollView>

        <Navbar />
      </GradientBackground>
    </View>
  );
};

export default Update;
