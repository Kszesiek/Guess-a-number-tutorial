import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import NumberCard from '../components/NumberCard';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';

const generateRandomInRange = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude)
        return generateRandomInRange(min, max, exclude);
    else
        return randomNumber;
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomInRange(1, 100, props.userChoice));
    const [round, setRound] = useState(0);
    const currentMin = useRef(0);
    const currentMax = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(round);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const guessHandler = direction => {
        if ((direction === 'less' && currentGuess < props.userChoice) || (direction === 'more' && currentGuess > props.userChoice)) {
            Alert.alert('You sneaky little fox!', 'A ty żółwiku kłamczuszku! Nie wolno tak kłamczyć!', [
                { text: 'No dobrze, juz nie będę...', style: 'cancel' }
            ]);
            return;
        } else if (direction === 'less') {
            currentMax.current = currentGuess;
        } else if (direction == 'more') {
            currentMin.current = currentGuess;
        }
        const nextNumber = generateRandomInRange(currentMin.current + 1, currentMax.current, currentGuess);
        setRound(curRounds => curRounds + 1);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <View style={{ flex: 2 }} />
            <Text style={{ fontFamily: 'sacramento', fontSize: 40 }} >Czy Twoja liczba to...</Text>
            <NumberCard>{currentGuess}</NumberCard>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => guessHandler('less')} activeOpacity={0.75}>
                    <Card style={styles.buttonsCard}>
                        <Ionicons name="arrow-down-circle-outline" size={60} style={{ paddingLeft: 5 }} />
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => guessHandler('more')} activeOpacity={0.75}>
                    <Card style={{ ...styles.buttonsCard, backgroundColor: colors.main }}>
                        <Ionicons name="arrow-up-circle-outline" size={60} style={{ paddingLeft: 5 }} />
                    </Card>
                </TouchableOpacity>
            </View>


            <View style={{ flex: 3 }} />
        </View>
    )
};

// <Button title="Mniej" color={colors.dark} onPress={() => guessHandler('less')} />
// <Button title="Więcej" color={colors.dark} onPress={() => guessHandler('more')} />

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.bg_powder,
    },
    buttonsCard: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 100,
        backgroundColor: colors.light,
    },
    buttonView: {
        minWidth: 50,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
    },
});

export default GameScreen;