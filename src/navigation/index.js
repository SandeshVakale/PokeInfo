import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, useThemeMode, Text, Button } from '@rneui/themed';
import { typography } from '../theme';
import Splash from '../screens/splash';
import { List } from '../screens/list';
import { Details } from '../screens/details';

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
        }} name="List" component={List} />
      <Stack.Screen options={{
            headerShown: false
        }} name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;