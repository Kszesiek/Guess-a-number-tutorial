import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    useWindowDimensions,
} from 'react-native';
import Card from '../components/Card';

import colors from '../constants/colors';
import Input from '../components/Input';
import NumberCard from '../components/NumberCard';
import PrimaryButton from '../components/PrimaryButton';

const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [chosenNumber, setChosenNumber] = useState();
    const window = useWindowDimensions();

    const numberInputHandler = enteredValue => {
        setEnteredNumber(enteredValue.replace(/\D/g, ''));
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
            <Text style={{ paddingHorizontal: 10, ...textStyles.standard, fontSize: window.width > 380 ? 30 : 26}}>A więc Twoj wybór to...</Text>
            <NumberCard>{chosenNumber}</NumberCard>
            <PrimaryButton onPress={() => props.onStartGame(chosenNumber)}>Rozpocznij grę</PrimaryButton>
        </Card>
    }

    let content_primary = (
        <View style={styles.screen}>
            <Card style={styles.inputCard}>
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
                    <View style={{flex: 1}} />
                    <View style={styles.buttonView}><Button title="Reset" color={colors.dark} onPress={resetInputHandler} /></View>
                    <View style={{flex: 1}} />
                    <View style={styles.buttonView}><Button title="Potwierdź" color={colors.main} onPress={confirmInputHandler} /></View>
                    <View style={{flex: 1}} />
                </View>
            </Card>
        </View>
    );

    let content;

    if (window.height > window.width) {
        content = (
            <View style={styles.screen}>
                <View style={{ flex: 1 }} />
                {content_primary}
                {numberChosenFeedback}
                <View style={{ flex: 2 }} />
            </View>
        )
    } else {
        content = (
            <View style={{flex: 1, flexDirection: "row"}}>
                {content_primary}
                {numberChosenFeedback}
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={ 30 }>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={textStyles.title}>Rozpocznij grę!</Text>
                        {content}
                        {/* <Text style={textStyles.title}>zażółć gęślą jaźń</Text> */}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        marginTop: -10,
        alignItems: 'center',
    },
    background: {
        backgroundColor: colors.bg_powder,

    },
    inputCard: {
        minWidth: 250,
        width: '75%',
        maxWidth: '90%',
        alignItems: 'center',
        backgroundColor: colors.light,
        opacity: 0.9,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    buttonView: {
        minWidth: 100,
        overflow: 'hidden',
        borderRadius: 20,
    },
    textInput: {
        width: 70,
        height: 60,
        textAlign: 'center',
        fontFamily: 'backslash',
        fontSize: 50,
    },
    startGameCard: {
        flex: 1,
        alignItems: 'center',
        // marginTop: 20,
        // minWidth: 250,
        // width: '75%',
        maxWidth: '90%',
        backgroundColor: colors.light,
        opacity: 0.8,
    },
});

const textStyles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginBottom: 10,
        color: colors.dark,
        fontFamily: 'sacramento',
    },
    standard: {
        fontFamily: 'sacramento',
        fontSize: 30,  // overwritten in code (screen dimensions considered)
        color: 'black',
        marginBottom: -5,  // because of the font style...
    },
});

export default StartGameScreen;