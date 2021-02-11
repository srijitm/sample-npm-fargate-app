import { calculateMedianPrimeNumbers } from '../services/prime-numbers.js';
 
export function getMedianPrimeNumbers(req, res) {
  const upperLimit = req.query.upper_limit;
  try {
    let result = calculateMedianPrimeNumbers(upperLimit);
    res.status(200).send({
      result: result
    });
  } catch(e) {
    res.status(400).send({
      error: e.message
    });
  }
}
