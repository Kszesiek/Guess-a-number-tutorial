import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import colors from '../constants/colors';
import NumberCard from '../components/NumberCard';

const EndGameScreen = props => {

    const getRoundsString = roundsItTook => {
        if (roundsItTook === 1)
            return 'turę';
        if (roundsItTook >= 12 && roundsItTook <= 14)
            return 'tur';
        else if ((roundsItTook % 10) >= 2 && (roundsItTook % 10) <= 4)
            return 'tury';
        else return 'tur';
    }

    return (
        <View style={styles.screen}>
            <View style={{ flex: 1 }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 10 }}>'Znam twoją liczbę!'</Text>
                <Text>Twoja liczba to...</Text>
                <View style={styles.numberCard}><NumberCard>{props.userNumber}</NumberCard></View>
                <Text>Zajęło to tylko {props.roundsItTook} {getRoundsString(props.roundsItTook)}.</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ padding: 25 }}>
                <Button color={colors.main} onPress={props.onRestart} title="Zagraj jeszcze raz!" />
            </View>
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
        backgroundColor: colors.bg_powder,
    },
    numberCard: {
        marginVertical: 50,
    }
});

export default EndGameScreen;