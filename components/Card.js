import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
};


const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 20,
    /* to działa tylko na iOS, przetestować jak będzie na czym
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 6,
    */
    elevation: 10,
    },
});

export default Card;