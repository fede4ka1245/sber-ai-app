import React, {useEffect} from 'react';
import {
  config,
  GluestackUIStyledProvider
} from "@gluestack-ui/themed";
import {NativeRouter} from "react-router-native";
import {SafeAreaView, View} from "react-native";
import Root from "./Root";
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GluestackUIStyledProvider config={config.theme} colorMode={'dark'}>
      <SafeAreaView
        style={{
          backgroundColor: config.theme.tokens.colors.secondary700
        }}
      >
        <View>
          <NativeRouter>
            <Root />
          </NativeRouter>
        </View>
      </SafeAreaView>
    </GluestackUIStyledProvider>
  );
}

export default App;
