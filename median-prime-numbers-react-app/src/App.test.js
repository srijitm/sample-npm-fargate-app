import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('testing Median Prime Numbers Calculator', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should validate before submit', () => {
    window.alert = jest.fn();
    const app = shallow(<App />);
    app.find('button').simulate('click');
    const expectedValidatorMsg = "Please enter a value for Upper Limit.\nUpper Limit needs to be a number.\n";
    expect(window.alert).toHaveBeenCalledWith(expectedValidatorMsg);
  });

  it('should display result on success', () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [2,3] }))
    const app = shallow(<App />);
    app.find('input').simulate('change', { target: { value: 4 } });
    app.instance().onSubmit().then(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3001/median_prime_numbers?upper_limit=4');
      expect(app.update().state().result).to.equal("2, 3");
      expect(app.update().state().error).toBeNull();
    }).catch(err => {});
  });

  it('should display error on failure', () => {
    fetch.mockResponseOnce({ ok: false});
    const app = shallow(<App />);
    app.find('input').simulate('change', { target: { value: 4 } });
    app.instance().onSubmit().then(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(app.update().state().error).to.equal("Unable to perform this operation");
      expect(app.update().state().result).toBeNull();
    }).catch(err => {});
  });
});