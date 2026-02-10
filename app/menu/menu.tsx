import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, icons, SIZES } from '../../constants';
import { Navbar, MyTeams, FixedBtn, GradientBackground, PageHeader } from '../../components';
import { StoredTeam } from '../../types/api';

import { getObjectData, storeObjectData } from '../../storage/data';

const Menu: React.FC = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<StoredTeam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const updateTeams = (newTeams: StoredTeam[]) => {
    setTeams(newTeams);
  };

  const handlePressAdd = () => {
    router.push('/team/addDefault');
  };

  const handlePressSettings = () => {
    router.push('/settings/settings');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  useEffect(() => {
    getObjectData<string>('token').then((value) => {
      if (value === null) {
        storeObjectData('token', '');
        router.replace('/token/initToken');
      } else if (value === '') {
        router.replace('/token/initToken');
      }
    });

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
  }, [refreshing]);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <PageHeader
          title="My Teams"
          rightIcon={icons.settings}
          onRightPress={handlePressSettings}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginBottom: 30 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => setRefreshing(false), 1000);
              }}
            />
          }
        >
          <Text
            style={{
              color: COLORS.lightWhite,
              fontSize: SIZES.medium,
              fontWeight: 'bold',
              marginVertical: 20,
              textAlign: 'center',
              fontFamily: 'RogueHero2',
            }}
          >
            MY TEAMS
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : (
              teams.map((team) => (
                <MyTeams
                  key={team.id}
                  team={team}
                  teams={teams}
                  updateTeams={setTeams}
                  iconUrl={team.image_url}
                  refresh={handleRefresh}
                />
              ))
            )}
          </View>
        </ScrollView>
        <FixedBtn
          iconUrl={icons.plus}
          dimension="60%"
          handlePress={handlePressAdd}
          bgColor={COLORS.addBtnBg}
        />
        <Navbar />
      </GradientBackground>
    </View>
  );
};

export default Menu;
