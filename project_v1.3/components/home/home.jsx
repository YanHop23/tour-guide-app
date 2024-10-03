import React from "react";
import { Button, Text, View, } from "react-native";
import { StyleSheet } from "react-native";
import { TabView } from "react-native-tab-view";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import map from "./map";
import profile from "./profile";

const Tab = createBottomTabNavigator();

export default HomeScreen = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Map" component={map} />
            <Tab.Screen name="Profile" component={profile} />
        </Tab.Navigator>
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