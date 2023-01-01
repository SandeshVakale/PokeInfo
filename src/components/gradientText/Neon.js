import {
  topLeft,
  topRight,
  Blur,
  LinearGradient,
  Paint,
  BlurMask,
  Group,
  Path,
} from "@shopify/react-native-skia";
import React from "react";

const colors = [
  "#3FCEBC",
  "#3CBCEB",
  "#5F96E7",
  "#816FE3",
  "#9F5EE2",
  "#BD4CE0",
  "#DE589F",
  "#FF645E",
  "#FDA859",
  "#FAEC54",
  "#9EE671",
  "#67E282",
  "#3FCEBC",
];

const blur = 3;
export const Neon = ({ stroke, progress }) => {
  const bounds = stroke.computeTightBounds();
  return (
    <Group>
      <BlurMask style="solid" blur={blur} />
      <Path
        path={stroke}
        color="transparent"
        strokeCap="round"
        strokeJoin="round"
      >
        <Paint style="stroke" strokeWidth={2}>
          <LinearGradient
            colors={colors}
            start={topLeft(bounds)}
            end={topRight(bounds)}
          />
          <Blur blur={blur} />
        </Paint>
        <Paint style="stroke" strokeWidth={1}>
          <LinearGradient
            colors={colors}
            start={topLeft(bounds)}
            end={topRight(bounds)}
          />
          <Blur blur={blur} />
        </Paint>
        <Paint style="stroke" strokeWidth={1}>
          <LinearGradient
            colors={colors}
            start={topLeft(bounds)}
            end={topRight(bounds)}
          />
        </Paint>
        <Paint style="stroke" strokeWidth={1 / 3} color="white" />
      </Path>
    </Group>
  );
};