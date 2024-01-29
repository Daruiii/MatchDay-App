import { Stack } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, Image, StyleSheet } from 'react-native';

import { COLORS, icons, SIZES, images } from '../constants';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

const LoadingScreen = () => {
    return (
        <View style={{
            flex: 1, backgroundColor: COLORS.headerBg,
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Image
                source={images.icon}
                resizeMode="contain"
                style={{
                    width: "100%",
                    height: 100,
                }}
            />
        </View>
    );
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        RogueHero: require('../assets/fonts/roguehero3d.ttf'),
        RogueHero2: require('../assets/fonts/roguehero-complete.ttf'),
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            setTimeout(async () => {
                setIsLoading(true);
            }, 2000);
        }
    }, [fontsLoaded]);

    const onLayoutRootView = useCallback(async () => {
        if (isLoading) {
            await SplashScreen.hideAsync();
        }
    }, [isLoading]);

    if (!isLoading) {
        console.log('Loading...');
        return <LoadingScreen />;
    }

    return <Stack 
    onLayout={onLayoutRootView}
    options={{
        headerBackVisible: false,
    }}
    />;
}

export default Layout;