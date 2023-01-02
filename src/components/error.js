import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { typography } from '../theme';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme, Text } from '@rneui/themed';

export const Error = ({error}) => {
  const {h1, h4} = typography;
  const { theme } = useTheme()
  return (
    <SafeAreaView style={[styles.container, { 
        backgroundColor: theme.colors.background }]}>
      <MaterialIcons name="error" size={60} color={theme.colors.error} />
      <Text style={h1}>{error.code}</Text>
      <Text style={h4}>{error.message}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Error;