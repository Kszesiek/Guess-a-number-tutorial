import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';

const EndGameScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>'Znam twoją liczbę!'</Text>
        </View>
    )
};
// Alert.alert('Znam twoją liczbę!', 'Jakoś tak wyszło, że się dowiedziałem! Twoja liczba to ' + currentGuess + '!', [{text: 'Jak to, skąd możesz to wiedzieć?', style: 'default'}])


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
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

export default EndGameScreen;