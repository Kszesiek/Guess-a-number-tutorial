import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/Card';

import colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {

    const [enteredNumber, setNumber] = useState('');

    const numberInputHandler = enteredValue => {
        setNumber(enteredValue.replace(/[^0-9]/g, ''));
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
                        <View style={styles.button}><Button title="Reset" color={colors.dark} onPress={() => { }} /></View>
                        <View style={styles.button}><Button title="Confirm" color={colors.main} onPress={() => { }} /></View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>

    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
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
});

export default StartGameScreen;