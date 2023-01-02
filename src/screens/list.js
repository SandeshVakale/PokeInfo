import React, {useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import { CoonsPatchMeshGradient } from "../components/aruroa/CoonsPatchMeshGradient";
import {getPokemons} from '../services/list';
import {useSelector} from 'react-redux';
import {store} from '../store';
import {SET_PAGE} from '../store/list';
import {Card} from '../components/card';
import {Error} from '../components/error';
import {Loader} from '../components/loader';

export const List = () => {
  const {listResults, isFetching, error, page} = useSelector(
    (state) => state.listModel,
  );
  const navigation =
    useNavigation();
  const pageSize = 10;
  useEffect(() => {
    getPokemons(pageSize, (page - 1) * pageSize);
  }, [page]);
  if (isFetching && listResults.length <= 0) {
    return <Loader />;
  }

  if (error.isError) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
        <CoonsPatchMeshGradient
          rows={3}
          cols={3}
          colors={palette.skia} 
          play
          />
        <FlatList
        initialNumToRender={listResults.length}
        data={listResults}
        renderItem={({item, index}) => (
          <Card
            index={index}
            pokemon={item}
            isColored
            navigation={navigation}
          />
        )}
        refreshing={isFetching}
        onEndReachedThreshold={0.9}
        onEndReached={() =>
          store.dispatch({
            type: SET_PAGE,
            payload: page + 1,
          })
        }
        ListFooterComponent={
          isFetching ? (
            <ActivityIndicator style={styles.activtyContainer} />
          ) : (
            <View />
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  activtyContainer: {
    alignSelf: 'center',
    height: 200,
    width: Dimensions.get('screen').width,
  },
});

const palette = {
  otto: [
    "#FEF8C4",
    "#E1F1D5",
    "#C4EBE5",
    "#ECA171",
    "#FFFCF3",
    "#D4B3B7",
    "#B5A8D2",
    "#F068A1",
    "#EDD9A2",
    "#FEEFAB",
    "#A666C0",
    "#8556E5",
    "#DC4C4C",
    "#EC795A",
    "#E599F0",
    "#96EDF2",
  ],
  will: [
    "#2D4CD2",
    "#36B6D9",
    "#3CF2B5",
    "#37FF5E",
    "#59FB2D",
    "#AFF12D",
    "#DABC2D",
    "#D35127",
    "#D01252",
    "#CF0CAA",
    "#A80DD8",
    "#5819D7",
  ],
  skia: [
    "#61DAFB",
    "#dafb61",
    "#61fbcf",
    "#61DAFB",
    "#fb61da",
    "#61fbcf",
    "#dafb61",
    "#fb61da",
    "#61DAFB",
    "#fb61da",
    "#dafb61",
    "#61fbcf",
    "#fb61da",
    "#61DAFB",
    "#dafb61",
    "#61fbcf",
  ],
};