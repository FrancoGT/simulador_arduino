const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Simulación de valores dinámicos
function getRandomSensorData() {
  return {
    temperature: +(Math.random() * 20 + 15).toFixed(1),     // 15°C a 35°C
    humidity: +(Math.random() * 60 + 20).toFixed(1),        // 20% a 80%
    soilMoisture: +(Math.random() * 40 + 30).toFixed(1),    // 30% a 70%
    phLevel: +(Math.random() * 2 + 5.5).toFixed(2),         // 5.5 a 7.5
    timestamp: new Date().toISOString()
  };
}

function getDeviceInfo() {
  return {
    name: "ESP32",
    description: "Microcontrolador principal",
    status: "Conectado",
    ipAddress: "192.168.1.100",
    firmwareVersion: "2.1.3"
  };
}

// Endpoint: GET /sensors
app.get('/sensors', (req, res) => {
  res.json(getRandomSensorData());
});

// Endpoint: GET /device
app.get('/device', (req, res) => {
  res.json(getDeviceInfo());
});

// Endpoint: POST /control
app.post('/control', (req, res) => {
  const command = req.body.command;
  console.log(`Comando recibido: ${command}`);

  if (command === 'irrigate') {
    return res.status(200).json({ message: 'Irrigation command executed' });
  }

  res.status(400).json({ error: 'Unknown command' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor simulado Arduino ejecutándose en http://localhost:${port}`);
});