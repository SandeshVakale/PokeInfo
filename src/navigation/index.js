import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, useThemeMode, Text, Button } from '@rneui/themed';
import Splash from '../screens/splash';
function HomeScreen() {

    const { mode, setMode } = useThemeMode();
    const { theme } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
      <Text>Home Screen</Text>
      <Button onPress={() => setMode('dark')} title={mode} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Navigation() {
    const { theme } = useTheme();
    const colorScheme = useColorScheme()

    const { setMode } = useThemeMode()

    useEffect(() => {setMode(colorScheme)}, [colorScheme])

  return (
    <NavigationContainer
        theme={theme}
    >
      <Stack.Navigator initialRouteName='Splash'
                screenOptions={() => ({
                    headerShadowVisible: false,
                    gestureEnabled: false,
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                })}>
        <Stack.Screen options={{
            headerShown: false
        }} name="Splash" component={Splash} />
        <Stack.Screen options={{
            headerShown: false
        }} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;