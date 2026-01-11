const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend-service:5000';

app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'frontend' });
});

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/data`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from backend:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from backend' });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DevSecOps Microservices Demo</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .container {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        h1 { text-align: center; }
        button {
          background: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover { background: #45a049; }
        #result {
          margin-top: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          min-height: 50px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 DevSecOps Microservices Demo</h1>
        <p>This is a demonstration of a microservices architecture with Kubernetes and CI/CD pipeline.</p>
        <button onclick="fetchData()">Fetch Data from Backend</button>
        <div id="result"></div>
      </div>
      <script>
        async function fetchData() {
          try {
            const response = await fetch('/api/data');
            const data = await response.json();
            document.getElementById('result').innerHTML = 
              '<strong>Response from Backend:</strong><br>' + JSON.stringify(data, null, 2);
          } catch (error) {
            document.getElementById('result').innerHTML = 
              '<strong>Error:</strong> ' + error.message;
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend service running on port ${PORT}`);
});
