import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../constants';

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

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [team, setTeam] = useState<StoredTeam[]>([]);

  const tabs = ['UPCOMING', 'PAST'];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [headerData, setHeaderData] = useState<string[]>(['COMPETITION', 'MATCH', 'DATE', 'TIME']);

  const handlePressEdit = () => {
    router.push('/team/edit/' + params.team);
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
      try {
        const data = await getObjectData<StoredTeam[]>('teams');
        if (data) {
          const foundTeam = data.filter((t) => t.teamName === params.team);
          setTeam(foundTeam);
        }
      } catch (err) {
        console.error('Error fetching team:', err);
      }
    };
    fetchTeam();
  }, [refreshing]);

  return (
    <View style={{ flex: 1, backgroundColor: team[0]?.backgroundColor || COLORS.headerBg }}>
      <PageHeader
        title={params.team as string}
        rightIcon={icons.settings}
        onRightPress={() => router.push('/settings/settings')}
      />
      <EventTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backgroundColor={team[0]?.eventColor || COLORS.secondary}
        secondColor={team[0]?.secondColor || COLORS.gray}
        textColor={team[0]?.eventTextColor || COLORS.lightWhite}
        eventColor={team[0]?.eventColor || COLORS.secondary}
      />
      <TeamHeader
        secondColor={team[0]?.secondColor || COLORS.gray}
        logo={team[0]?.image_url}
        data={headerData}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: team[0]?.backgroundColor || COLORS.headerBg,
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
        {activeTab === tabs[0] ? <Upcoming teamData={team[0]} /> : <Past teamData={team[0]} />}
      </ScrollView>
      <FixedBtn
        iconUrl={icons.filter2}
        dimension="100%"
        handlePress={handlePressEdit}
        bgColor={team[0]?.eventColor || COLORS.secondary}
      />
      <Navbar />
    </View>
  );
};

export default Team;
