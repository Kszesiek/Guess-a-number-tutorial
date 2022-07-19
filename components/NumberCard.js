import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import colors from '../constants/colors';

const deviceSize = Math.min(Dimensions.get("window").width, Dimensions.get("screen").height)

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
      fontSize: deviceSize > 380 ? 44 : 38,
      fontFamily: 'backslash',

  }
});

export default NumberCard;