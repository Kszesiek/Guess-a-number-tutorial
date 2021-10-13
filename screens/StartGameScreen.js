import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';

import colors from '../constants/colors';
import Input from '../components/Input';
import NumberCard from '../components/NumberCard';

const StartGameScreen = props => {

    const [enteredNumber, setEnteredNumber] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [chosenNumber, setChosenNumber] = useState();

    const numberInputHandler = enteredValue => {
        setEnteredNumber(enteredValue.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setConfirmed(false);
        setEnteredNumber('');
    };

    const confirmInputHandler = () => {
        const newNumber = parseInt(enteredNumber);
        if ( isNaN(newNumber) || newNumber <= 0 || newNumber > 99) {
            Alert.alert(
                'Invalid number', 
                'Number has to be an integer between 1 and 99.', 
                [{ text: "Okie dokie", style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }

        setConfirmed(true);
        setChosenNumber(parseInt(newNumber));
        setEnteredNumber('');
        Keyboard.dismiss();
    };

    let numberChosenFeedback;

    if (confirmed) {
        numberChosenFeedback = <Card style={styles.startGameCard}>
            <Text>You've chosen number:</Text>
            <NumberCard>{chosenNumber}</NumberCard>
            <Button title='START GAME' color={colors.secondary} onPress={ () => props.onStartGame(chosenNumber) } />
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a number:</Text>
                    <Input
                        style={styles.textInput}
                        maxLength={2}
                        keyboardType='number-pad'
                        blurOnSubmit
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" color={colors.dark} onPress={resetInputHandler} /></View>
                        <View style={styles.button}><Button title="Confirm" color={colors.main} onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {numberChosenFeedback}
            </View>
        </TouchableWithoutFeedback>

    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.bg_powder,
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
        color: colors.dark,
    },
    inputContainer: {
        width: 250,
        maxWidth: '80%',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 90,
        maxWidth: '50%',
    },
    textInput: {
        width: 40,
        textAlign: 'center',
    },
    startGameCard: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: colors.light,
    },
});

export default StartGameScreen;