import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Підключаємо useRouter з expo-router

export default function HomeScreen() {
  const [category, setCategory] = useState(0);
  const router = useRouter(); // Використовуємо хук useRouter

  function changeCategory(_category: number) {
    setCategory(_category);
    router.push({
      pathname: '/map',
      params: { category: _category },
    });  }

  return (
    <View style={styles.container}>
      <Button 
        title='alcohol'
        onPress={() => changeCategory(1)} // Зміна категорії та навігація
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

