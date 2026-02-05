import { View, Text, ScrollView, ActivityIndicator, Modal, TouchableOpacity, Pressable, TextInput, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { COLORS, icons, SIZES, images } from '../../constants';
import { HeaderBtn, Navbar, MyTeams, FixedBtn } from '../../components';

import { getObjectData, storeObjectData, updateObjectData } from '../../storage/data';
import { storeSecureToken, getSecureToken, hasValidToken } from '../../storage/secureStorage';
import { navigateSecurely } from '../../utils/urlValidator';

const InitToken = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePressHein = () => {
        setModalVisible(true);//https://app.pandascore.co/login
    }

    const handlePressBack = () => {
        router.back();
    }

    const handlePressSave = async () => {
        const success = await storeSecureToken(token);
        if (success) {
            router.push('/');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Invalid Token',
                text2: 'Please check your token format',
            });
        }
    }

    useEffect(() => {
        const fetchToken = async () => {
            setIsLoading(true);
            try {
                const token = await getSecureToken();
                setToken(token || '');
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchToken();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.gray }}>

            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.gray2,
                    },
                    headerTitleStyle: {
                        color: COLORS.pandaBlack,
                        fontSize: SIZES.large,
                        fontFamily: 'RogueHero2',
                    },
                    headerShadowVisible: true,
                    headerBackVisible: false,
                    headerLeft: () => (
                       ""
                    ),
                    headerRight: () => (
                        <HeaderBtn iconUrl={icons.hein} dimension="60%" handlePress={handlePressHein} />
                    ),
                    headerTitle: () => (
                        <Pressable onPress={() => { router.replace('/') }}>
                            <Image source={images.icon} resizeMode="contain" style={{
                                width: 50, height: 40, tintColor: COLORS.black,
                            }} />
                        </Pressable>
                        ),
                    headerTitleAlign: 'center',
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: COLORS.gray }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(false);
                            }}
                        >
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.blackTR }}>
                                <TouchableOpacity
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    onPress={() => {
                                        setModalVisible(false);
                                    }}
                                />
                                <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white, width: "90%", height: "35%", borderRadius: 20, borderWidth: 2, borderColor: COLORS.pandaPurple }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap:15 }}>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.medium, fontFamily:"RogueHero",textAlign:"center" }}>
                                            You must set a token to use the application !
                                        </Text>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.large, fontFamily:"RogueHero2",textAlign:"center" }}>
                                            Follow this link to get your token :
                                        </Text>
                                        <Pressable
                                            style={{ backgroundColor: COLORS.pandaPurple, padding: 10, borderRadius: 20, marginTop: 10 }}
                                            onPress={async () => {
                                                setModalVisible(false);
                                                try {
                                                    await navigateSecurely('https://app.pandascore.co/login');
                                                } catch (error) {
                                                    Toast.show({
                                                        type: 'error',
                                                        text1: 'Cannot Open Link',
                                                        text2: 'Please open the link manually in your browser',
                                                    });
                                                }
                                            }}
                                        >
                                            <Text style={{ color: COLORS.white, fontSize: SIZES.large, fontFamily:"RogueHero2", padding: 5 }}>
                                                pandascore.co
                                            </Text>
                                        </Pressable>
                                    </View>

                                </View>
                            </View>
                        </Modal>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.large, fontFamily:"RogueHero2" }}>Token Panda</Text>
                            <Text style={{ color: COLORS.pandaPurple, fontSize: SIZES.large, fontFamily:"RogueHero2" }}>Score</Text>
                        </View>
                        <TextInput style={{
                            backgroundColor: COLORS.gray2,
                            width: "90%", height: "25%",
                            borderRadius: 20, borderWidth: 2,
                            borderColor: COLORS.pandaPurple, padding: 10, fontSize: SIZES.large, fontFamily:"RogueHero2"
                        }}
                            placeholder="Token"
                            value={token}
                            onChangeText={(text) => setToken(text)}
                        />
                        <Pressable
                            style={{ backgroundColor: COLORS.pandaPurple, padding: 10, borderRadius: 20, marginTop: 10 }}
                            onPress={handlePressSave}
                        >
                            <Text style={{ color: COLORS.white, fontSize: SIZES.large, fontFamily:"RogueHero2", padding: 5 }}>
                                Save
                            </Text>
                        </Pressable>
                    </View>
                )}

                <View style={{ borderBottomColor: COLORS.pandaBlack, borderBottomWidth: 2, marginHorizontal: 20 }} />
                <View style={{ borderBottomColor: COLORS.pandaPurple, borderBottomWidth: 2, marginHorizontal: 20 }} />
                <View style={{ borderBottomColor: COLORS.pandaBlack, borderBottomWidth: 2, marginHorizontal: 20 }} />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.large, fontFamily:"RogueHero2" }}>How to get your token ?</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>1. Click on the button on the top right and follow the link</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>2. Create an account or login</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>3. Go to your account</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>4. Copy your token</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>5. Paste it in the input</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>6. Click on save</Text>
                    <Text style={{ color: COLORS.pandaBlack, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 10,textAlign:"center" }}>7. Enjoy !</Text>
                </View>
            </ScrollView>

        </View>
    )
}

export default InitToken;