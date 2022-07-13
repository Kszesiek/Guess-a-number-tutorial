import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.main
  },
  headerTitle: {
      color: 'black',
      fontSize: 36,
      fontFamily: 'back-to-black',
      height: '100%',
  }
});

export default Header;