const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Valores iniciales
let settings = {
  minHumidity: 20,    // 20%
  maxHumidity: 80,    // 80%
  minTemperature: 5,  // 5°C
  maxTemperature: 35,  // 35°C
  soilMoistureOverride: 80 // 80%
};

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API Arduino simulada activa');
});

// Obtener todos los valores actuales
app.get('/settings', (req, res) => {
  res.json(settings);
});

// Endpoints específicos para actualización:

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

// Simulación de datos dinámicos
app.get('/sensors', (req, res) => {
  const data = {
    temperature: +(Math.random() * (settings.maxTemperature - settings.minTemperature) + settings.minTemperature).toFixed(1),
    humidity: +(Math.random() * (settings.maxHumidity - settings.minHumidity) + settings.minHumidity).toFixed(1),
    soilMoisture: +(Math.random() * 40 + 30).toFixed(1),
    phLevel: +(Math.random() * 2 + 5.5).toFixed(2),
    timestamp: new Date().toISOString(),
    soilMoisture: settings.soilMoistureOverride !== null
    ? +settings.soilMoistureOverride.toFixed(1)
    : +(Math.random() * 40 + 30).toFixed(1),
  };
  res.json(data);
});

// Información del dispositivo
app.get('/device', (req, res) => {
  res.json({
    name: "ESP32",
    description: "Simulado",
    status: "Conectado",
    ipAddress: "127.0.0.1",
    firmwareVersion: "2.1.3"
  });
});

app.post('/settings/soil-moisture', (req, res) => {
  const { value } = req.body;
  settings.soilMoistureOverride = value;
  res.json({
    message: `Humedad del suelo forzada a ${value}%`,
    settings
  });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor simulador Arduino activo en http://localhost:${port}`);
});