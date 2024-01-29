import { View, Text, ScrollView, ActivityIndicator, Pressable, Image, ImageBackground, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES, images } from '../../constants';
import { HeaderBtn, Navbar, MyTeams, FixedBtn, NotifSwitch } from '../../components';

import { getObjectData, storeObjectData } from '../../storage/data';

const Settings = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePressBack = () => {
        router.back();
    }

    useEffect(() => {

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
                        headerTitleAlign: 'center',
                        headerShadowVisible: true,
                        headerBackVisible: false,
                        headerLeft: () => (
                            ""
                        ),
                        headerRight: () => (
                            ""
                        ),
                        headerTitle: () => (
                            <Pressable onPress={() => { router.replace('/') }}>
                            <Image source={images.icon} resizeMode="contain" style={{
                                width: 50, height: 40, tintColor: COLORS.lightWhite,
                            }} />
                            </Pressable>
                        ),
                    }}
                />

                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                        <View style={{
                            flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20, display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Pressable style={{
                                justifyContent: 'space-between', backgroundColor: COLORS.gray2,
                                padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center',
                                marginBottom: 15, width: "100%"
                            }} onPress={() => {
                                router.replace('/token/initToken');
                            }}>
                                <Text style={{ color: COLORS.gray, fontSize: SIZES.medium, fontFamily: 'RogueHero2', }}>PandaScore Token</Text>
                                <Image source={icons.chevronRight} resizeMode="contain" style={{ width: 20, height: 20, tintColor: COLORS.gray }} />
                            </Pressable>
                            <Text style={{ color: COLORS.lightWhite, fontSize: SIZES.medium, fontFamily: 'RogueHero2', }}>Notifications 🔔</Text>

                            <View style={{
                                flexDirection: 'column', padding: 10, borderRadius: 10, justifyContent: 'space-between',
                                backgroundColor: COLORS.gray2, alignItems: 'center', width: "100%", marginVertical: 5,
                                gap: 15
                            }}>
                                <NotifSwitch time={0} />
                                <NotifSwitch time={5} />
                                <NotifSwitch time={10} />
                                <NotifSwitch time={30} />
                            </View>
                        </View>
                    )}
                </ScrollView>
                <Navbar />
            </ImageBackground>
        </View>
    )
}

export default Settings;