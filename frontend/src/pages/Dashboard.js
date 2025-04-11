import React, { useState } from 'react';

function Dashboard() {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const tags = ['Array', 'String', 'Tree', 'Graph', 'Dynamic Programming', 'Math'];
  const times = ['5 min', '10 min', '15 min', '30 min'];

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="w-full max-w-7xl mx-auto px-4 flex gap-8">
        {/* Game Modes */}
        <div className="flex-1">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-white mb-4">Single Player</h2>
              <p className="text-gray-300 mb-4">Practice and improve your coding skills at your own pace</p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                Start Solo Game
              </button>
            </div>

            <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-white mb-4">Multiplayer</h2>
              <p className="text-gray-300 mb-4">Compete with other players in real-time coding battles</p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                Find Match
              </button>
            </div>
          </div>
        </div>

        {/* Game Settings */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Game Settings</h2>
            
            {/* Time Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Choose Your Time</h3>
              <div className="grid grid-cols-2 gap-4">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-xl border ${
                      selectedTime === time
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-gray-600'
                    } transition-all duration-200`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Difficulty</h3>
              <div className="grid grid-cols-3 gap-4">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-xl border ${
                      selectedDifficulty === difficulty
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-gray-600'
                    } transition-all duration-200`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Selection */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedTags.includes(tag)
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-gray-600'
                    } transition-all duration-200`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 