const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// Get all questions with pagination and filters
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      difficulty,
      topic,
      search
    } = req.query;

    const query = {};

    // Add filters if provided
    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (topic) {
      query['topicTags.name'] = topic;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const questions = await Question.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('title difficulty topicTags acceptanceRate');

    const total = await Question.countDocuments(query);

    res.json({
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalQuestions: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findOne({ questionId: req.params.id });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by difficulty
router.get('/difficulty/:level', auth, async (req, res) => {
  try {
    const questions = await Question.find({ difficulty: req.params.level });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by topic
router.get('/topic/:topic', auth, async (req, res) => {
  try {
    const questions = await Question.find({ topic: req.params.topic });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get random question
router.get('/random', auth, async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 