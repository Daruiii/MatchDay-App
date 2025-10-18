import { View, Text, ScrollView, Image, ImageBackground, Pressable } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES, images } from '../../../constants';
import { HeaderBtn, Navbar, TeamForm } from '../../../components';

import { getObjectData } from '../../../storage/data';

const Update = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState([]);

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }
    useEffect(() => {
        const fetchTeam = async () => {
            setIsLoading(true);
            try {
                const data = await getObjectData("teams");
                if (data) {
                    const team = data.filter(team => team.teamName === params.teamToUpdate);
                    setTeam(team)
                }
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchTeam();
    }, []);

    if (team.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.headerBg }}>
                <ImageBackground source={images.background} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }} blurRadius={1}>
                </ImageBackground>
            </View>
        )
    }
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
                            fontSize: SIZES.xLarge,
                            fontWeight: "bold",
                            fontFamily: 'RogueHero',
                        },
                        headerShadowVisible: true,
                        headerBackVisible: false,
                        headerLeft: () => (
                            <HeaderBtn
                                iconUrl={icons.chevronLeft}
                                dimension="60%"
                                handlePress={() => router.back()}
                            />
                        ),
                        headerTitle: () => (
                            <Pressable onPress={() => { router.replace('/') }}>
                            <Image source={images.icon} resizeMode="contain" style={{
                                width: 50, height: 40, tintColor: COLORS.lightWhite,
                            }} />
                            </Pressable>
                        ),
                        headerTitleAlign: 'center',
                    }}
                />
                <ScrollView>
                    <View style={{ flex: 1, marginBottom: 90 }}>
                        <Image source={{ uri: team[0].image_url }} style={{ width: 40, height: 40, alignSelf: 'center', marginTop: 20 }} resizeMode='contain' />
                        <Text style={{ color: COLORS.lightWhite, fontSize: SIZES.medium, fontFamily: "RogueHero2", marginTop: 20, textAlign: 'center' }}>
                            UPDATE TEAM
                        </Text>
                        <TeamForm updateTeams={updateTeams} teams={teams} team={team} />
                    </View>
                </ScrollView>

                <Navbar />
            </ImageBackground>
        </View>
    )
}

export default Update;