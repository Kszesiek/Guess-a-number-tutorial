import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';

const Header = props => {
    return (
        <View style={{...styles.header, backgroundColor: colors.main}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DDD', // default color, usually overwritten
    width: '100%',
    height: 100,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
      color: 'black',
      fontSize: 24,
  }
});

export default Header;