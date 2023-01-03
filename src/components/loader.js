import React from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import { useTheme } from '@rneui/themed';

export const Loader = () => {

  const { theme } = useTheme();  

  return (
    <SafeAreaView style={[styles.container, { 
        backgroundColor: theme.colors.background }]}>
      <ActivityIndicator />
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

export default Loader;