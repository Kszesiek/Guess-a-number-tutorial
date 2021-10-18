import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../constants/colors';

const PrimaryButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.75} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}> {props.children} </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 40,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'back-to-black',
        fontSize: 22,
        textShadowOffset: {width: -4, height: 3},
        textShadowRadius: 10,
        textShadowColor: 'black',
    },
});

export default PrimaryButton;