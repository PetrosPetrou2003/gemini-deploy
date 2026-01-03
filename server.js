const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
const API_KEY = 'goldapi-1h77gx7smjyvqxgx-io';
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
app.get('/api/price', async (req, res) => {
      try {
                const response = await fetch('https://www.goldapi.io/api/XAU/EUR', {
                              method: 'GET',
                              headers: { 'x-access-token': API_KEY, 'Content-Type': 'application/json' }
                });
                if (!response.ok) throw new Error('API responded with ' + response.status);
                const data = await response.json();
                res.json(data);
      } catch (error) {
                console.error('Server Error:', error);
                res.status(500).json({ error: 'Failed to fetch price' });
      }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Server is running on port ' + PORT); });
