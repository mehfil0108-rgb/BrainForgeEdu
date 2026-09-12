// js/database.js

window.database = window.database || {};

// Helper function to generate question data for topics
window.database.create50Questions = function(subject, topic) {
  const questions = [];
  for (let i = 1; i <= 50; i++) {
    questions.push({
      id: i,
      question: `Sample Question ${i} for ${topic} (${subject})?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 0
    });
  }
  return questions;
};

// Robust dynamic grade loader that fetches from the root Grades folder
window.database.loadGrade = function(num, callback) {
  // If already cached, return immediately
  if (window.database[num]) {
    window.database.currentGradeData = window.database[num];
    if (callback) callback(window.database[num]);
    return;
  }

  const scriptId = 'grade-script-active';
  const oldScript = document.getElementById(scriptId);
  if (oldScript) oldScript.remove();

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = `Grades/grade${num}.js`;

  script.onload = () => {
    const loadedData = window[`grade${num}Data`] || window[`grade${num}`] || window[`Grade${num}Data`];

    if (loadedData && Object.keys(loadedData).length > 0) {
      window.database[num] = loadedData;
      window.database.currentGradeData = loadedData;
      console.log(`BrainForge Engine: Grade ${num} loaded successfully!`, loadedData);
      if (callback) callback(loadedData);
    } else {
      console.error(`BrainForge: Grade ${num}.js loaded, but data object was empty or undefined.`);
    }
  };

  script.onerror = () => {
    console.error(`BrainForge: Failed to load Grades/grade${num}.js. Check if the file exists in the root Grades folder.`);
  };

  document.head.appendChild(script);
};

// Expose aliases used across different scripts
window.gradeBasedDatabase = window.database;