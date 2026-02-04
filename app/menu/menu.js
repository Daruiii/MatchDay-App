import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES } from '../../constants';
import { Navbar, MyTeams, FixedBtn, GradientBackground, PageHeader } from '../../components';

import { getObjectData, storeObjectData, updateObjectData } from '../../storage/data';
import refresh from '../../hooks/autoReloadToken';
import { getNotificationActive, scheduleNotification, cancelScheduledNotification, cancelAllScheduledNotifications } from '../../hooks/setNotifications';

const Menu = () => {
    const router = useRouter();
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logos, setLogos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [nextNotificationsDetails, setNextNotificationsDetails] = useState([]);

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }

    const handlePressAdd = () => {
        router.push('/team/addDefault');
    }

    const handlePressSettings = () => {
        router.push('/settings/settings');
    }

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }
            , 100);
    }

    useEffect(() => {
        // LogoApiData().then((retrievedLogos) => {
        //     setLogos(retrievedLogos);
        //     setIsLoading(false);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        getObjectData('token').then((value) => {
            if (value === null) {
                storeObjectData('token', '');
                router.replace('/token/initToken');
            }
            else if (value === '') {
                router.replace('/token/initToken');
                // alert("Please enter your PandaScore Token");
            }
        });
        const fetchTeams = async () => {
            setIsLoading(true);
            try {
                const data = await getObjectData("teams");
                if (data) {
                    setTeams(data);
                }
            } catch (err) {
                setError(err.message);
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
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 30 }}
                  refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            setTimeout(() => setRefreshing(false), 1000);
                        }}
                    />
                }>
                    <Text style={{ color: COLORS.lightWhite, fontSize: SIZES.medium, fontWeight: "bold", marginVertical: 20, textAlign: 'center', fontFamily: "RogueHero2" }}>MY TEAMS</Text>
                    <ScrollView vertical showsVerticalScrollIndicator={true}
                        indicatorStyle='black'
                        justifyContent="center"
                        alignItems="center"
                        >
                        {isLoading ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : error ? (
                            <Text>Something went wrong</Text>
                        ) : teams.map((team) => (
                            <MyTeams
                                key={team.id}
                                team={team}
                                teams={teams}
                                updateTeams={updateTeams}
                                iconUrl={team.image_url}
                                refresh={handleRefresh}
                            />
                        ))}
                    </ScrollView>

                    {/* <Pressable
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius,
                            padding: SIZES.medium,
                            margin: SIZES.medium,
                        }}
                        onPress={() => {
                            getNotificationActive()
                        }
                        }
                    >
                        <Text style={{ color: COLORS.lightWhite, fontSize: SIZES.medium, fontWeight: "bold", marginVertical: 20, textAlign: 'center', fontFamily: "RogueHero2" }}>CHECK NOTIFICATIONS</Text>
                    </Pressable> */}
                </ScrollView>
                <FixedBtn iconUrl={icons.plus} dimension="60%" handlePress={handlePressAdd} bgColor={COLORS.addBtnBg} />
                <Navbar teams={teams} />
            </GradientBackground>
        </View>
    )
}

export default Menu;