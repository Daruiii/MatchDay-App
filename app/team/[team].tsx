import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { icons } from '../../constants';
import {
  Navbar,
  EventTabs,
  FixedBtn,
  Upcoming,
  TeamHeader,
  Past,
  PageHeader,
} from '../../components';
import { StoredTeam } from '../../types/api';

import { getObjectData, storeObjectData } from '../../storage/data';

const Team: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ team: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<StoredTeam[]>([]);

  const tabs = ['UPCOMING', 'PAST'];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [headerData, setHeaderData] = useState<string[]>([
    'COMPETITION',
    'MATCH',
    'DATE',
    'TIME',
  ]);

  const handlePressEdit = () => {
    router.push('/team/edit/' + params.team);
  };

  const displayTabsContent = (team: StoredTeam) => {
    switch (activeTab) {
      case tabs[0]:
        return <Upcoming teamData={team} />;
      case tabs[1]:
        return <Past teamData={team} />;
      default:
        return <Upcoming teamData={team} />;
    }
  };

  useEffect(() => {
    if (activeTab === tabs[0]) {
      setHeaderData(['COMPETITION', 'MATCH', 'DATE', 'TIME']);
    } else if (activeTab === tabs[1]) {
      setHeaderData(['COMPETITION', 'MATCH', 'REPLAY', 'DATE']);
    }
  }, [activeTab, params.team]);

  useEffect(() => {
    getObjectData<string>('token').then((value) => {
      if (value === null) {
        storeObjectData('token', '');
        router.replace('/token/initToken');
      } else if (value === '') {
        router.replace('/token/initToken');
      }
    });

    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const data = await getObjectData<StoredTeam[]>('teams');
        if (data) {
          const team = data.filter((team) => team.teamName === params.team);
          setTeam(team);
        }
      } catch (err) {
        setError((err as Error).message);
      }
      setIsLoading(false);
    };
    fetchTeam();
  }, [refreshing]);

  return (
    <View style={{ flex: 1, backgroundColor: team[0]?.backgroundColor }}>
      <PageHeader
        title={params.team as string}
        rightIcon={icons.settings}
        onRightPress={() => router.push('/settings/settings')}
      />
      <EventTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backgroundColor={team[0]?.eventColor}
        secondColor={team[0]?.secondColor}
        textColor={team[0]?.eventTextColor}
        eventColor={team[0]?.eventColor}
      />
      <TeamHeader
        secondColor={team[0]?.secondColor}
        logo={team[0]?.image_url}
        data={headerData}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: team[0]?.backgroundColor,
        }}
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
        {team[0] && displayTabsContent(team[0])}
      </ScrollView>
      <FixedBtn
        iconUrl={icons.filter2}
        dimension="100%"
        handlePress={handlePressEdit}
        bgColor={team[0]?.eventColor}
      />
      <Navbar />
    </View>
  );
};

export default Team;
