import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';

import colors from '../constants/colors';
import Input from '../components/Input';
import NumberCard from '../components/NumberCard';
import PrimaryButton from '../components/PrimaryButton';

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
        if (isNaN(newNumber) || newNumber <= 0 || newNumber > 99) {
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
            <Text style={{ paddingHorizontal: 10 }, textStyles.standard}>A więc Twoj wybór to...</Text>
            <NumberCard>{chosenNumber}</NumberCard>
            <PrimaryButton onPress={() => props.onStartGame(chosenNumber)}>Rozpocznij grę</PrimaryButton>
        </Card>
    }
/* <View style={styles.buttonView}><Button title='Rozpocznij grę' color={colors.secondary} onPress={() => props.onStartGame(chosenNumber)} /></View> */
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={textStyles.title}>Rozpocznij grę!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={textStyles.standard}>Wybierz liczbę:</Text>
                    <Input
                        style={styles.textInput}
                        maxLength={2}
                        keyboardType='number-pad'
                        blurOnSubmit
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonView}><Button title="Reset" color={colors.dark} onPress={resetInputHandler} /></View>
                        <View style={styles.buttonView}><Button title="Potwierdź" color={colors.main} onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {numberChosenFeedback}
                <View style={{ flex: 1 }} />
                <Text style={textStyles.title}>zażółć gęślą jaźń</Text>
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
    inputContainer: {
        width: 270,
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
    buttonView: {
        minWidth: 100,
        overflow: 'hidden',
        borderRadius: 20,
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

const textStyles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginVertical: 10,
        color: colors.dark,
        fontFamily: 'sacramento',
    },
    standard: {
        fontFamily: 'sacramento',
        fontSize: 30,
        color: 'black',
    },
});

export default StartGameScreen;