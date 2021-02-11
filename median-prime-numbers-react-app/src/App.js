import React, { Component } from 'react';
import './App.css';
import PrimeNumberService from './shared/prime-number-service';
import Validator from './shared/validator';

class App extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validator();
    this.primeNumberService = new PrimeNumberService();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      upperLimit: '',
      result: null,
      error: null
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      upperLimit: value
    });
  }

  handleError(error) {
    this.clearState();
    this.setState({
      error: error.message
    })
  }

  onSubmit() {
    this.clearState();
    if(this.validator.validateUpperLimit(this.state.upperLimit)) {
      return this.primeNumberService.getMedianPrimeNumbers(this.state.upperLimit)
        .then(resultArr => {
          let result = resultArr.join(', ');
          if (resultArr.length === 0) {
            result = `N/A - No prime numbers less than ${this.state.upperLimit}`;
          }
          this.setState({
            result: result
          });
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  }

  clearState() {
    this.setState({
      result: null,
      error: null
    });
  }

  render() {
    const error = this.state.error,
      result = this.state.result;
    return (
      <div className="app">
        <h3>Median Prime Numbers Calculator</h3>
        <div className="app-description">
          This nifty little calculator will tell you the median prime number(s) of all prime numbers less than
          the upper limit number provided by you! Get excited!
        </div>
        <div className="app-content">
          <table className="table-content">
            <tbody>
              <tr>
                <td><label>Upper Limit:</label></td>
                <td>
                  <input className="input-field" value={this.state.upperLimit} name="upper-limit" required onChange={this.handleInputChange}/>
                </td>
              </tr>
              {error &&
                <tr className="error">
                  <td>Error:</td><td>{error}</td>
                </tr>
              }
              {result &&
                <tr className="result">
                  <td>Result:</td><td>{result}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div>
          <button className="submit-button" onClick={() => this.onSubmit()}>Submit</button>
        </div>
      </div>
    )
  }
}

export default App;
