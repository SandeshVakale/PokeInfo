import React, {useEffect} from 'react';
import { ScrollView, TouchableOpacity, useWindowDimensions, View, Easing, StyleSheet } from 'react-native';
import { Text as EText } from '@rneui/themed'
import {
    Rect,
    LinearGradient,
    vec,
    Canvas,
    useImage,
    Image,
    Text, 
    useFont,
    RoundedRect,
    Shadow,
    Path,
    runTiming,
    Skia,
    useComputedValue,
    useValue,
  } from "@shopify/react-native-skia";
import {useSelector} from 'react-redux';
import {getPokemon} from '../services/details';
import {Loader} from '../components/loader';
import {Error} from '../components/error';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { typography } from '../theme';
import * as d3 from 'd3';
export const Details = ({route}) => {
  const {isFetching, error, details} = useSelector(
    (state) => state.detailsModel,
  );

  const { pokemon, color, describe } = route.params  
  const navigation = useNavigation();
  const fontSize = 32;
  const font = useFont(require('../font/Redressed-Regular.ttf'), fontSize);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    getPokemon(route.params.pokemon.name);
  }, [route.params.pokemon.name]);
  const image = useImage(pokemon.url);
  const { h2, h3 } = typography;

  const data = details?.stats
    ? details?.stats?.map((item) => {
        return {
          value: item.base_stat,
          label: item.stat.name
          .split('-')
          .map(word => word.slice(0, 2))
          .join(''),
        };
      })
    : [];

    const GRAPH_MARGIN = 20;
    const GRAPH_BAR_WIDTH = 8;

      const CanvasHeight = 350;
      const CanvasWidth = width;
      const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
      const graphWidth = CanvasWidth - 2;
  const textArray = describe.replace('\f', ' ').split('\n')

  const animationState = useValue(0);

  const xDomain = data.map((dataPoint) => dataPoint.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  const yDomain = [
    0,
    d3.max(data, (yDataPoint) => yDataPoint.value),
  ];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const animate = () => {
    animationState.current = 0;

    runTiming(animationState, 1, {
      duration: 1600,
      easing: Easing.inOut(Easing.exp),
    });
  };

  const path = useComputedValue(() => {
    const newPath = Skia.Path.Make();

    data.forEach((dataPoint) => {
      const rect = Skia.XYWHRect(
        x(dataPoint.label) - GRAPH_BAR_WIDTH / 2,
        graphHeight,
        GRAPH_BAR_WIDTH,
        y(dataPoint.value * animationState.current) * -1,
      );

      const rrect = Skia.RRectXY(rect, 8, 8);
      newPath.addRRect(rrect);
    });

    return newPath;
  }, [animationState]);

  useEffect(() => {
    animate()
  }, [details?.stats])
  if (isFetching) {
    return <Loader />;
  }

  if (error.isError) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 73, left: 10, zIndex: 1000 }}>
        <Ionicons name="arrow-back-sharp" size={30} color="white" />
      </TouchableOpacity>
      <Canvas style={{ flex: 1, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
        <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
                start={vec(0, 0)}
                end={vec(256, 256)}
                colors={[color.lightColor, color.darkColor]}
            />
        </Rect>
      </Canvas>
      <ScrollView style={{ width }}>
        <Canvas style={{ width, height: height * 0.85 }}>
        {image && <Image
            image={image}
            fit="contain"
            x={0}
            y={100}
            width={width}
            height={height * 0.5}
            />}
          {font && <Text
                x={50}
                y={40}
                text={pokemon.name.toLocaleUpperCase()}
                font={font}
                color={'white'}
            />}
            {font && textArray.map((item, index) => <Text
                x={10}
                y={height * 0.6 + (index * 34)}
                text={item}
                font={font}
                color={'white'}
            /> )}
        </Canvas>
        <Canvas style={{ width, height: height * 0.8 }}>
          <RoundedRect x={12} y={432} width={width - 24} height={height * 0.25} r={32} color={color.lightColor}>
            <Shadow dx={12} dy={12} blur={25} color={color.darkColor} inner />
            <Shadow dx={-12} dy={-12} blur={25} color={color.mainColor} inner />
          </RoundedRect>
            {details?.height && <><Text
                x={50}
                y={500}
                text={'Height'}
                font={font}
                color={'white'}
            />
            <Text
                x={50}
                y={535}
                text={`${details.height.toString()} m`}
                font={font}
                color={'white'}
            />

            <Text
                x={width - 130}
                y={500}
                text={'Weight'}
                font={font}
                color={'white'}
            />
            <Text
                x={width - 130}
                y={535}
                text={`${details.weight.toString()} kg`}
                font={font}
                color={'white'}
            />
            <Text
                x={width * 0.35}
                y={570}
                text={'Experience'}
                font={font}
                color={'white'}
            />
            <Text
                x={width * 0.45}
                y={610}
                text={details.base_experience.toString()}
                font={font}
                color={'white'}
            /></>}
            <Path path={path} color={color.lightColor} />
              {data.map((dataPoint) => (
                <Text
                  key={dataPoint.label}
                  font={font}
                  x={x(dataPoint.label) - 10}
                  y={CanvasHeight}
                  text={dataPoint.label}
                  color={'white'}
                />
              ))}
        </Canvas>
    <>
      {details?.types?.length > 0 && (
        <View style={styles.wrapper}>
          <EText style={h2}>Types</EText>
          <EText style={h3}>
            {details?.types.map((item) => item?.type?.name).join(', ')}
          </EText>
        </View>
      )}
      {details?.abilities?.length > 0 && (
        <View style={styles.wrapper}>
          <EText style={h2}>Abilities</EText>
          <EText style={h3}>
            {details?.abilities
              .map((item) => item?.ability?.name)
              .join(', ')}
          </EText>
        </View>
      )}
      {details?.forms?.length > 0 && (
        <View style={styles.wrapper}>
          <EText style={h2}>Forms</EText>
          <EText style={h3}>
            {details?.forms.map((item) => item?.name).join(', ')}
          </EText>
        </View>
      )}
      {details?.held_items?.length > 0 && (
        <View style={styles.wrapper}>
          <EText style={h2}>Items</EText>
          <EText style={h3}>
            {details?.held_items
              .map((item) => item?.item?.name)
              .join(', ')}
          </EText>
        </View>
      )}
      {details?.Moves?.length > 0 && (
        <View style={styles.wrapper}>
          <EText style={h2}>Moves</EText>
          <EText style={h3}>
            {details.moves.map((item) => item.move.name).join(', ')}
          </EText>
        </View>
      )}
      </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    padding: 15,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});