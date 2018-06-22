import request from 'supertest';
import app from '../../app.js';

describe('GET /api', () => {
  it('should render properly', async () => {
    await request(app)
      .get('/')
      .query({ message: 'Hello World!' })
      .expect(200);
  });
});