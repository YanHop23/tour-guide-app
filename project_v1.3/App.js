import { StyleSheet, Text, View } from 'react-native';
import Login from './components/login/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntireScreen from './components/login/entire';
import RegisterScreen from './components/login/register';
import home from './components/home/home';
import { useState } from 'react';
const Stack = createNativeStackNavigator();


export default function App() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLogged ?
          <Stack.Screen
        name='home'
        component={home}
        
        />
        :
        <Stack.Screen
                  name="login"
                  component={LoginScreen}
                  options={{ title: 'Welcome' }}
                />
        }
        <Stack.Screen name="entire" component={EntireScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
