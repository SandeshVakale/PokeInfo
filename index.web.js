import { registerRootComponent } from 'expo';
// TODO: we might have this a simple JS file so it's the same URL from the dev or production package
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

if (module.hot) {
  module.hot.accept();
}

LoadSkiaWeb().then(async () => {
  const App = (await import("./App")).default;
  registerRootComponent(App);
});