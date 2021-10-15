import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import colors from '../constants/colors';
import NumberCard from '../components/NumberCard';
import Card from '../components/Card';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const generateRandomInRange = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max-min)) + min;
    if (randomNumber === exclude)
        return generateRandomInRange(min, max, exclude);
    else
        return randomNumber;
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomInRange(1, 100, props.userChoice));
    const [round, setRound] = useState(0);
    const currentMin = useRef(1);
    const currentMax = useRef(99);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(round);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const guessHandler = direction => {
        if ( (direction === 'less' && currentGuess < props.userChoice) || (direction === 'more' && currentGuess > props.userChoice) ) {
            Alert.alert('You sneaky little fox!', 'A ty żółwiku kłamczuszku! Nie wolno tak kłamczyć!', [
                {text: 'No dobrze, juz nie będę...', style: 'cancel'}
            ]);
            return;
        } else if (direction === 'less') {
            currentMax.current = currentGuess;
        } else if (direction == 'more') {
            currentMin.current = currentGuess;
        }
        const nextNumber = generateRandomInRange(currentMin.current, currentMax.current + 1, currentGuess);
        setRound(curRounds => curRounds + 1);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <View style={{flex: 2}} />
            <Text style={{fontFamily: 'sacramento', fontSize: 40}} >Czy Twoja liczba to...</Text>
            <NumberCard>{currentGuess}</NumberCard>
            <Card style={styles.buttonsCard}>
                <View style={styles.buttonView}><Button title="Mniej" color={colors.dark} onPress={() => guessHandler('less')} /></View>
                <View style={styles.buttonView}><Button title="Więcej" color={colors.dark} onPress={() => guessHandler('more')} /></View>
            </Card>
            <View style={{flex: 3}} />
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.bg_powder,
    },
    buttonsCard: {
        flexDirection: 'row',
        width: 250,
        maxWidth: '80%',
        justifyContent: 'space-around',
        marginTop: 10,
        backgroundColor: colors.light,
    },
    buttonView: {
        minWidth: 100,
        overflow: 'hidden',
        borderRadius: 20,
    },
});

export default GameScreen;