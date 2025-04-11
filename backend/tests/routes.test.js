const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');
const User = require('../src/models/User');
const Question = require('../src/models/Question');
const PlayerPerformance = require('../src/models/PlayerPerformance');

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Create a test user and get token
  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });
  await user.save();
  userId = user._id;

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Question Routes', () => {
  beforeEach(async () => {
    await Question.deleteMany({});
  });

  it('should get all questions', async () => {
    await Question.create({
      questionId: 'q1',
      title: 'Two Sum',
      description: 'Find two numbers that add up to target',
      difficulty: 'Easy',
      topic: 'Arrays',
      solution: 'Use hash map',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    });

    const res = await request(app)
      .get('/api/questions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should get questions by difficulty', async () => {
    await Question.create({
      questionId: 'q1',
      title: 'Two Sum',
      description: 'Find two numbers that add up to target',
      difficulty: 'Easy',
      topic: 'Arrays',
      solution: 'Use hash map',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    });

    const res = await request(app)
      .get('/api/questions/difficulty/Easy')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe('Performance Routes', () => {
  beforeEach(async () => {
    await PlayerPerformance.deleteMany({});
  });

  it('should get player performance', async () => {
    await PlayerPerformance.create({
      userId,
      elo: 1000,
      accuracy: 80,
      totalMatches: 5
    });

    const res = await request(app)
      .get('/api/performance/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.elo).toBe(1000);
  });

  it('should update player performance', async () => {
    await PlayerPerformance.create({
      userId,
      elo: 1000,
      accuracy: 80,
      totalMatches: 5
    });

    const res = await request(app)
      .post('/api/performance/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        questionsAttempted: 10,
        correctAnswers: 8,
        timeTaken: 300
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.matchHistory.length).toBe(1);
  });

  it('should get leaderboard', async () => {
    await PlayerPerformance.create({
      userId,
      elo: 1000,
      accuracy: 80,
      totalMatches: 5
    });

    const res = await request(app)
      .get('/api/performance/leaderboard')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
}); 