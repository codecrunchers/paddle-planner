const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const test = require('tape');

test('GET /health', t => {
  api
  .get('/health')
  .expect('Content-type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.ok(res.body, 'It should have a response body');
      t.equals(res.body.healthy, true, 'It should return a healthy parameter and it should be true');
      t.end();
    }
  });
});

test('GET /login', t => {
  api
  .get('/login')
  .expect('Content-type', /text\/html/)
  .expect(200)
  .end((err, res) => {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.ok(res.body, 'It should have a response body');
      t.end();
    }
  });
});

