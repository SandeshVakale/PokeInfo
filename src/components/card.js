import React, { useEffect, useState } from "react";

import {
    Shadow,
    LinearGradient,
    vec,
    RoundedRect,
    Canvas,
    useImage,
    Image,
    Text, 
    useFont,
  } from "@shopify/react-native-skia";
import { useWindowDimensions, Dimensions, StyleSheet } from "react-native";
import { ColorModifier } from "../utils/colorModifiers";
import { GetSpeciesDetails } from "../utils/getSpecies";
const CardMemo = ({
    index,
    pokemon,
    navigation,
  }) => {
  const image = useImage(pokemon.url);
  const [species, setSpecies] = useState(null);

  const { height, width } = useWindowDimensions();
  useEffect(() => {
      GetSpeciesDetails(pokemon.name)?.then(data => setSpecies(data.data));
  }, []);

  const {lightColor, darkColor, mainColor} = ColorModifier(
    species?.color?.name,
  );
  const fontSize = 32;
  const font = useFont(require('../font/Redressed-Regular.ttf'), fontSize);
  const imageBall = useImage(require("../images/Pokeball.png"));
  if (!image && !imageBall) {
    return null;
  }
  if (font === null) {
    return null;
  }
    return (
      <Canvas key={index} style={{ width: width, height: height * 0.35 }}>
        <RoundedRect x={32} y={32} width={width * 0.85 } height={height * 0.3 } r={32} color={mainColor}>
          <Shadow dx={12} dy={12} blur={25} color={lightColor} inner />
          <Shadow dx={-12} dy={-12} blur={25} color={darkColor} inner />
          <LinearGradient
            start={vec(0, 0)}
            end={vec(256, 256)}
            colors={[lightColor, darkColor]}
          />
        </RoundedRect>
          {imageBall && <Image
            image={imageBall}
            x={width * 0.15}
            y={150}
            width={150}
            height={150}
            fit="cover"
          />}
        {image && <Image
            image={image}
            fit="contain"
            x={width * 0.50}
            y={100}
            width={width * 0.4}
            height={height * 0.25}
            />}
            {font && <Text
                x={width * 0.15}
                y={70}
                text={pokemon.name.toLocaleUpperCase()}
                font={font}
            />}
            {font && species?.shape && <Text
                x={width * 0.15}
                y={120}
                text={species.shape.name}
                font={font}
            />}
      </Canvas>
    );
  };

  function arePropsEqual(
    prevProps,
    nextProps,
  ) {
    /*
      return true if passing nextProps to render would return
      the same result as passing prevProps to render,
      otherwise return false
      */
    return (
      nextProps.pokemon.name === prevProps.pokemon.name &&
      nextProps.pokemon.url === prevProps.pokemon.url
    );
  }
  
  export const Card = React.memo(CardMemo, arePropsEqual);


const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('window').height * 0.2,
      width: Dimensions.get('window').width * 0.45,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderRadius: 20,
      padding: 15,
      margin: 10,
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      right: -20,
      bottom: 0,
      zIndex: 100,
      height: Dimensions.get('window').height * 0.12,
      width: Dimensions.get('window').width * 0.4,
      resizeMode: 'contain',
    },
    subtitleContainer: {
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      height: 120,
      width: 120,
      borderRadius: 60,
      position: 'absolute',
      right: -20,
      bottom: -20,
    },
  });