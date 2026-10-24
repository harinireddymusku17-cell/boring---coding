export const initialCourses = [
  {
    courseId: 'py-101',
    title: 'Python Essentials: From Zero to Code Hero',
    slug: 'python-essentials',
    language: 'python',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    description: 'Master core Python syntax, functions, data structures, and algorithmic logic through hands-on gamified exercises.',
    icon: 'Terminal',
    bannerColor: 'from-blue-600 to-emerald-600',
    estimatedHours: 8,
    xpReward: 600,
    isPremium: false,
    modules: [
      {
        moduleId: 'py-mod-1',
        title: 'Module 1: Python Fundamentals & Data Types',
        lessons: [
          { lessonId: 'py-les-1', title: 'Variables, Types & String Formatting', durationMinutes: 12, xp: 50 },
          { lessonId: 'py-les-2', title: 'Control Flow: If, Elif & Boolean Logic', durationMinutes: 15, xp: 60 },
          { lessonId: 'py-les-3', title: 'Loops & List Comprehensions', durationMinutes: 18, xp: 75 },
        ],
      },
      {
        moduleId: 'py-mod-2',
        title: 'Module 2: Data Structures & Functions',
        lessons: [
          { lessonId: 'py-les-4', title: 'Functions, Parameters & Scope', durationMinutes: 20, xp: 80 },
          { lessonId: 'py-les-5', title: 'Dictionaries & Sets in Practice', durationMinutes: 20, xp: 85 },
        ],
      },
    ],
  },
  {
    courseId: 'js-101',
    title: 'JavaScript Supercharged: Modern ES6+ & Beyond',
    slug: 'javascript-supercharged',
    language: 'javascript',
    category: 'Web Development',
    difficulty: 'Beginner',
    description: 'Conquer modern JavaScript: closures, array transforms, asynchronous promises, async/await, and event-driven patterns.',
    icon: 'Zap',
    bannerColor: 'from-amber-500 to-yellow-600',
    estimatedHours: 10,
    xpReward: 750,
    isPremium: false,
    modules: [
      {
        moduleId: 'js-mod-1',
        title: 'Module 1: Modern Syntax & Functional Arrays',
        lessons: [
          { lessonId: 'js-les-1', title: 'Destructuring, Spread & Arrow Functions', durationMinutes: 14, xp: 60 },
          { lessonId: 'js-les-2', title: 'Mastering Map, Filter & Reduce', durationMinutes: 20, xp: 80 },
        ],
      },
      {
        moduleId: 'js-mod-2',
        title: 'Module 2: Asynchronous JavaScript',
        lessons: [
          { lessonId: 'js-les-3', title: 'Promises & Async/Await Without Tears', durationMinutes: 22, xp: 90 },
        ],
      },
    ],
  },
  {
    courseId: 'java-101',
    title: 'Java Architecture & Object-Oriented Principles',
    slug: 'java-architecture',
    language: 'java',
    category: 'Backend & OOP',
    difficulty: 'Intermediate',
    description: 'Learn robust enterprise programming: classes, inheritance, polymorphism, abstract interfaces, and Collections framework.',
    icon: 'Coffee',
    bannerColor: 'from-red-500 to-orange-600',
    estimatedHours: 12,
    xpReward: 850,
    isPremium: false,
    modules: [
      {
        moduleId: 'java-mod-1',
        title: 'Module 1: Object-Oriented Core',
        lessons: [
          { lessonId: 'java-les-1', title: 'Classes, Objects & Encapsulation', durationMinutes: 18, xp: 75 },
          { lessonId: 'java-les-2', title: 'Inheritance, Polymorphism & Interfaces', durationMinutes: 25, xp: 100 },
        ],
      },
    ],
  },
  {
    courseId: 'cpp-101',
    title: 'C++ Systems & Algorithmic Foundations',
    slug: 'cpp-systems',
    language: 'cpp',
    category: 'Systems & DSA',
    difficulty: 'Advanced',
    description: 'Deep dive into memory pointers, references, STL vectors, algorithmic time complexity, and fast compute operations.',
    icon: 'Cpu',
    bannerColor: 'from-cyan-600 to-blue-700',
    estimatedHours: 15,
    xpReward: 1000,
    isPremium: true,
    modules: [
      {
        moduleId: 'cpp-mod-1',
        title: 'Module 1: Pointers & Direct Memory',
        lessons: [
          { lessonId: 'cpp-les-1', title: 'Pointers, References & The Stack vs Heap', durationMinutes: 25, xp: 100 },
          { lessonId: 'cpp-les-2', title: 'STL Vectors, Maps & Complexity Analysis', durationMinutes: 30, xp: 120 },
        ],
      },
    ],
  },
];

export const initialLessons = [
  {
    lessonId: 'py-les-1',
    courseId: 'py-101',
    title: 'Variables, Types & String Formatting',
    order: 1,
    durationMinutes: 12,
    xp: 50,
    learningObjectives: [
      'Understand dynamic typing in Python and variable naming rules',
      'Distinguish integers, floats, booleans, and strings',
      'Use modern f-strings for clean string interpolation',
    ],
    theoryContent: `### Welcome to Python!

In Python, variables are dynamically typed. That means you do not have to declare types like \`int\` or \`String\` explicitly—Python infers them at runtime!

\`\`\`python
# Declaring variables
player_name = "Kira"
level = 14
xp = 4250.5
is_active = True
\`\`\`

#### Modern f-strings (Formatted String Literals)
Python 3.6 introduced f-strings, which are the fastest and most readable way to format text:

\`\`\`python
summary = f"Player {player_name} is Level {level} with {xp} XP!"
print(summary)
\`\`\`
`,
    codeExample: {
      language: 'python',
      code: `player_name = "Alex"
level = 5
xp_to_next = 250

greeting = f"Welcome back, {player_name}! You need {xp_to_next} XP to reach Level {level + 1}."
print(greeting)`,
      explanation: 'f-strings evaluate expressions inside curly braces {} directly at runtime.',
    },
    quizzes: [
      {
        questionId: 'q-py-1',
        type: 'mcq',
        question: 'Which syntax creates an f-string in Python?',
        options: [
          'f"Hello {name}"',
          'format("Hello %s", name)',
          'string("Hello " + name)',
          '#"Hello {name}"#',
        ],
        correctAnswer: 'f"Hello {name}"',
        explanation: 'Prefixing string literals with "f" enables embedded expressions inside {}.',
        hint: 'It starts with the letter f before the quotation marks.',
      },
      {
        questionId: 'q-py-2',
        type: 'fill-in-blank',
        question: 'Complete the expression to interpolate the variable `hero`: f"Hello, {______}!"',
        options: ['hero'],
        correctAnswer: 'hero',
        explanation: 'Variables to be interpolated are placed directly inside the curly brackets.',
        hint: 'Enter the exact name of the variable mentioned in the prompt.',
      },
    ],
    codingExercise: {
      prompt: 'Write a JavaScript function `solve(name, level)` that returns a formatted string: "Agent {name} is at Rank {level}!"',
      language: 'javascript',
      initialCode: `function solve(name, level) {
  // Write your code here
  return "";
}`,
      solutionTemplate: `function solve(name, level) {
  return \`Agent \${name} is at Rank \${level}!\`;
}`,
      testCases: [
        {
          input: '"Neo", 10',
          expectedOutput: 'Agent Neo is at Rank 10!',
          description: 'Standard agent formatting',
        },
        {
          input: '"Trinity", 99',
          expectedOutput: 'Agent Trinity is at Rank 99!',
          description: 'High rank formatting',
        },
      ],
      hints: [
        'Use backticks (`) with ${name} and ${level} to format the template literal in JavaScript.',
        'Ensure exact match including exclamation mark and spacing.',
      ],
    },
  },
  {
    lessonId: 'js-les-1',
    courseId: 'js-101',
    title: 'Destructuring, Spread & Arrow Functions',
    order: 1,
    durationMinutes: 14,
    xp: 60,
    learningObjectives: [
      'Master object and array destructuring syntax',
      'Use the spread operator (...) to clone and combine arrays & objects',
      'Write concise, idiomatic arrow functions with implicit returns',
    ],
    theoryContent: `### Modern ES6+ JavaScript Features

ES6 revolutionized JavaScript by making syntax more concise and predictable.

#### 1. Object Destructuring
Instead of repetitive property access, unpack properties directly:
\`\`\`javascript
const user = { username: 'cipher_99', level: 12, streak: 7 };
const { username, streak } = user;
\`\`\`

#### 2. Spread Operator (\`...\`)
Easily merge objects or arrays without mutating originals:
\`\`\`javascript
const baseStats = { hp: 100, mp: 50 };
const buffedStats = { ...baseStats, shield: 25 };
\`\`\`

#### 3. Arrow Functions
Arrow functions provide concise syntax and lexical \`this\` binding:
\`\`\`javascript
const double = x => x * 2;
const add = (a, b) => a + b;
\`\`\`
`,
    codeExample: {
      language: 'javascript',
      code: `const hero = { name: 'Aria', hp: 100, xp: 350 };
const gainXP = (currentHero, gained) => ({
  ...currentHero,
  xp: currentHero.xp + gained
});

const updated = gainXP(hero, 150);
console.log(updated);`,
      explanation: 'The arrow function returns a new object combining existing properties with updated XP.',
    },
    quizzes: [
      {
        questionId: 'q-js-1',
        type: 'mcq',
        question: 'What does the spread operator (...) do when used on an object?',
        options: [
          'Shallow copies all enumerable own properties onto a new object',
          'Deletes all properties from the original object',
          'Locks the object so properties cannot be modified',
          'Converts the object into an HTML string',
        ],
        correctAnswer: 'Shallow copies all enumerable own properties onto a new object',
        explanation: 'Spread extracts key-value pairs and places them into the destination object.',
        hint: 'Think of taking everything out of a box and placing it into a new box.',
      },
    ],
    codingExercise: {
      prompt: 'Write a function `solve(arr, multiplier)` that uses array mapping or an arrow function to return an array where every element is multiplied by `multiplier`.',
      language: 'javascript',
      initialCode: `function solve(arr, multiplier) {
  // Return the multiplied array
  return [];
}`,
      solutionTemplate: `function solve(arr, multiplier) {
  return arr.map(x => x * multiplier);
}`,
      testCases: [
        {
          input: '[1, 2, 3], 2',
          expectedOutput: '2,4,6',
          description: 'Multiply array elements by 2',
        },
        {
          input: '[5, 10, 15], 3',
          expectedOutput: '15,30,45',
          description: 'Multiply array elements by 3',
        },
      ],
      hints: [
        'Use arr.map(n => n * multiplier)',
      ],
    },
  },
  {
    lessonId: 'js-les-2',
    courseId: 'js-101',
    title: 'Mastering Map, Filter & Reduce',
    order: 2,
    durationMinutes: 20,
    xp: 80,
    learningObjectives: [
      'Transform collections using .map()',
      'Select elements satisfying predicates with .filter()',
      'Aggregate arrays into single values with .reduce()',
    ],
    theoryContent: `### Functional Array Iteration

Modern developers rarely use classic \`for\` loops for simple transforms. \`map\`, \`filter\`, and \`reduce\` express your intent declaratively!

\`\`\`javascript
const scores = [85, 92, 44, 76, 98, 62];

// 1. Filter: select only passing scores (>= 70)
const passing = scores.filter(s => s >= 70);

// 2. Map: curved scores (+5)
const curved = passing.map(s => s + 5);

// 3. Reduce: calculate total
const total = curved.reduce((acc, curr) => acc + curr, 0);
\`\`\`
`,
    codeExample: {
      language: 'javascript',
      code: `const numbers = [1, 2, 3, 4, 5, 6];
const evenSquares = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * n);

console.log(evenSquares); // [4, 16, 36]`,
      explanation: 'Chaining array methods creates clean, declarative data pipelines.',
    },
    quizzes: [
      {
        questionId: 'q-js-2',
        type: 'mcq',
        question: 'Which method should you use if you want to compute a single sum from an array of numbers?',
        options: ['reduce()', 'filter()', 'map()', 'slice()'],
        correctAnswer: 'reduce()',
        explanation: 'reduce() accumulates all elements into a single accumulated result.',
        hint: 'Think of "reducing" a whole list down to one number.',
      },
    ],
    codingExercise: {
      prompt: 'Write a function `solve(numbers)` that returns the sum of only positive numbers in the array. Return 0 if no positive numbers exist.',
      language: 'javascript',
      initialCode: `function solve(numbers) {
  // Write your code here
  return 0;
}`,
      solutionTemplate: `function solve(numbers) {
  return numbers.filter(n => n > 0).reduce((sum, n) => sum + n, 0);
}`,
      testCases: [
        {
          input: '[1, -4, 7, 12]',
          expectedOutput: '20',
          description: 'Sum of positive numbers 1 + 7 + 12 = 20',
        },
        {
          input: '[-5, -2, -9]',
          expectedOutput: '0',
          description: 'No positive numbers',
        },
      ],
      hints: [
        'Filter numbers > 0 first, then reduce to sum them.',
      ],
    },
  },
];

export const initialAchievements = [
  {
    achievementId: 'first_byte',
    title: 'First Byte',
    description: 'Complete your first coding lesson on Boring Coding.',
    icon: 'Sparkles',
    category: 'Progress',
    rarity: 'Common',
    xpReward: 100,
    requirement: { type: 'lessons_completed', target: 1 },
  },
  {
    achievementId: 'streak_flame_3',
    title: 'Streak Novice',
    description: 'Maintain an active daily learning streak for 3 consecutive days.',
    icon: 'Flame',
    category: 'Consistency',
    rarity: 'Rare',
    xpReward: 250,
    requirement: { type: 'streak_days', target: 3 },
  },
  {
    achievementId: 'quiz_master',
    title: 'Quiz Prodigy',
    description: 'Score 100% on three interactive lesson quizzes.',
    icon: 'Award',
    category: 'Mastery',
    rarity: 'Rare',
    xpReward: 300,
    requirement: { type: 'quizzes_perfect', target: 3 },
  },
  {
    achievementId: 'theme_explorer',
    title: 'Chameleon Coder',
    description: 'Experience all 7 dynamic UI themes in the theme engine.',
    icon: 'Palette',
    category: 'Exploration',
    rarity: 'Common',
    xpReward: 150,
    requirement: { type: 'theme_switch', target: 7 },
  },
  {
    achievementId: 'code_wizard',
    title: 'Code Wizard',
    description: 'Earn a total of 1,000 XP through lessons and playground solutions.',
    icon: 'Crown',
    category: 'Prestige',
    rarity: 'Epic',
    xpReward: 500,
    requirement: { type: 'xp_earned', target: 1000 },
  },
  {
    achievementId: 'polyglot',
    title: 'The Polyglot',
    description: 'Run code in 3 distinct programming languages in the Playground.',
    icon: 'Globe',
    category: 'Mastery',
    rarity: 'Legendary',
    xpReward: 750,
    requirement: { type: 'languages_run', target: 3 },
  },
];

export const initialDailyMissions = [
  {
    missionId: 'm-1',
    title: 'Daily Code Practice',
    description: 'Complete at least 1 coding exercise or playground run today.',
    icon: 'Code',
    targetCount: 1,
    xpReward: 50,
    category: 'code',
  },
  {
    missionId: 'm-2',
    title: 'Quiz Enthusiast',
    description: 'Answer 2 quiz questions accurately in any lesson.',
    icon: 'CheckCircle2',
    targetCount: 2,
    xpReward: 60,
    category: 'quiz',
  },
  {
    missionId: 'm-3',
    title: 'AI Consultation',
    description: 'Ask the AI Tutor to explain a concept or debug a code snippet.',
    icon: 'Bot',
    targetCount: 1,
    xpReward: 40,
    category: 'lesson',
  },
];

export const initialLeaderboard = [
  {
    rank: 1,
    name: 'Ada Lovelace',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ada',
    xp: 6840,
    level: 14,
    streak: 28,
    badge: 'Legendary Dev',
    isSample: true,
  },
  {
    rank: 2,
    name: 'Linus T.',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Linus',
    xp: 5920,
    level: 12,
    streak: 21,
    badge: 'Kernel Master',
    isSample: true,
  },
  {
    rank: 3,
    name: 'Grace Hopper',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Grace',
    xp: 5410,
    level: 11,
    streak: 19,
    badge: 'Compiler Pioneer',
    isSample: true,
  },
  {
    rank: 4,
    name: 'Alan Turing',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alan',
    xp: 4890,
    level: 10,
    streak: 15,
    badge: 'Logic Master',
    isSample: true,
  },
  {
    rank: 5,
    name: 'Margaret H.',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Margaret',
    xp: 4320,
    level: 9,
    streak: 14,
    badge: 'Apollo Architect',
    isSample: true,
  },
  {
    rank: 6,
    name: 'Ken Thompson',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ken',
    xp: 3880,
    level: 8,
    streak: 11,
    badge: 'Unix Maestro',
    isSample: true,
  },
  {
    rank: 7,
    name: 'Guido van R.',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Guido',
    xp: 3450,
    level: 7,
    streak: 9,
    badge: 'Pythonista',
    isSample: true,
  },
];
