const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../models/tutor.model');
// const { generateJWT } = require('../utils');
// const Task = require('../task');

afterAll(() => {
  mongoose.disconnect();
});

beforeEach(async () => {});

describe('POST /register', () => {
  const userBody = {
    type: 'tutor',
    inputs: {
      name: 'juan',
      email: 'test135@example.com',
      password: 1236789,
    },
  };
  test('responds 201', async () => {
    const response = await request(app).post('/register').send(userBody);
    expect(response.statusCode).toBe(201);
  });
});
