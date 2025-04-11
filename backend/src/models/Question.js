const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  titleSlug: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  topicTags: [{
    name: String,
    slug: String
  }],
  content: {
    type: String,
    required: true
  },
  hints: [String],
  similarQuestions: [{
    title: String,
    titleSlug: String,
    difficulty: String
  }],
  acceptanceRate: Number,
  likes: Number,
  dislikes: Number
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question; 