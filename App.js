import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';

export default function App() {

const [userNumber, setUserNumber] = useState();
const [roundsItTook, setRoundsItTook] = useState(0);

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
