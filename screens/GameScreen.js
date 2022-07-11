import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import NumberCard from '../components/NumberCard';
import Card from '../components/Card';

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={styles.listText}>#{listLength - itemData.index}:  </Text>
        <Text style={styles.listText}>{itemData.item}</Text>
    </View>
);


const generateRandomInRange = (min, max, exclude) => {
    min = Math.ceil(min) + 1;
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude)
        return generateRandomInRange(min, max, exclude);
    else
        return randomNumber;
}

const GameScreen = props => {
    const initialGuess = generateRandomInRange(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentMin = useRef(0);
    const currentMax = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const guessHandler = direction => {
        if ((direction === 'less' && currentGuess < props.userChoice) || (direction === 'more' && currentGuess > props.userChoice)) {
            Alert.alert('You sneaky little fox!', 'Nie wolno tak kłamać!', [
                { text: 'No dobrze, już nie będę...', style: 'cancel' }
            ]);
            return;
        } else if (direction === 'less') {
            currentMax.current = currentGuess;
        } else if (direction === 'more') {
            currentMin.current = currentGuess;
        }
        const nextNumber = generateRandomInRange(currentMin.current, currentMax.current, currentGuess);
        setPastGuesses(curGuesses => [nextNumber.toString(), ...curGuesses]);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <View style={{ flex: 1 }} />
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
            <View style={{ flex: 2 }} />
            <View style={styles.listContainer}>
                <Text style={{
                    fontFamily: 'sacramento',
                    fontSize: 36,
                    borderBottomWidth: 1,
                    borderColor: colors.dark,
                }}
                >Historia zgadywania</Text>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => (renderListItem(guess, pastGuesses.length - index)))}
                </ScrollView> */}
                <FlatList
                    data={pastGuesses}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.list}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
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
    listContainer: {
        flex: 5,
        borderRadius: 30,
        backgroundColor: colors.light,
        alignItems: 'center',
        overflow: 'hidden',
        borderColor: colors.light,
        borderWidth: 5,
        padding: 5,
        width: '80%',
        minHeight: 140,
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: colors.main,
        borderWidth: 3,
        padding: 10,
        marginVertical: 5,
        backgroundColor: colors.powder,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 50,
        width: '100%',
    },
    listText: {
        color: colors.dark,
        fontFamily: 'backslash',
        fontSize: 20,
    },
});

export default GameScreen;