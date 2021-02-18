import express from 'express';
import cors from 'cors';
import { getMedianPrimeNumbers } from './controllers/prime-numbers.js';

const app = express();

app.use(cors());

app.get('/median_prime_numbers', getMedianPrimeNumbers);
app.get('/health', (req, res) => {
  res.send('ok')
})

app.listen(3001, () => {
 console.log("Server running on port 3001");
});

module.exports = app;