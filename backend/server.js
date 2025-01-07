const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Simple Server!');
});
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received successfully!', receivedData: data });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
