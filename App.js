import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'back-to-black': require('./assets/fonts/BackToBlackDemo.ttf'), // titles and stuff
    'backslash': require('./assets/fonts/backslash.otf'),      // numbers
    'sacramento': require('./assets/fonts/sacramento.ttf'),    // default
  });
}

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [roundsItTook, setRoundsItTook] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);

  if (!fontsReady)
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontsReady(true)}
      onError={(err) => console.log(err)}
    />;

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
    <View style={styles.screen}>
      <Header title="Guess a number!" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
