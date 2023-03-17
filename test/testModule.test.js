import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
use(chaiHttp);

describe('Test succes route', () => {
  describe('GET success-route', () => {
    it('should return status code 200', async () => {
      const res = await request(app).get('/success-route');
      expect(res).to.have.status(200);
    });
  });
});