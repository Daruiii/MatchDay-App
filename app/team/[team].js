import { View, Text, ScrollView, Image, RefreshControl, Pressable } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES, images } from '../../constants';
import { HeaderBtn, Navbar, EventTabs, FixedBtn, Upcoming, TeamHeader, Past } from '../../components';

import { getObjectData, storeObjectData } from '../../storage/data';
import { getTeamLogo } from '../../hooks/getAllSlugs';

const Team = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [team, setTeam] = useState([]);
    const [logo, setLogo] = useState(null);

    const tabs = ["UPCOMING", "PAST"];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [headerData, setHeaderData] = useState(["COMPETITION", "MATCH", "DATE", "TIME"]);

    const handlePressEdit = () => {
        router.push('/team/edit/' + params.team);
    };

    const displayTabsContent = (team) => {
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
            setHeaderData(["COMPETITION", "MATCH", "DATE", "TIME"]);
        } else if (activeTab === tabs[1]) {
            setHeaderData(["COMPETITION", "MATCH", "REPLAY", "DATE"]);
        }

    }, [activeTab, params.team]);

    useEffect(() => {
        getObjectData('token').then((value) => {
            if (value === null) {
                storeObjectData('token', '');
                router.replace('/token/initToken');
            }
            else if (value === '') {
                router.replace('/token/initToken');
                // alert("Please enter your PandaScore Token");
            }
        }
        );
        const fetchTeam = async () => {
            setIsLoading(true);
            try {
                const data = await getObjectData("teams");
                if (data) {
                    const team = data.filter(team => team.teamName === params.team);
                    setTeam(team)
                }
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchTeam();
    }, [refreshing]);

    return (
        <View style={{ flex: 1, backgroundColor: team[0]?.backgroundColor }}>

            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.headerBg,
                    },
                    headerTitleStyle: {
                        color: COLORS.lightWhite,
                        fontSize: SIZES.xLarge,
                        fontWeight: "bold",
                        fontFamily: 'RogueHero',
                    },
                    headerShadowVisible: true,
                    headerBackVisible: false,
                    headerRight: () => (
                        <HeaderBtn
                            iconUrl={icons.settings}
                            dimension="60%"
                            handlePress={() => router.push('/settings/settings')}
                        />
                    ),
                    headerLeft: () => (
                        <HeaderBtn
                            iconUrl={icons.menu}
                            dimension="60%"
                            handlePress={() => router.push('/menu/menu')}
                        />
                    ),
                    headerTitle:() => (
                        <Pressable onPress={() => { router.replace('/') }}>
                        <Image source={images.icon} resizeMode="contain" style={{
                            width: 50, height: 40, tintColor: COLORS.lightWhite,
                        }} />
                        </Pressable>
                    ),
                    headerTitleAlign: 'center',
                }}
            />
            <EventTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}
                backgroundColor={team[0]?.eventColor} secondColor={team[0]?.secondColor} textColor={team[0]?.eventTextColor}
            />
            <TeamHeader secondColor={team[0]?.secondColor} logo={team[0]?.image_url} data={headerData} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                flex: 1, backgroundColor: team[0]?.backgroundColor
            }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            setTimeout(() => setRefreshing(false), 1000);
                        }
                        }
                    />
                }
            >

                {displayTabsContent(team[0])}
            </ScrollView>
            <FixedBtn iconUrl={icons.filter2} dimension="100%" handlePress={handlePressEdit} bgColor={team[0]?.eventColor} />
            <Navbar />
        </View>
    )
}

export default Team;