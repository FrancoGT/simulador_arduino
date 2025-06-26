const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz opcional para verificación manual en navegador
app.get('/', (req, res) => {
  res.send('API Arduino simulada activa');
});

// Simulación de datos dinámicos
function getRandomSensorData() {
  return {
    temperature: +(Math.random() * 20 + 15).toFixed(1),
    humidity: +(Math.random() * 60 + 20).toFixed(1),
    soilMoisture: +(Math.random() * 40 + 30).toFixed(1),
    phLevel: +(Math.random() * 2 + 5.5).toFixed(2),
    timestamp: new Date().toISOString(),
  };
}

// Simulación de información del dispositivo
function getDeviceInfo() {
  return {
    name: "ESP32",
    description: "Simulado",
    status: "Conectado",
    ipAddress: "127.0.0.1",
    firmwareVersion: "2.1.3"
  };
}

// Endpoints
app.get('/sensors', (req, res) => {
  res.json(getRandomSensorData());
});

app.get('/device', (req, res) => {
  res.json(getDeviceInfo());
});

app.post('/control', (req, res) => {
  const { command } = req.body;
  console.log("Comando recibido:", command);
  if (!command) {
    return res.status(400).json({ error: "Se requiere un comando en el cuerpo de la solicitud." });
  }

  res.json({ message: `Comando '${command}' recibido correctamente.` });
});

// Actualizar humedad mínima (ej: 20%)
app.post('/settings/humidity/min', (req, res) => {
  const { value } = req.body;
  settings.minHumidity = value;
  res.json({ 
    message: `Humedad mínima actualizada a ${value}%`,
    settings 
  });
});

// Actualizar humedad máxima (ej: 80%)
app.post('/settings/humidity/max', (req, res) => {
  const { value } = req.body;
  settings.maxHumidity = value;
  res.json({ 
    message: `Humedad máxima actualizada a ${value}%`,
    settings 
  });
});

// Actualizar temperatura mínima (ej: 5°C)
app.post('/settings/temperature/min', (req, res) => {
  const { value } = req.body;
  settings.minTemperature = value;
  res.json({ 
    message: `Temperatura mínima actualizada a ${value}°C`,
    settings 
  });
});

// Actualizar temperatura máxima (ej: 35°C)
app.post('/settings/temperature/max', (req, res) => {
  const { value } = req.body;
  settings.maxTemperature = value;
  res.json({ 
    message: `Temperatura máxima actualizada a ${value}°C`,
    settings 
  });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor simulador Arduino activo en http://localhost:${port}`);
});