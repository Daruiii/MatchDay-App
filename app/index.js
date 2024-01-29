import { View, Text, ScrollView, Image, ActivityIndicator, Pressable, RefreshControl, ImageBackground } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES, images } from '../constants';
import { HeaderBtn, Navbar, Next, FixedBtn, UpcomingRow } from '../components';
import { getNextMatch } from '../hooks/setNotifications';

import { getObjectData, storeObjectData, removeObjectData } from '../storage/data';


const Home = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => { // check if token is set
        getObjectData('token').then((value) => {
            if (value === null) {
                storeObjectData('token', '');
                router.replace('/token/initToken');
            }
            else if (value === '') {
                router.replace('/token/initToken');
                // alert("Please enter your PandaScore Token");
            }
            else {
                setToken(value);
            }
        });
        const fetchNotifSettings = async () => {
            try {
                const data = await getObjectData("notifSwitch");
                if (data) {
                    // console.log(data);
                }
                if (!data) {
                    storeObjectData("notifSwitch", {
                        0: true,
                    });
                }
            }
            catch (err) {
                setError(err.message);
            }
        };
        fetchNotifSettings();
        const fetchTeams = async () => { // fetch teams from storage
            setIsLoading(true);
            try {
                const data = await getObjectData("teams");
                if (data) {
                    setTeams(data);
                }
                if (!data) {
                    storeObjectData("teams", data);
                }
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchTeams();
    }, [refreshing]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const teamsToNotify = teams.filter((team) => team.notificate === true);
            const slugs = teamsToNotify?.map((team) => team.slugs);
            // console.log(slugs.flat());
            teamsToNotify?.map(async (team) => {
                // console.log(team.slugs);
                getNextMatch(team.slugs);
            });
        }
        fetchNotifications();
    }
        , [teams]);


    const handlePressAdd = () => {
        router.replace('/team/addDefault');
    }
    const handlePressAddDefault = () => {
        router.replace('/team/addDefault');
    }

    const handlePressMenu = () => {
        router.replace('/menu/menu');
    }

    const handlePressSettings = () => {
        router.replace('/settings/settings');
    }
    const handlePressGo = (teamName) => {
        router.replace(`/team/${teamName}`)
        console.log(teamName);
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={images.background} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }} blurRadius={1}>
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: COLORS.headerBg,
                        },
                        headerTitleStyle: {
                            color: COLORS.lightWhite,
                            fontSize: SIZES.xxLarge,
                            fontFamily: 'RogueHero',
                        },
                        // headerShadowVisible: true,
                        headerBackVisible: false,
                        headerLeft: () => (
                            <HeaderBtn iconUrl={icons.menu} dimension="60%" handlePress={handlePressMenu} />
                        ),
                        headerRight: () => (
                            <HeaderBtn iconUrl={icons.settings} dimension="50%" handlePress={handlePressSettings} />
                        ),
                        headerTitle: () => (
                            <Image source={images.icon} resizeMode="contain" style={{
                                width: 50, height: 40, tintColor: COLORS.lightWhite,
                            }} />
                        ),
                        headerTitleAlign: 'center',
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}
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
                    <View
                        style={{
                            flex: 1,
                            padding: SIZES.medium,
                            marginBottom: 95,
                        }}  >
                        {isLoading ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : (
                            teams?.length > 0 ? (
                                teams.map((team, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: team.secondColor, fontSize: SIZES.large, fontWeight: "bold", textAlign: 'center' }}>
                                                    -
                                                </Text>
                                                <Pressable onPress={() => handlePressGo(team.teamName)}>
                                                    <View style={{
                                                        borderRadius: 50, backgroundColor: team?.eventColor,
                                                        shadowColor: team?.secondColor,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 5,
                                                        },
                                                        shadowOpacity: 0.50,
                                                        shadowRadius: 3.84,
                                                        borderColor: team?.secondColor, borderWidth: 1 / 4, width: 40, height: 40,
                                                        justifyContent: 'center', alignItems: 'center', marginHorizontal: 20,
                                                    }}>
                                                        <Image source={{ uri: team.image_url }} style={{
                                                            width: 25, height: 25,
                                                        }} resizeMode="contain" />
                                                    </View>
                                                </Pressable>
                                                <Text style={{ color: team.secondColor, fontSize: SIZES.large, fontWeight: "bold", textAlign: 'center' }}>
                                                    -
                                                </Text>
                                            </View>
                                            <UpcomingRow teamData={team} />
                                        </View>
                                    )
                                })
                            ) : (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 600 }}>
                                    <Pressable onPress={handlePressAddDefault} style={{
                                        backgroundColor: COLORS.secondary, padding: 10, borderRadius: 10,
                                        shadowColor: COLORS.white,
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 0.34,
                                        shadowRadius: 6.27,
                                        elevation: 10,
                                        marginHorizontal: 60, marginTop: 20
                                    }}>
                                        <Text style={{ color: COLORS.gray, fontSize: SIZES.medium, fontFamily: "RogueHero2", textAlign: 'center' }}>
                                            See the default teams
                                        </Text>
                                    </Pressable>
                                </View>
                            )
                        )}
                    </View>

                </ScrollView>
                <FixedBtn iconUrl={icons.plus} dimension="60%" handlePress={handlePressAdd} bgColor={COLORS.addBtnBg} />
                <Navbar />
            </ImageBackground>
        </View>
    );
}

export default Home;