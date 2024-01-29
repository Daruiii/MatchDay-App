import { View, Text, ScrollView, ImageBackground, Pressable, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES, images } from '../../constants';
import { HeaderBtn, Navbar, TeamForm } from '../../components';

import { getObjectData } from '../../storage/data';

const Add = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }

    useEffect(() => {
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
    }, []);

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
                            ""
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
                <Text style={{ color: COLORS.white, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 20, textAlign: 'center' }}>
                    ADD A TEAM
                </Text>
                <ScrollView>
                    <View style={{ flex: 1,marginBottom:95 }}>
                        {/* <Text style={{ color: COLORS.white, fontSize: SIZES.medium, fontWeight: "bold", marginTop: 20, textAlign: 'center' }}>
                            TEAM INFORMATIONS
                        </Text> */}
                        <TeamForm updateTeams={updateTeams} teams={teams} team={[]} />
                    </View>
                </ScrollView>

                <Navbar />
            </ImageBackground>
        </View>
    )
}

export default Add;