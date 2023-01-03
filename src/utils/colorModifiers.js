import tinycolor from 'tinycolor2';
import { useTheme } from '@rneui/themed';
export const ColorModifier = (color) => {

  const { theme } = useTheme()  

  let lightColor = theme.colors.primary;
  let mainColor = theme.colors.secondary;
  let darkColor = theme.colors.success;

  const brightness = tinycolor(color).getBrightness();

  if (brightness < 230 && tinycolor(color).isValid()) {
    lightColor = tinycolor(color).lighten().toString();
    mainColor = color;
    darkColor = tinycolor(color).darken().toString();
  }
  return {
    lightColor,
    mainColor,
    darkColor,
  };
};