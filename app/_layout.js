import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Empêcher le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded, fontError] = useFonts({
        'RogueHero': require('../assets/fonts/roguehero3d.ttf'),
        'RogueHero2': require('../assets/fonts/roguehero-complete.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            // Cacher le splash screen une fois les polices chargées
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    // Ne pas rendre l'app tant que les polices ne sont pas chargées
    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: true,
            }}
        />
    );
};

export default Layout;
