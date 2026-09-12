// js/grades/grade3.js

window.grade3Data = {
  English: {
    "Nouns (Common & Proper)": database.create50Questions("English", "Nouns (Common & Proper)"),
    "Adjectives & Adverbs": database.create50Questions("English", "Adjectives & Adverbs"),
    "Tenses (Present, Past, Future)": database.create50Questions("English", "Tenses (Present, Past, Future)"),
    "Conjunctions (and, but, or)": database.create50Questions("English", "Conjunctions (and, but, or)"),
    "Synonyms & Antonyms": database.create50Questions("English", "Synonyms & Antonyms")
  },
  Maths: {
    "3-Digit Addition & Subtraction": database.create50Questions("Maths", "3-Digit Addition & Subtraction"),
    "Introduction to Multiplication": database.create50Questions("Maths", "Introduction to Multiplication"),
    "Basic Division": database.create50Questions("Maths", "Basic Division"),
    "Fractions (Halves & Quarters)": database.create50Questions("Maths", "Fractions (Halves & Quarters)"),
    "Measurement (Length & Weight)": database.create50Questions("Maths", "Measurement (Length & Weight)")
  },
  EVS: {
    "Living & Non-Living Things": database.create50Questions("EVS", "Living & Non-Living Things"),
    "Plant Parts & Functions": database.create50Questions("EVS", "Plant Parts & Functions"),
    "Human Organs & Systems": database.create50Questions("EVS", "Human Organs & Systems"),
    "Water & Air": database.create50Questions("EVS", "Water & Air"),
    "Means of Transport": database.create50Questions("EVS", "Means of Transport")
  },
  GK: {
    "Inventions & Discoveries": database.create50Questions("GK", "Inventions & Discoveries"),
    "Solar System & Planets": database.create50Questions("GK", "Solar System & Planets"),
    "Sports & Games": database.create50Questions("GK", "Sports & Games"),
    "Famous World Landmarks": database.create50Questions("GK", "Famous World Landmarks"),
    "Capitals & Flags": database.create50Questions("GK", "Capitals & Flags")
  }
};