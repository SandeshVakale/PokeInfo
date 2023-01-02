import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Redressed_400Regular } from '@expo-google-fonts/redressed';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/store';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@rneui/themed';
import Navigation from './src/navigation';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    let [fontsLoaded] = useFonts({
      Redressed_400Regular
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
                <SafeAreaProvider>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <Navigation />
                        </PersistGate>
                    </Provider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});