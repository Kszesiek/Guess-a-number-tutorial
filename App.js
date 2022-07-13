import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';
import colors from "./constants/colors";

async function fetchFonts () {
  await Font.loadAsync({
    'back-to-black': require('./assets/fonts/BackToBlackDemo.ttf'), // titles and stuff
    'backslash': require('./assets/fonts/backslash.ttf'),      // numbers
    'sacramento': require('./assets/fonts/sacramento.ttf'),    // default
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [roundsItTook, setRoundsItTook] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setFontsReady(true);
      }
    }
    prepare();
  }, []);

  if (!fontsReady) {
    return null;
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setRoundsItTook(0);
  };

  const gameOverHandler = numberOfRounds => {
    setRoundsItTook(numberOfRounds);
  }

  const restartGame = () => {
    setRoundsItTook(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && roundsItTook <= 0)
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  else if (roundsItTook > 0)
    content = <EndGameScreen userNumber={userNumber} roundsItTook={roundsItTook} onRestart={restartGame} />

  return (
      <View
        style={styles.screen}
        onLayout={onLayoutRootView}
      >
        <LinearGradient style={{flex: 1}} colors={[colors.main, colors.bg_powder, colors.bg_powder, colors.bg_powder, colors.powder]}>
          <ImageBackground source={require('./assets/images/dices.jpg')} style={{flex: 1}} resizeMode={"cover"} imageStyle={styles.backgroundImage}>
            <SafeAreaView style={styles.screen}>
              <Header title="Guess a number!" />
              {content}
            </SafeAreaView>
          </ImageBackground>
        </LinearGradient>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3,
  },
});
