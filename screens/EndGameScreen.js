import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import colors from '../constants/colors';
import NumberCard from '../components/NumberCard';
import PrimaryButton from '../components/PrimaryButton';

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
                <Text style={textStyles.title}>'Znam twoją liczbę!'</Text>
                <Text style={textStyles.standard}>Twoja liczba to...</Text>
                <View style={styles.numberCard}><NumberCard>{props.userNumber}</NumberCard></View>
                <Text style={textStyles.standard}>Zajęło to tylko {props.roundsItTook} {getRoundsString(props.roundsItTook)}.</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.imageView}>
                <Image
                    source={{uri: 'https://wp.pl.aleteia.org/wp-content/uploads/sites/9/2020/06/web3-esoterism-witch-mystery-future-shutterstock_573327739.jpg'}}
                    style={styles.image}
                    resizeMode="cover"
                    fadeDuration={500} />
            </View>
            <View style={styles.buttonView}>
                <PrimaryButton onPress={props.onRestart} >Zagraj jeszcze raz!</PrimaryButton>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.bg_powder,
    },
    numberCard: {
        marginVertical: 15,
        minWidth: 75,
    },
    image: {
        width: '100%',
        height: 200,
    },
    imageView: {
        flex: 5,
        width: '100%',
        maxHeight: 200,
        borderRadius: 500,
        overflow: 'hidden',
    },
    buttonView: {
        minWidth: 100,
        overflow: 'hidden',
        borderRadius: 20,
        margin: 20,
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
        marginVertical: -8,
    },
});

export default EndGameScreen;