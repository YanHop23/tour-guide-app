import React from "react";
import { Text, View, StyleSheet } from "react-native";

const RegisterScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Register</Text>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });