class PrimeNumberService {

  async getMedianPrimeNumbers(upperLimit) {
    return fetch(`${process.env.REACT_APP_BACKEND_URI}:${process.env.REACT_APP_BACKEND_PORT}/median_prime_numbers?upper_limit=${upperLimit}`)
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
