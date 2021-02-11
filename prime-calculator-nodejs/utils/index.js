export function getPrimeNumbers(upperLimit) {
  if (isNaN(upperLimit)) {
    throw new Error('Upper limit value is not a number');
  }
  if (upperLimit < 0) {
    throw new Error('Upper limit value needs to be a positive number');
  }
  const sieve = new Array(upperLimit).fill(true);

  // Square root optimization for marking off non prime numbers 
  for (let i = 2; i <= Math.sqrt(upperLimit); i++) {
    if (sieve[i]) {
      for (let j = Math.pow(i, 2); j <= upperLimit; j+= i) {
        sieve[j] = false;
      }
    }
  }
  // Now reduce sieve array to prime indices
  return sieve.reduce((primes, isPrime, i) => {
    if (isPrime && i > 1) {
      primes.push(i);
    }
    return primes;
  }, [])
}

export function median(sortedArr) {
  const mid = Math.floor(sortedArr.length / 2);
  return sortedArr.length % 2 !== 0 ? [sortedArr[mid]] : sortedArr.slice(mid-1, mid+1);
}