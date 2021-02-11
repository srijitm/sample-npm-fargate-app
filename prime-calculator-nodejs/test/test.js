import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai'
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe("Get Median Prime Numbers", () => {
  it("should return the middle prime number from the list if the list size is odd", (done) => {
    chai.request(app)
        .get('/median_prime_numbers?upper_limit=18')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('result');
          expect(res.body.result).to.eql([7]);
          done();
        });
  });
  it("should return two middle prime numbers from the list if the list size is even", (done) => {
    chai.request(app)
        .get('/median_prime_numbers?upper_limit=10')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('result');
          expect(res.body.result).to.eql([3,5]);
          done();
        });
  });
  it("should return result from prime numbers strictly less than the given upper limit", (done) => {
    chai.request(app)
        .get('/median_prime_numbers?upper_limit=3')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('result');
          expect(res.body.result).to.eql([2]);
          done();
        });
  });
  it("should be able to compute for a very large upper limit > 10,000", (done) => {
    chai.request(app)
        .get('/median_prime_numbers?upper_limit=20000')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('result');
          expect(res.body.result).to.eql([9127, 9133]);
          done();
        });
  });
  it("should return error message when upper limit is not a number", (done) => {
    chai.request(app)
        .get('/median_prime_numbers?upper_limit=i_am_not_a_number')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          expect(res.body.error).to.eql('Upper limit value is not a number');
          done();
        });
  });
  it("should return error message when upper limit is negative", (done) => {
    chai.request(app)
        .get('/median_prime_numbers?upper_limit=-10')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          expect(res.body.error).to.eql('Upper limit value needs to be a positive number');
          done();
        });
  });
});