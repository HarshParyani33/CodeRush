const mongoose = require('mongoose');
const User = require('../src/models/User');
const PlayerPerformance = require('../src/models/PlayerPerformance');
const Question = require('../src/models/Question');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await user.save();
    const foundUser = await User.findOne({ email: 'test@example.com' });
    expect(foundUser.username).toBe('testuser');
  });

  it('should not create user with duplicate email', async () => {
    const user1 = new User({
      username: 'testuser1',
      email: 'test@example.com',
      password: 'password123'
    });
    await user1.save();

    const user2 = new User({
      username: 'testuser2',
      email: 'test@example.com',
      password: 'password123'
    });

    await expect(user2.save()).rejects.toThrow();
  });

  it('should hash password before saving', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await user.save();
    expect(user.password).not.toBe('password123');
  });
});

describe('PlayerPerformance Model', () => {
  let user;

  beforeEach(async () => {
    await PlayerPerformance.deleteMany({});
    user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
  });

  it('should create performance record for user', async () => {
    const performance = new PlayerPerformance({
      userId: user._id
    });

    await performance.save();
    const foundPerformance = await PlayerPerformance.findOne({ userId: user._id });
    expect(foundPerformance.elo).toBe(1000);
  });

  it('should update stats after match', async () => {
    const performance = new PlayerPerformance({
      userId: user._id
    });
    await performance.save();

    await performance.updateStats({
      questionsAttempted: 10,
      correctAnswers: 8,
      timeTaken: 300
    });

    expect(performance.matchHistory.length).toBe(1);
    expect(performance.accuracy).toBe(80);
    expect(performance.elo).toBeGreaterThan(1000);
  });
});

describe('Question Model', () => {
  beforeEach(async () => {
    await Question.deleteMany({});
  });

  it('should create a new question', async () => {
    const question = new Question({
      questionId: 'q1',
      title: 'Two Sum',
      description: 'Find two numbers that add up to target',
      difficulty: 'Easy',
      topic: 'Arrays',
      solution: 'Use hash map',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    });

    await question.save();
    const foundQuestion = await Question.findOne({ questionId: 'q1' });
    expect(foundQuestion.title).toBe('Two Sum');
  });

  it('should not create question with duplicate questionId', async () => {
    const question1 = new Question({
      questionId: 'q1',
      title: 'Two Sum',
      description: 'Find two numbers that add up to target',
      difficulty: 'Easy',
      topic: 'Arrays',
      solution: 'Use hash map',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    });
    await question1.save();

    const question2 = new Question({
      questionId: 'q1',
      title: 'Another Question',
      description: 'Different question',
      difficulty: 'Medium',
      topic: 'Arrays',
      solution: 'Different solution',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    });

    await expect(question2.save()).rejects.toThrow();
  });
}); 