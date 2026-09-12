// js/grades/grade5.js

window.grade5Data = {
  English: {
    "Parts of Speech": database.create50Questions("English", "Parts of Speech"),
    "Tenses & Verb Forms": database.create50Questions("English", "Tenses & Verb Forms"),
    "Vocabulary & Context Clues": database.create50Questions("English", "Vocabulary & Context Clues"),
    "Reading Comprehension": database.create50Questions("English", "Reading Comprehension"),
    "Punctuation & Capitalization": database.create50Questions("English", "Punctuation & Capitalization")
  },
  Maths: {
    "Decimals & Fractions": database.create50Questions("Maths", "Decimals & Fractions"),
    "Percentages & Ratios": database.create50Questions("Maths", "Percentages & Ratios"),
    "Basic Geometry & Angles": database.create50Questions("Maths", "Basic Geometry & Angles"),
    "Perimeter, Area & Volume": database.create50Questions("Maths", "Perimeter, Area & Volume"),
    "Data Handling & Averages": database.create50Questions("Maths", "Data Handling & Averages")
  },
  Science: {
    "Food, Health & Diseases": database.create50Questions("Science", "Food, Health & Diseases"),
    "Plant Life & Reproduction": database.create50Questions("Science", "Plant Life & Reproduction"),
    "States of Matter & Changes": database.create50Questions("Science", "States of Matter & Changes"),
    "Force, Work & Energy": database.create50Questions("Science", "Force, Work & Energy"),
    "Earth, Sun & Moon": database.create50Questions("Science", "Earth, Sun & Moon")
  },
  GK: {
    "World Capitals & Countries": database.create50Questions("GK", "World Capitals & Countries"),
    "Inventions & Technology": database.create50Questions("GK", "Inventions & Technology"),
    "Famous Leaders & Pioneers": database.create50Questions("GK", "Famous Leaders & Pioneers"),
    "Sports Rules & Tournaments": database.create50Questions("GK", "Sports Rules & Tournaments"),
    "Space Exploration History": database.create50Questions("GK", "Space Exploration History")
  }
};