import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';

const NumberCard = props => {
    return (
        <View style={styles.numberCard}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  numberCard: {
    borderWidth: 2,
    borderColor: colors.dark,
    backgroundColor: colors.main,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
      color: 'white',
      fontSize: 24,

  }
});

export default NumberCard;