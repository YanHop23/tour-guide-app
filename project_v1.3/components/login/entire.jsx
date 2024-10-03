import React from "react";
import { Text, View, StyleSheet } from "react-native";

const EntireScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Entire</Text>
        </View>
    );
}

export default EntireScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });