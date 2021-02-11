import { getPrimeNumbers, median } from '../utils';

export function calculateMedianPrimeNumbers(upperLimit) {
  try {
    let primeNumbers = getPrimeNumbers(parseInt(upperLimit));
    return median(primeNumbers);
  } catch (e) {
    throw new Error(e.message);
  }
}
