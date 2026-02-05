import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { AppProvider } from '../contexts/AppContext';
import { preloadCriticalComponents } from '../components/lazy/LazyComponents';

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
            // Preload des composants critiques une fois l'app stable
            preloadCriticalComponents();
        }
    }, [fontsLoaded, fontError]);

    // Ne pas rendre l'app tant que les polices ne sont pas chargées
    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <AppProvider>
            <Stack
                screenOptions={{
                    headerShown: true,
                }}
            />
            <Toast 
                position='bottom'
                bottomOffset={100}
                visibilityTime={3500}
            />
        </AppProvider>
    );
};

export default Layout;
