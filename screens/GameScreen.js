import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import NumberCard from '../components/NumberCard';
import Card from '../components/Card';

// const deviceWidth = Dimensions.get('window').width;

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

const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomInRange(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentMin = useRef(0);
    const currentMax = useRef(100);
    const window = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const guessHandler = direction => {
        if ((direction === 'less' && currentGuess < userChoice) || (direction === 'more' && currentGuess > userChoice)) {
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

    let content_primary = (
        <View style={styles.screen_primary}>
            <Text style={{...styles.topText, fontSize: Math.min(window.width, window.height) > 380 ? 40 : 36}} >Czy Twoja liczba to...</Text>
            <NumberCard>{currentGuess}</NumberCard>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => guessHandler('less')} activeOpacity={0.75}>
                    <Card style={styles.buttonsCard}>
                        <Ionicons name="arrow-down-circle-outline" size={window.width > 380 ? 60 : 50} style={{ paddingLeft: 5 }} />
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => guessHandler('more')} activeOpacity={0.75}>
                    <Card style={{ ...styles.buttonsCard, backgroundColor: colors.main }}>
                        <Ionicons name="arrow-up-circle-outline" size={window.width > 380 ? 60 : 50} style={{ paddingLeft: 5 }} />
                    </Card>
                </TouchableOpacity>
            </View>
        </View>
    )

    let content_secondary = (
        <View style={styles.screen_secondary}>
            <View style={{...styles.listContainer, flex: window.width > 380 ? 5 : 10,}}>
                <Text style={{...styles.guessingHistoryText, fontSize: Math.min(window.width, window.height) > 380 ? 36 : 32}}>Historia zgadywania</Text>
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

    if (window.width < window.height) {
        return (
            <View style={styles.screen_primary}>
                <View style={{ flex: window.height > 600 ? 1 : 0 }} />
                {content_primary}
                {content_secondary}
            </View>
        )
    } else {
        return (
            <View style={{...styles.screen_primary, flexDirection: 'row'}}>
                {content_primary}
                {content_secondary}
            </View>
        )
    }


};

const styles = StyleSheet.create({
    screen_primary: {
        flex: 5,
        paddingVertical: 10,
        alignItems: 'center',
        // backgroundColor: colors.bg_powder,
    },
    screen_secondary: {
        flex: 5,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
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
        flex: 5,  // overwritten in code (screen dimensions considered)
        borderRadius: 30,
        backgroundColor: colors.light,
        alignItems: 'center',
        overflow: 'hidden',
        borderColor: colors.light,
        borderWidth: 5,
        padding: 5,
        width: '80%',
        minHeight: 140,
        opacity: 0.8,
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
    topText: {
        fontFamily: 'sacramento',
        fontSize: 40,  // overwritten in code (screen dimensions considered)
    },
    guessingHistoryText: {
        fontFamily: 'sacramento',
        fontSize: 36,  // overwritten in code (screen dimensions considered)
        borderBottomWidth: 1,
        borderColor: colors.dark,
    },
});

export default GameScreen;