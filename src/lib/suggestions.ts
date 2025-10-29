const suggestions = [
  "Explain quantum computing in simple terms",
  "Got any creative ideas for a 10 year old’s birthday?",
  "How do I make an HTTP request in Javascript?",
  "What is the best way to lose weight?",
  "Suggest some good sci-fi books",
  "How do I improve my public speaking skills?",
  "What are the benefits of meditation?",
  "Can you help me plan a trip to Japan?",
  "What are some healthy dinner recipes?",
  "Explain the theory of relativity",
];

export function getThreeRandomSuggestions() {
  const shuffled = suggestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
