import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Modal, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import markersData from './../../assets/state'
import { useGlobalSearchParams } from 'expo-router'; // Для отримання параметрів з URL

export default function App() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null); // Для обраного маркера
  const [modalVisible, setModalVisible] = useState(false); // Контроль модального вікна
  const { category } = useGlobalSearchParams(); // Отримуємо category з URL


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (!location) {
    return <View style={styles.container}><Text>Loading map...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryLabel}>{category === '1' ? 'Alcohol' : 'Other Category'}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {markersData.map(marker => (
          category === marker.category_id.toString() && (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)} // Відкриваємо модальне вікно при натисканні
            />
          )
        ))}

      </MapView>

      {/* Модальне вікно */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMarker?.title}</Text>
            <Text style={styles.modalDescription}>{selectedMarker?.description}</Text>
            <Button title="Переглянути маршрут" onPress={() => {/* Тут можна додати логіку для маршруту */}} />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Прозорий фон для модального вікна
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '40%', // Заповнює 40% екрану
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  categoryLabel: {
    marginTop: 130,
    padding: 10,
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: "400",
    textAlign: 'left',
  },
});

