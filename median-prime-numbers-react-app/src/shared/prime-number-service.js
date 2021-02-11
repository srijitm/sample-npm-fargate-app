class PrimeNumberService {

  async getMedianPrimeNumbers(upperLimit) {
    return fetch(`http://localhost:3001/median_prime_numbers?upper_limit=${upperLimit}`)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(data => {
        return data.result;
      })
  }

  handleResponseError(response) {
    throw new Error("Unable to perform this operation");
  }
}
export default PrimeNumberService;
