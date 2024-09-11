const exec = require('child_process').exec;
const https = require('https');

// Отримати координати через сервіс geolocation-db.com
function getPCGeolocation() {
  return new Promise((resolve, reject) => {
    https.get('https://geolocation-db.com/json/', (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        try {
          const location = JSON.parse(data);

          // Перевіряємо, чи API повернуло координати
          if (location.latitude && location.longitude) {
            resolve({
              latitude: location.latitude,
              longitude: location.longitude,
            });
          } else {
            reject('Unable to retrieve coordinates. API did not return valid data.');
          }
        } catch (error) {
          reject(`Error parsing JSON: ${error.message}`);
        }
      });
    }).on('error', (err) => {
      reject(`Error fetching location: ${err.message}`);
    });
  });
}

// Встановлення координат у емулятор через ADB
function setEmulatorLocation(latitude, longitude) {
  const adbCommand = `adb emu geo fix ${longitude} ${latitude}`;
  exec(adbCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`Location set to: Latitude ${latitude}, Longitude ${longitude}`);
  });
}

// Автоматизація процесу
(async () => {
  try {
    const { latitude, longitude } = await getPCGeolocation();
    console.log(`Received PC Location: Latitude ${latitude}, Longitude ${longitude}`);
    setEmulatorLocation(latitude, longitude);
  } catch (error) {
    console.error(`Error getting location: ${error}`);
  }
})();
