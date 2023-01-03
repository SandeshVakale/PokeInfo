  import {
    fitbox,
    processTransform2d,
    Skia,
    vec,
  } from "@shopify/react-native-skia";
  
  export const fitRect = (src, dst) =>
    processTransform2d(fitbox("contain", src, dst));
  
  export const getPointAtLength = (length, from, to) => {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const x = from.x + length * Math.cos(angle);
    const y = from.y + length * Math.sin(angle);
    return vec(x, y);
  };
  
  export class PathGeometry {
    totalLength = 0;
    contour;
  
    constructor(path, resScale = 1) {
      const it = Skia.ContourMeasureIter(path, false, resScale);
      const contour = it.next(); // check here later
      this.totalLength = contour.length();
      this.contour = contour;
    }
  
    getTotalLength() {
      return this.totalLength;
    }
  
    getPointAtLength(length) {
      const res = this.contour.getPosTan(length);
      return vec(res.px, res.py);
    }
  }