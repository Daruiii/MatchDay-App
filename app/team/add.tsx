import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { COLORS, SIZES } from '../../constants';
import { Navbar, TeamForm, GradientBackground, PageHeader } from '../../components';
import { StoredTeam } from '../../types/api';

import { getObjectData } from '../../storage/data';

const Add: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<StoredTeam[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const data = await getObjectData<StoredTeam[]>('teams');
        if (data) {
          setTeams(data);
        }
      } catch (err) {
        setError((err as Error).message);
      }
      setIsLoading(false);
    };
    fetchTeams();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <PageHeader title="New Team" />
        <Text style={{ 
          color: COLORS.white, 
          fontSize: SIZES.medium, 
          fontFamily: 'RogueHero2', 
          marginTop: 20, 
          textAlign: 'center' 
        }}>
          ADD A TEAM
        </Text>
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 95 }}>
            <TeamForm updateTeams={setTeams} teams={teams} team={[]} />
          </View>
        </ScrollView>

        <Navbar />
      </GradientBackground>
    </View>
  );
};

export default Add;
