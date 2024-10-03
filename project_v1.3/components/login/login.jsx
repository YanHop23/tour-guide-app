import React from "react";
import { Button, Text, View, } from "react-native";
import { StyleSheet } from "react-native";


export default LoginScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                maps
            </Text>
            <Button 
            title="login"
            onPress={() =>
                navigation.navigate('entire')
            }
            />
            <Button 
            title="Register"
            onPress={() =>
                navigation.navigate('register')
            }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "500",
    },
})