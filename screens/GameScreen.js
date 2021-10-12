import React, { useState, useRef } from 'react';
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
    const currentMin = useRef(1);
    const currentMax = useRef(99);

    const guessHandler = direction => {
        if ( (direction === 'less' && currentGuess < props.userChoice) || (direction === 'more' && currentGuess > props.userChoice) || (currentGuess === props.userChoice) ) {
            Alert.alert('You sneaky little fox!', 'A ty żółwiku kłamczuszku! Nie wolno tak kłamczyć!', [
                {text: 'No dobrze, juz nie będę...', style: 'cancel'}
            ]);
            return;
        } else if (direction === 'less') {
            currentMax.current = currentGuess;
        } else if (direction == 'more') {
            currentMin.current = currentGuess;
        }
        const nextNumber = generateRandomInRange(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <Text>Czy Twoja liczba to...</Text>
            <NumberCard>{currentGuess}</NumberCard>
            <Card style={styles.buttonsCard}>
                <View style={styles.button}><Button title="Mniej" color={colors.dark} onPress={() => guessHandler('less')} /></View>
                <View style={styles.button}><Button title="Więcej" color={colors.dark} onPress={() => guessHandler('more')} /></View>
            </Card>
            <Card style={styles.buttonsCard}>
                <Button title="Tak, to moja liczba!" color={colors.secondary} onPress={
                    () => Alert.alert('Znam twoją liczbę!', 'Jakoś tak wyszło, że się dowiedziałem! Twoja liczba to ' + currentGuess + '!', [{text: 'Jak to, skąd możesz to wiedzieć?', style: 'default'}]) } />
            </Card>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonsCard: {
        flexDirection: 'row',
        width: 200,
        maxWidth: '80%',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: colors.light,
    },
    button: {
        width: 90,
        maxWidth: '90%',
        paddingHorizontal: 10,
    },
});

export default GameScreen;