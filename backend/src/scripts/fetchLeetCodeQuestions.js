const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Question = require('../models/Question');

const LEETCODE_API_URL = 'https://leetcode.com/api/problems/all/';
const LEETCODE_QUESTION_API = 'https://leetcode.com/graphql';

// Headers required for LeetCode API
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  'Origin': 'https://leetcode.com',
  'Referer': 'https://leetcode.com/problemset/all/'
};

const questionQuery = `
query getQuestionDetail($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    content
    hints
    topicTags {
      name
      slug
    }
    similarQuestions
  }
}`;

async function fetchQuestionList() {
  try {
    const response = await axios.get(LEETCODE_API_URL, { headers });
    
    if (!response.data || !response.data.stat_status_pairs) {
      throw new Error('Invalid response format from LeetCode API');
    }

    // Filter out premium questions and get first 40 questions
    const questions = response.data.stat_status_pairs
      .filter(q => !q.paid_only)
      .slice(0, 40)
      .map(q => ({
        questionId: q.stat.question_id,
        title: q.stat.question__title,
        titleSlug: q.stat.question__title_slug,
        difficulty: q.difficulty.level === 1 ? 'Easy' : q.difficulty.level === 2 ? 'Medium' : 'Hard',
        acRate: q.stat.total_acs / q.stat.total_submitted * 100
      }));

    return questions;
  } catch (error) {
    console.error('Error fetching question list:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

async function fetchQuestionDetail(titleSlug) {
  try {
    const response = await axios.post(
      LEETCODE_QUESTION_API,
      {
        query: questionQuery,
        variables: { titleSlug }
      },
      { headers }
    );

    if (!response.data || !response.data.data || !response.data.data.question) {
      throw new Error('Invalid response format from LeetCode API');
    }

    const question = response.data.data.question;
    return {
      content: question.content || '',
      hints: question.hints || [],
      topicTags: question.topicTags || [],
      similarQuestions: question.similarQuestions ? JSON.parse(question.similarQuestions) : []
    };
  } catch (error) {
    console.error(`Error fetching details for question ${titleSlug}:`, error.message);
    return {
      content: 'Content not available',
      hints: [],
      topicTags: [],
      similarQuestions: []
    };
  }
}

async function storeQuestions() {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Fetch questions list
    const questions = await fetchQuestionList();
    console.log(`Fetched ${questions.length} questions`);

    // Process each question
    for (const question of questions) {
      try {
        // Check if question already exists
        const existingQuestion = await Question.findOne({ questionId: question.questionId });
        if (existingQuestion) {
          console.log(`Question ${question.title} already exists, skipping...`);
          continue;
        }

        // Fetch additional details
        const details = await fetchQuestionDetail(question.titleSlug);

        // Create new question document
        const newQuestion = new Question({
          questionId: question.questionId,
          title: question.title,
          titleSlug: question.titleSlug,
          difficulty: question.difficulty,
          topicTags: details.topicTags,
          content: details.content,
          hints: details.hints,
          similarQuestions: details.similarQuestions,
          acceptanceRate: question.acRate,
          likes: 0,
          dislikes: 0
        });

        await newQuestion.save();
        console.log(`Stored question: ${question.title}`);
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 3000)); // Increased delay to 3 seconds
      } catch (error) {
        console.error(`Error processing question ${question.title}:`, error.message);
      }
    }

    console.log('Finished storing questions');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
storeQuestions(); 