const mongoose = require('mongoose');

const playerPerformanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    questionsAttempted: {
      type: Number,
      default: 0
    },
    correctAnswers: {
      type: Number,
      default: 0
    },
    timeTaken: {
      type: Number, // in seconds
      default: 0
    }
  }],
  accuracy: {
    type: Number,
    default: 0
  },
  elo: {
    type: Number,
    default: 1000
  },
  totalMatches: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to update player statistics after a match
playerPerformanceSchema.methods.updateStats = async function(matchData) {
  this.matchHistory.push(matchData);
  this.totalMatches += 1;
  
  // Calculate new accuracy
  const totalCorrect = this.matchHistory.reduce((sum, match) => sum + match.correctAnswers, 0);
  const totalAttempted = this.matchHistory.reduce((sum, match) => sum + match.questionsAttempted, 0);
  this.accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;
  
  // Update ELO (simplified version)
  const performanceScore = (matchData.correctAnswers / matchData.questionsAttempted) * 100;
  const eloChange = Math.round((performanceScore - 50) / 10);
  this.elo = Math.max(0, this.elo + eloChange);
  
  await this.save();
};

const PlayerPerformance = mongoose.model('PlayerPerformance', playerPerformanceSchema);

module.exports = PlayerPerformance; 