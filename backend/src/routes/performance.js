const express = require('express');
const router = express.Router();
const PlayerPerformance = require('../models/PlayerPerformance');
const auth = require('../middleware/auth');

// Get player performance
router.get('/me', auth, async (req, res) => {
  try {
    const performance = await PlayerPerformance.findOne({ userId: req.user._id });
    if (!performance) {
      return res.status(404).json({ error: 'Performance data not found' });
    }
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update player performance after match
router.post('/update', auth, async (req, res) => {
  try {
    const { questionsAttempted, correctAnswers, timeTaken } = req.body;
    
    const performance = await PlayerPerformance.findOne({ userId: req.user._id });
    if (!performance) {
      return res.status(404).json({ error: 'Performance data not found' });
    }

    const matchData = {
      questionsAttempted,
      correctAnswers,
      timeTaken
    };

    await performance.updateStats(matchData);
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const leaderboard = await PlayerPerformance.find()
      .sort({ elo: -1 })
      .limit(10)
      .populate('userId', 'username');
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 