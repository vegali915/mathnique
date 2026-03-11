// Expert Mode 問題自動生成ロジック

export type ExpertQuestion = {
  question: string
  choices: string[]
  answer: string
  explanation: string
  genre: string
  topPercent: number
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function makeChoices(answer: string, wrongs: string[]): string[] {
  return shuffle([answer, ...wrongs.slice(0, 3)])
}

// ジャンル1：ガウスの足し算
function generateGauss(): ExpertQuestion {
  const nOptions = [20, 30, 40, 50, 60, 70, 80, 100]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = (n * (n + 1)) / 2

  return {
    question: `1 + 2 + 3 + … + ${n} = ?`,
    choices: makeChoices(
      String(answer),
      [String(answer - n), String(answer + n), String(n * n)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② Here's why:\nPair up numbers from both ends:\n"1 + ${n}", "2 + ${n - 1}", "3 + ${n - 2}"…\nEvery pair sums to ${n + 1}!\n\n③ Number of pairs: ${n} ÷ 2 = ${n / 2}\n${n + 1} × ${n / 2} = ${answer}`,
    genre: "Gauss's Sum",
    topPercent: 30
  }
}

// ジャンル2：トーナメントの試合数
function generateTournament(): ExpertQuestion {
  const settings = ['sports tournament', 'gaming tournament', 'cooking tournament', 'quiz tournament']
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(8, 100)
  const answer = n - 1

  return {
    question: `${n} players enter a ${setting}.\nHow many matches are needed to decide the champion?`,
    choices: makeChoices(
      String(answer),
      [String(answer - 1), String(answer + 1), String(Math.floor(n / 2))]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer} matches.\n\n② Here's why:\nIn a tournament, exactly 1 player is eliminated per match.\n\n③ With ${n} players, all but 1 must be eliminated:\n${n} - 1 = ${answer} eliminations\n\n④ One match per elimination, so:\n${answer} matches total!\nThis rule works no matter how many players there are.`,
    genre: 'Tournament Matches',topPercent: 30
  }
}

// ジャンル3：握手・乾杯の総数
function generateHandshake(): ExpertQuestion {
  const settings = [
    { scene: 'party', action: 'handshake' },
    { scene: 'sports event', action: 'high-five' },
    { scene: 'networking event', action: 'handshake' },
    { scene: 'meeting', action: 'greeting' },
  ]
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(5, 20)
  const answer = (n * (n - 1)) / 2

  return {
    question: `${n} people attend a ${setting.scene}.\nIf everyone exchanges a ${setting.action} with each other once, how many ${setting.action}s in total?`,
    choices: makeChoices(
      String(answer),
      [String(n * (n - 1)), String(answer + n), String(answer - n)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② Here's why:\nEach of the ${n} people exchanges a ${setting.action} with ${n - 1} others:\n${n} × ${n - 1} = ${n * (n - 1)}… but wait!\n\n③ This counts each ${setting.action} twice —\nonce for A and once for B.\nSo we divide by 2.\n\n④ ${n * (n - 1)} ÷ 2 = ${answer}`,
    genre: 'Handshakes & High-Fives',topPercent: 15
  }
}

// ジャンル4：倍増系
function generateDoubling(): ExpertQuestion {
  const settings = [
    { subject: 'bacteria', unit: 'minute', container: 'bottle' },
    { subject: 'water lilies', unit: 'day', container: 'pond' },
    { subject: 'algae', unit: 'hour', container: 'tank' },
    { subject: 'mold', unit: 'minute', container: 'petri dish' },
  ]
  const setting = settings[randInt(0, settings.length - 1)]

  const questionTypes = [
    () => {
      const n = randInt(10, 60)
      const answer = n - 1
      return {
        question: `${setting.subject} double every ${setting.unit}.\nIf the ${setting.container} is full after ${n} ${setting.unit}s, when was it half full?`,
        answer: `${answer} ${setting.unit}s`,
        wrongs: [`${Math.floor(n / 2)} ${setting.unit}s`, `${n - 2} ${setting.unit}s`, `${n + 1} ${setting.unit}s`],
        explanation: `① The answer is ${answer} ${setting.unit}s.\n\n② Here's why:\nIf something doubles every ${setting.unit},\nthat means 1 ${setting.unit} ago it was half the current amount.\n\n③ If the ${setting.container} is full at ${n} ${setting.unit}s,\nthen 1 ${setting.unit} before = ${n - 1} ${setting.unit}s → half full!\n\n④ It's tempting to say "half = ${Math.floor(n / 2)} ${setting.unit}s",\nbut with doubling, the last ${setting.unit} doubles everything at once.`
      }
    },
    () => {
      const n = randInt(10, 60)
      return {
        question: `${setting.subject} double every ${setting.unit}.\nIf the ${setting.container} is full after ${n} ${setting.unit}s, how full is it at ${n - 2} ${setting.unit}s?`,
        answer: '25%',
        wrongs: ['50%', '75%', '12.5%'],
        explanation: `① The answer is 25%.\n\n② Here's why:\nAt ${n} ${setting.unit}s → 100% (full)\n1 ${setting.unit} earlier (${n - 1} ${setting.unit}s) → 50%\n1 more ${setting.unit} earlier (${n - 2} ${setting.unit}s) → 25%\n\n③ 2 ${setting.unit}s before full = one quarter = 25%\n\n④ With doubling, growth explodes at the end.\nMost of the increase happens in the final few ${setting.unit}s!`
      }
    }
  ]

  const qt = questionTypes[randInt(0, questionTypes.length - 1)]()

  return {
    question: qt.question,
    choices: makeChoices(qt.answer, qt.wrongs),
    answer: qt.answer,
    explanation: qt.explanation,
    genre: 'Doubling',topPercent: 5
  }
}

// ジャンル5：11との掛け算
function generateTimes11(): ExpertQuestion {
  const n = randInt(12, 99)
  const answer = 11 * n
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const mid = tens + ones

  return {
    question: `11 × ${n} = ?`,
    choices: makeChoices(
      String(answer),
      [String(answer + 11), String(answer - 11), String(answer + 22)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② There's a trick for multiplying by 11!\n${n} has tens digit "${tens}" and ones digit "${ones}"\n\n③ The trick: insert the sum of both digits in between!\n${tens}・(${tens}+${ones})・${ones}\n= ${tens}・${mid}・${ones}${mid >= 10 ? '\n\n④ When the middle digit is 10 or more, don\'t forget to carry!' : `\n\n④ Put them together and you get ${answer}!`}`,
    genre: 'Multiplying by 11',topPercent: 30
  }
}

// ジャンル6：余事象の確率
function generateComplementProbability(): ExpertQuestion {
  const patterns = [
    {
      question: 'Flip 3 coins at once.\nWhat is the probability that at least one is heads?',
      answer: '7/8',
      wrongs: ['1/2', '3/4', '6/8'],
      explanation: `① The answer is 7/8.\n\n② Calculating "at least one heads" directly is tricky!\n\n③ Instead, use the complement:\n"No heads at all" = all tails\nProbability = (1/2)³ = 1/8\n\n④ Answer = 1 - 1/8 = 7/8`
    },
    {
      question: 'Roll 2 dice at once.\nWhat is the probability that at least one shows 6?',
      answer: '11/36',
      wrongs: ['1/6', '1/3', '2/6'],
      explanation: `① The answer is 11/36.\n\n② Use the complement:\n"Neither die shows 6" =\n(5/6) × (5/6) = 25/36\n\n③ Answer = 1 - 25/36 = 11/36`
    },
    {
      question: 'Flip 4 coins at once.\nWhat is the probability that at least one is heads?',
      answer: '15/16',
      wrongs: ['1/2', '3/4', '7/8'],
      explanation: `① The answer is 15/16.\n\n② Use the complement:\n"No heads at all" = all tails\nProbability = (1/2)⁴ = 1/16\n\n③ Answer = 1 - 1/16 = 15/16`
    },
    {
      question: 'Flip 5 coins at once.\nWhat is the probability that at least one is heads?',
      answer: '31/32',
      wrongs: ['15/16', '7/8', '1/2'],
      explanation: `① The answer is 31/32.\n\n② Use the complement:\n"No heads at all" = all tails\nProbability = (1/2)⁵ = 1/32\n\n③ Answer = 1 - 1/32 = 31/32`
    },
    {
      question: 'Roll 3 dice at once.\nWhat is the probability that at least one shows 6?',
      answer: '91/216',
      wrongs: ['1/6', '1/2', '125/216'],
      explanation: `① The answer is 91/216.\n\n② Use the complement:\n"No die shows 6" =\n(5/6)³ = 125/216\n\n③ Answer = 1 - 125/216 = 91/216`
    },
    {
      question: 'Roll 2 dice at once.\nWhat is the probability that at least one is even?',
      answer: '3/4',
      wrongs: ['1/2', '1/4', '2/3'],
      explanation: `① The answer is 3/4.\n\n② Use the complement:\n"Neither die is even" = both are odd\nOdd numbers are 1, 3, 5, so:\n(3/6)² = (1/2)² = 1/4\n\n③ Answer = 1 - 1/4 = 3/4`
    },
    {
      question: 'Two people play rock-paper-scissors.\nWhat is the probability that at least one throws Rock?',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],
      explanation: `① The answer is 5/9.\n\n② Use the complement:\n"Nobody throws Rock" =\n(2/3)² = 4/9\n\n③ Answer = 1 - 4/9 = 5/9`
    },
    {
      question: 'Two people play rock-paper-scissors.\nWhat is the probability that at least one throws Scissors?',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],
      explanation: `① The answer is 5/9.\n\n② Use the complement:\n"Nobody throws Scissors" =\n(2/3)² = 4/9\n\n③ Answer = 1 - 4/9 = 5/9`
    },
    {
      question: 'Two people play rock-paper-scissors.\nWhat is the probability that at least one throws Paper?',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],
      explanation: `① The answer is 5/9.\n\n② Use the complement:\n"Nobody throws Paper" =\n(2/3)² = 4/9\n\n③ Answer = 1 - 4/9 = 5/9`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Complement Probability',topPercent: 15
  }
}

// ジャンル7：指数の分割計算
function generateExponentSplit(): ExpertQuestion {
  const patterns = [
    {
      question: 'What is 2 to the power of 10?',
      answer: '1024',
      wrongs: ['512', '2048', '768'],
      explanation: `① The answer is 1024.\n\n② Split the exponent in half:\n2¹⁰ = 2⁵ × 2⁵\n\n③ Since 2⁵ = 32:\n32 × 32 = 1024!`
    },
    {
      question: 'What is 2 to the power of 8?',
      answer: '256',
      wrongs: ['128', '512', '64'],
      explanation: `① The answer is 256.\n\n② Split the exponent in half:\n2⁸ = 2⁴ × 2⁴\n\n③ Since 2⁴ = 16:\n16 × 16 = 256!`
    },
    {
      question: 'What is 3 to the power of 4?',
      answer: '81',
      wrongs: ['64', '27', '12'],
      explanation: `① The answer is 81.\n\n② Split the exponent in half:\n3⁴ = 3² × 3²\n\n③ Since 3² = 9:\n9 × 9 = 81!`
    },
    {
      question: 'What is 2 to the power of 12?',
      answer: '4096',
      wrongs: ['2048', '8192', '1024'],
      explanation: `① The answer is 4096.\n\n② Split the exponent in half:\n2¹² = 2⁶ × 2⁶\n\n③ Since 2⁶ = 64:\n64 × 64 = 4096!`
    },
    {
      question: 'What is 3 to the power of 6?',
      answer: '729',
      wrongs: ['512', '648', '810'],
      explanation: `① The answer is 729.\n\n② Split the exponent in half:\n3⁶ = 3³ × 3³\n\n③ Since 3³ = 27:\n27 × 27 = 729!`
    },
    {
      question: 'What is 4 to the power of 4?',
      answer: '256',
      wrongs: ['128', '512', '64'],
      explanation: `① The answer is 256.\n\n② Split the exponent in half:\n4⁴ = 4² × 4²\n\n③ Since 4² = 16:\n16 × 16 = 256!`
    },
    {
      question: 'What is 5 to the power of 4?',
      answer: '625',
      wrongs: ['500', '525', '650'],
      explanation: `① The answer is 625.\n\n② Split the exponent in half:\n5⁴ = 5² × 5²\n\n③ Since 5² = 25:\n25 × 25 = 625!`
    },
    {
      question: 'What is 2 to the power of 6?',
      answer: '64',
      wrongs: ['32', '128', '48'],
      explanation: `① The answer is 64.\n\n② Split the exponent in half:\n2⁶ = 2³ × 2³\n\n③ Since 2³ = 8:\n8 × 8 = 64!`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Exponent Split',topPercent: 15
  }
}

// ジャンル8：奇数の和の法則
function generateOddSum(): ExpertQuestion {
  const nOptions = [3, 4, 5, 6, 7, 8, 9, 10]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = n * n
  const sequence = Array.from({length: n}, (_, i) => 2 * i + 1).join(' + ')

  return {
    question: `Add the first ${n} odd numbers starting from 1.\n1 + 3 + 5 + … = ?`,
    choices: makeChoices(
      String(answer),
      [String(answer - 1), String(answer + 1), String(answer - n)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② There's a rule: the sum of the first n odd numbers always equals n²!\n\n③ Adding ${n} odd numbers gives ${n}² = ${answer}\n\n④ Let's verify:\n${sequence} = ${answer}\nThis rule works for any value of n!`,
    genre: 'Sum of Odd Numbers',topPercent: 30
  }
}

// ジャンル9：隣り合う順列
function generateAdjacentPermutation(): ExpertQuestion {
  function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1)
  }

  const patterns = [
    // 既存：AとBが隣り合う
    {
      question: '4 people stand in a line.\nHow many ways can they stand so that A and B are next to each other?',
      answer: '12 ways',
      wrongs: ['24 ways', '6 ways', '48 ways'],
      explanation: `① The answer is 12 ways.\n\n② Treat A and B as one unit.\n3 units can be arranged in:\n3! = 6 ways\n\n③ A and B can also swap within the unit:\n× 2 = 12 ways!`
    },
    {
      question: '5 people stand in a line.\nHow many ways can they stand so that A and B are next to each other?',
      answer: '48 ways',
      wrongs: ['120 ways', '24 ways', '96 ways'],
      explanation: `① The answer is 48 ways.\n\n② Treat A and B as one unit.\n4 units can be arranged in:\n4! = 24 ways\n\n③ A and B can also swap within the unit:\n× 2 = 48 ways!`
    },
    {
      question: '6 people stand in a line.\nHow many ways can they stand so that A and B are next to each other?',
      answer: '240 ways',
      wrongs: ['720 ways', '120 ways', '480 ways'],
      explanation: `① The answer is 240 ways.\n\n② Treat A and B as one unit.\n5 units can be arranged in:\n5! = 120 ways\n\n③ A and B can also swap within the unit:\n× 2 = 240 ways!`
    },
    // A・B・Cが全員隣り合う
    {
      question: '5 people stand in a line.\nHow many ways can A, B, and C all stand next to each other?',
      answer: '36 ways',
      wrongs: ['12 ways', '24 ways', '48 ways'],
      explanation: `① The answer is 36 ways.\n\n② Treat A, B, and C as one unit.\n3 units can be arranged in:\n3! = 6 ways\n\n③ A, B, and C can be arranged within the unit in:\n3! = 6 ways\n\n④ 6 × 6 = 36 ways!`
    },
    {
      question: '6 people stand in a line.\nHow many ways can A, B, and C all stand next to each other?',
      answer: '144 ways',
      wrongs: ['72 ways', '36 ways', '288 ways'],
      explanation: `① The answer is 144 ways.\n\n② Treat A, B, and C as one unit.\n4 units can be arranged in:\n4! = 24 ways\n\n③ A, B, and C can be arranged within the unit in:\n3! = 6 ways\n\n④ 24 × 6 = 144 ways!`
    },
    // 円形
    {
      question: '4 people sit in a circle.\nHow many ways can they sit so that A and B are next to each other?',
      answer: '4 ways',
      wrongs: ['6 ways', '8 ways', '12 ways'],
      explanation: `① The answer is 4 ways.\n\n② Fix A in place to count circular arrangements.\nThe remaining 3 people can be arranged in:\n3! = 6 ways\n\n③ B sits next to A in 2 out of 3 remaining seats:\n2/3 of arrangements have B next to A\n\n④ 6 × 2/3 = 4 ways!`
    },
    {
      question: '5 people sit in a circle.\nHow many ways can they sit so that A and B are next to each other?',
      answer: '12 ways',
      wrongs: ['24 ways', '6 ways', '48 ways'],
      explanation: `① The answer is 12 ways.\n\n② Fix A in place to count circular arrangements.\nThe remaining 4 people can be arranged in:\n4! = 24 ways\n\n③ B sits next to A in 2 out of 4 remaining seats:\n2/4 of arrangements have B next to A\n\n④ 24 × 2/4 = 12 ways!`
    },
    {
      question: '6 people sit in a circle.\nHow many ways can they sit so that A and B are next to each other?',
      answer: '48 ways',
      wrongs: ['120 ways', '24 ways', '96 ways'],
      explanation: `① The answer is 48 ways.\n\n② Fix A in place to count circular arrangements.\nThe remaining 5 people can be arranged in:\n5! = 120 ways\n\n③ B sits next to A in 2 out of 5 remaining seats:\n2/5 of arrangements have B next to A\n\n④ 120 × 2/5 = 48 ways!`
    },
    // AとBが隣り合わない
    {
      question: '4 people stand in a line.\nHow many ways can they stand so that A and B are NOT next to each other?',
      answer: '12 ways',
      wrongs: ['6 ways', '18 ways', '24 ways'],
      explanation: `① The answer is 12 ways.\n\n② Total arrangements: 4! = 24 ways\n\n③ Arrangements where A and B ARE next to each other:\n3! × 2 = 12 ways\n\n④ NOT next to each other = Total - Next to each other\n24 - 12 = 12 ways!`
    },
    {
      question: '5 people stand in a line.\nHow many ways can they stand so that A and B are NOT next to each other?',
      answer: '72 ways',
      wrongs: ['48 ways', '60 ways', '96 ways'],
      explanation: `① The answer is 72 ways.\n\n② Total arrangements: 5! = 120 ways\n\n③ Arrangements where A and B ARE next to each other:\n4! × 2 = 48 ways\n\n④ NOT next to each other = Total - Next to each other\n120 - 48 = 72 ways!`
    },
    // 男女交互
    {
      question: '2 boys and 2 girls stand in a line.\nHow many ways can they alternate boy-girl-boy-girl?',
      answer: '8 ways',
      wrongs: ['4 ways', '12 ways', '24 ways'],
      explanation: `① The answer is 8 ways.\n\n② Alternating patterns are either\nBoy-Girl-Boy-Girl or Girl-Boy-Girl-Boy: 2 patterns\n\n③ Boys can be arranged in: 2! = 2 ways\nGirls can be arranged in: 2! = 2 ways\n\n④ 2 × 2 × 2 = 8 ways!`
    },
    {
      question: '3 boys and 3 girls stand in a line.\nHow many ways can they alternate boy-girl-boy-girl?',
      answer: '72 ways',
      wrongs: ['36 ways', '48 ways', '144 ways'],
      explanation: `① The answer is 72 ways.\n\n② Alternating patterns are either\nBoy-Girl-Boy-Girl-Boy-Girl or Girl-Boy-Girl-Boy-Girl-Boy: 2 patterns\n\n③ Boys can be arranged in: 3! = 6 ways\nGirls can be arranged in: 3! = 6 ways\n\n④ 2 × 6 × 6 = 72 ways!`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Adjacent Permutations',topPercent:5
  }
}

// ジャンル10：数字の登場回数
function generateDigitCount(): ExpertQuestion {
  const patterns = [
    {
      question: 'Write out all numbers from 1 to 100.\nHow many times does the digit "1" appear?',
      answer: '21 times',
      wrongs: ['20 times', '11 times', '10 times'],
      explanation: `① The answer is 21 times.\n\n② "1" in the ones place:\n1, 11, 21, 31, 41, 51, 61, 71, 81, 91 → 10 times\n\n③ "1" in the tens place:\n10, 11, 12, 13, 14, 15, 16, 17, 18, 19 → 10 times\n\n④ "1" in the hundreds place:\n100 → 1 time\nTotal: 10 + 10 + 1 = 21 times!`
    },
    {
      question: 'Write out all numbers from 1 to 50.\nHow many times does the digit "3" appear?',
      answer: '15 times',
      wrongs: ['5 times', '14 times', '10 times'],
      explanation: `① The answer is 15 times.\n\n② "3" in the ones place:\n3, 13, 23, 33, 43 → 5 times\n\n③ "3" in the tens place:\n30, 31, 32, 33, 34, 35, 36, 37, 38, 39 → 10 times\n\n④ Total: 5 + 10 = 15 times!\nNote: 33 has "3" in both places, so it's counted twice.`
    },
    {
      question: 'Write out all numbers from 1 to 100.\nHow many times does the digit "7" appear?',
      answer: '20 times',
      wrongs: ['10 times', '19 times', '21 times'],
      explanation: `① The answer is 20 times.\n\n② "7" in the ones place:\n7, 17, 27, 37, 47, 57, 67, 77, 87, 97 → 10 times\n\n③ "7" in the tens place:\n70, 71, 72, 73, 74, 75, 76, 77, 78, 79 → 10 times\n\n④ Total: 10 + 10 = 20 times!\nNote: 77 has "7" in both places, already counted twice.`
    },
    {
      question: 'Write out all numbers from 1 to 200.\nHow many times does the digit "1" appear?',
      answer: '140 times',
      wrongs: ['120 times', '100 times', '21 times'],
      explanation: `① The answer is 140 times.\n\n② "1" in the ones place:\n1, 11, 21…191 → 20 times\n\n③ "1" in the tens place:\n10-19, 110-119 → 20 times\n\n④ "1" in the hundreds place:\n100-199 → 100 times\nTotal: 20 + 20 + 100 = 140 times!`
    },
    {
      question: 'Write out all numbers from 1 to 99.\nHow many times does the digit "5" appear?',
      answer: '20 times',
      wrongs: ['10 times', '19 times', '15 times'],
      explanation: `① The answer is 20 times.\n\n② "5" in the ones place:\n5, 15, 25, 35, 45, 55, 65, 75, 85, 95 → 10 times\n\n③ "5" in the tens place:\n50, 51, 52, 53, 54, 55, 56, 57, 58, 59 → 10 times\n\n④ Total: 10 + 10 = 20 times!`
    },
    {
      question: 'Write out all numbers from 1 to 30.\nHow many times does the digit "2" appear?',
      answer: '13 times',
      wrongs: ['3 times', '10 times', '12 times'],
      explanation: `① The answer is 13 times.\n\n② "2" in the ones place:\n2, 12, 22 → 3 times\n\n③ "2" in the tens place:\n20, 21, 22, 23, 24, 25, 26, 27, 28, 29 → 10 times\n\n④ Total: 3 + 10 = 13 times!\nNote: 22 has "2" in both places, already counted twice.`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Digit Count',topPercent: 15
  }
}

// ジャンル11：無限等比級数
function generateInfiniteGeometric(): ExpertQuestion {
  const patterns = [
    {
      question: 'What does 0.999… (9 repeating forever) equal?',
      answer: '1',
      wrongs: ['0.999', '0.9999', 'less than 1'],
      explanation: `① The answer is 1.\n\n② It feels like it should be slightly less than 1,\nbut it actually equals exactly 1!\n\n③ Let x = 0.999…\n10x = 9.999…\n10x - x = 9.999… - 0.999…\n9x = 9\nx = 1\n\n④ 0.999… and 1 are exactly the same number!`
    },
    {
      question: '1/2 + 1/4 + 1/8 + 1/16 + …\nWhat does this infinite sum equal?',
      answer: '1',
      wrongs: ['1/2', '2', '∞'],
      explanation: `① The answer is 1.\n\n② Even adding forever, it never exceeds 1.\n\n③ Let S = 1/2 + 1/4 + 1/8 + …\n2S = 1 + 1/2 + 1/4 + …\n2S = 1 + S\nS = 1\n\n④ Adding half at a time,\nthe sum perfectly reaches 1!`
    },
    {
      question: '1/3 + 1/9 + 1/27 + …\nWhat does this infinite sum equal?',
      answer: '1/2',
      wrongs: ['1/3', '1', '2/3'],
      explanation: `① The answer is 1/2.\n\n② Let S = 1/3 + 1/9 + 1/27 + …\n3S = 1 + 1/3 + 1/9 + …\n3S = 1 + S\n2S = 1\nS = 1/2`
    },
    {
      question: '1/4 + 1/16 + 1/64 + …\nWhat does this infinite sum equal?',
      answer: '1/3',
      wrongs: ['1/4', '1/2', '2/3'],
      explanation: `① The answer is 1/3.\n\n② Let S = 1/4 + 1/16 + 1/64 + …\n4S = 1 + 1/4 + 1/16 + …\n4S = 1 + S\n3S = 1\nS = 1/3`
    },
    {
      question: 'What does 0.333… (3 repeating forever) equal?',
      answer: '1/3',
      wrongs: ['0.333', '1/4', '0.3'],
      explanation: `① The answer is 1/3.\n\n② Let x = 0.333…\n10x = 3.333…\n10x - x = 3.333… - 0.333…\n9x = 3\nx = 3/9 = 1/3`
    },
    {
      question: 'What does 0.111… (1 repeating forever) equal?',
      answer: '1/9',
      wrongs: ['0.111', '1/10', '1/8'],
      explanation: `① The answer is 1/9.\n\n② Let x = 0.111…\n10x = 1.111…\n10x - x = 1.111… - 0.111…\n9x = 1\nx = 1/9`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Infinite Geometric Series',topPercent: 5
  }
}

// ジャンル12：組み合わせの総数
function generateCombinationTotal(): ExpertQuestion {
  const settings = [
    { scene: 'A pizza place has 5 toppings available.', n: 5 },
    { scene: 'An ice cream shop has 4 flavors available.', n: 4 },
    { scene: 'A store has 6 colors of T-shirts.', n: 6 },
    { scene: 'A burger place has 4 toppings available.', n: 4 },
    { scene: 'A salad bar has 5 toppings available.', n: 5 },
    { scene: 'A ramen shop has 6 toppings available.', n: 6 },
  ]
  const setting = settings[randInt(0, settings.length - 1)]
  const answer = Math.pow(2, setting.n) - 1

  return {
    question: `${setting.scene}\nIf you must choose at least one, how many combinations are possible?`,
    choices: makeChoices(
      String(answer),
      [String(answer + 1), String(Math.pow(2, setting.n)), String(answer - 1)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer} combinations.\n\n② For each topping, there are 2 choices: pick it or skip it.\n\n③ With ${setting.n} options, that's 2 to the power of ${setting.n} = ${Math.pow(2, setting.n)} combinations.\nBut we subtract the 1 case where nothing is chosen:\n${Math.pow(2, setting.n)} - 1 = ${answer} combinations!`,
    genre: 'Combination Count',topPercent: 15
  }
}

// ジャンル13：リーグ戦の試合数
function generateLeague(): ExpertQuestion {
  const settings = ['soccer league', 'basketball league', 'baseball league', 'tennis league']
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(4, 12)
  const answer = (n * (n - 1)) / 2

  return {
    question: `${n} teams enter a ${setting}.\nIf every team plays each other once, how many matches in total?`,
    choices: makeChoices(
      String(answer),
      [String(n * (n - 1)), String(answer + n), String(answer - 1)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer} matches.\n\n② Each of the ${n} teams plays ${n - 1} others:\n${n} × ${n - 1} = ${n * (n - 1)}… but wait!\n\n③ This counts "Team A vs Team B" and "Team B vs Team A" as separate matches.\nSince each match is counted twice, we divide by 2.\n\n④ ${n * (n - 1)} ÷ 2 = ${answer} matches!`,
    genre: 'Round Robin Matches',topPercent: 15
  }
}

// ジャンル14：往復の速さ
function generateAverageSpeed(): ExpertQuestion {
  const patterns = [
    { go: 30, back: 60, avg: 40, dist: 60 },
    { go: 40, back: 60, avg: 48, dist: 120 },
    { go: 20, back: 30, avg: 24, dist: 60 },
    { go: 60, back: 90, avg: 72, dist: 180 },
    { go: 30, back: 45, avg: 36, dist: 90 },
    { go: 40, back: 120, avg: 60, dist: 120 },
    { go: 20, back: 60, avg: 30, dist: 60 },
    { go: 30, back: 90, avg: 45, dist: 90 },
    { go: 50, back: 75, avg: 60, dist: 150 },
    { go: 60, back: 120, avg: 80, dist: 120 },
  ]
  const vehicles = ['car', 'bicycle', 'motorcycle', 'train']
  const p = patterns[randInt(0, patterns.length - 1)]
  const vehicle = vehicles[randInt(0, vehicles.length - 1)]

  return {
    question: `A ${vehicle} makes a round trip.\nGoing: ${p.go} km/h, returning: ${p.back} km/h.\nWhat is the average speed?`,
    choices: makeChoices(
      `${p.avg} km/h`,
      [`${Math.round((p.go + p.back) / 2)} km/h`, `${p.avg + 4} km/h`, `${p.avg - 4} km/h`]
    ),
    answer: `${p.avg} km/h`,
    explanation: `① The answer is ${p.avg} km/h.\n\n② It's tempting to say "(${p.go}+${p.back})÷2=${Math.round((p.go + p.back) / 2)} km/h",\nbut you can't simply average the two speeds!\n\n③ Let's say the one-way distance is ${p.dist} km:\nTime going: ${p.dist}÷${p.go} = ${p.dist / p.go} hours\nTime returning: ${p.dist}÷${p.back} = ${p.dist / p.back} hours\n\n④ Average speed = Total distance ÷ Total time\n= ${p.dist * 2} ÷ ${p.dist / p.go + p.dist / p.back} = ${p.avg} km/h`,
    genre: 'Average Round Trip Speed',topPercent: 5
  }
}

// ジャンル15：乾杯回数から人数の逆算
function generateReverseHandshake(): ExpertQuestion {
  const counts = [6, 10, 15, 21, 28, 36, 45]
  const count = counts[randInt(0, counts.length - 1)]
  const n = Math.round((1 + Math.sqrt(1 + 8 * count)) / 2)
  const scenes = ['party', 'meeting', 'wedding', 'team gathering']
  const scene = scenes[randInt(0, scenes.length - 1)]

  return {
    question: `At a ${scene}, everyone toasted with each other exactly once.\nIf there were ${count} toasts in total, how many people were there?`,
    choices: makeChoices(
      String(n),
      [String(n - 1), String(n + 1), String(n + 2)]
    ),
    answer: String(n),
    explanation: `① The answer is ${n} people.\n\n② When n people each toast with everyone else once:\nn × (n-1) ÷ 2 = number of toasts\n\n③ Since there were ${count} toasts:\nn × (n-1) ÷ 2 = ${count}\nn × (n-1) = ${count * 2}\n\n④ ${n} × ${n - 1} = ${count * 2}, so\nn = ${n} people!`,
    genre: 'Reverse Handshake',topPercent: 5
  }
}


// ジャンル16：レンガの重さ
function generateBrickWeight(): ExpertQuestion {
  const nOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = n * 2

  return {
    question: `A brick weighs\n${n} kg plus half of its own weight.\nHow heavy is the brick?`,
    choices: makeChoices(
      `${answer} kg`,
      [`${answer + 1} kg`, `${answer - 1} kg`, `${answer + 2} kg`]
    ),
    answer: `${answer} kg`,
    explanation: `① The answer is ${answer} kg.\n\n② Let x = the weight of the brick:\nx = ${n} + x/2\n\n③ Subtract x/2 from both sides:\nx - x/2 = ${n}\nx/2 = ${n}\n\n④ Multiply both sides by 2:\nx = ${answer} kg!`,
    genre: 'Brick Weight',topPercent: 15
  }
}

// ジャンル17：数列の規則発見
function generateSequence(): ExpertQuestion {
  const patterns = [
    // 差が1ずつ増える
    {
      sequence: '1, 2, 4, 7, 11, 16, ?',
      answer: '22',
      wrongs: ['20', '21', '23'],
      explanation: `① The answer is 22.\n\n② Look at the differences:\n1→2: +1\n2→4: +2\n4→7: +3\n7→11: +4\n11→16: +5\n\n③ The gap increases by 1 each time, so:\n16→?: +6\n16 + 6 = 22!`
    },
    {
      sequence: '1, 3, 6, 10, 15, 21, ?',
      answer: '28',
      wrongs: ['25', '26', '27'],
      explanation: `① The answer is 28.\n\n② Look at the differences:\n1→3: +2\n3→6: +3\n6→10: +4\n10→15: +5\n15→21: +6\n\n③ The gap increases by 1 each time, so:\n21→?: +7\n21 + 7 = 28!`
    },
    {
      sequence: '2, 3, 5, 8, 12, 17, ?',
      answer: '23',
      wrongs: ['21', '22', '24'],
      explanation: `① The answer is 23.\n\n② Look at the differences:\n2→3: +1\n3→5: +2\n5→8: +3\n8→12: +4\n12→17: +5\n\n③ The gap increases by 1 each time, so:\n17→?: +6\n17 + 6 = 23!`
    },
    // 差が2ずつ増える
    {
      sequence: '1, 3, 7, 13, 21, 31, ?',
      answer: '43',
      wrongs: ['40', '41', '42'],
      explanation: `① The answer is 43.\n\n② Look at the differences:\n1→3: +2\n3→7: +4\n7→13: +6\n13→21: +8\n21→31: +10\n\n③ The gap increases by 2 each time, so:\n31→?: +12\n31 + 12 = 43!`
    },
    {
      sequence: '2, 4, 8, 14, 22, 32, ?',
      answer: '44',
      wrongs: ['41', '42', '43'],
      explanation: `① The answer is 44.\n\n② Look at the differences:\n2→4: +2\n4→8: +4\n8→14: +6\n14→22: +8\n22→32: +10\n\n③ The gap increases by 2 each time, so:\n32→?: +12\n32 + 12 = 44!`
    },
    // フィボナッチ系
    {
      sequence: '1, 1, 2, 3, 5, 8, ?',
      answer: '13',
      wrongs: ['11', '12', '14'],
      explanation: `① The answer is 13.\n\n② Each number is the sum of the previous two:\n1+1=2\n1+2=3\n2+3=5\n3+5=8\n\n③ 5+8=13!\nThis is called the Fibonacci sequence.`
    },
    {
      sequence: '1, 2, 3, 5, 8, 13, ?',
      answer: '21',
      wrongs: ['18', '19', '20'],
      explanation: `① The answer is 21.\n\n② Each number is the sum of the previous two:\n1+2=3\n2+3=5\n3+5=8\n5+8=13\n\n③ 8+13=21!\nThis is called the Fibonacci sequence.`
    },
    // 掛け算系
    {
      sequence: '2, 6, 18, 54, ?',
      answer: '162',
      wrongs: ['108', '144', '180'],
      explanation: `① The answer is 162.\n\n② Each number is multiplied by 3:\n2×3=6\n6×3=18\n18×3=54\n\n③ 54×3=162!`
    },
    {
      sequence: '3, 6, 12, 24, 48, ?',
      answer: '96',
      wrongs: ['72', '84', '108'],
      explanation: `① The answer is 96.\n\n② Each number is multiplied by 2:\n3×2=6\n6×2=12\n12×2=24\n24×2=48\n\n③ 48×2=96!`
    },
    {
      sequence: '5, 15, 45, 135, ?',
      answer: '405',
      wrongs: ['270', '350', '450'],
      explanation: `① The answer is 405.\n\n② Each number is multiplied by 3:\n5×3=15\n15×3=45\n45×3=135\n\n③ 135×3=405!`
    },
    // 2乗系
    {
      sequence: '1, 4, 9, 16, 25, ?',
      answer: '36',
      wrongs: ['30', '32', '34'],
      explanation: `① The answer is 36.\n\n② Each number is a perfect square:\n1²=1\n2²=4\n3²=9\n4²=16\n5²=25\n\n③ 6²=36!`
    },
    {
      sequence: '2, 5, 10, 17, 26, ?',
      answer: '37',
      wrongs: ['33', '35', '39'],
      explanation: `① The answer is 37.\n\n② Each number is n² + 1:\n1²+1=2\n2²+1=5\n3²+1=10\n4²+1=17\n5²+1=26\n\n③ 6²+1=37!`
    },
    {
      sequence: '0, 3, 8, 15, 24, ?',
      answer: '35',
      wrongs: ['30', '32', '33'],
      explanation: `① The answer is 35.\n\n② Each number is n² - 1:\n1²-1=0\n2²-1=3\n3²-1=8\n4²-1=15\n5²-1=24\n\n③ 6²-1=35!`
    },
    {
      sequence: '3, 6, 11, 18, 27, ?',
      answer: '38',
      wrongs: ['34', '36', '40'],
      explanation: `① The answer is 38.\n\n② Each number is n² + 2:\n1²+2=3\n2²+2=6\n3²+2=11\n4²+2=18\n5²+2=27\n\n③ 6²+2=38!`
    },
    {
      sequence: '-1, 2, 7, 14, 23, ?',
      answer: '34',
      wrongs: ['30', '32', '36'],
      explanation: `① The answer is 34.\n\n② Each number is n² - 2:\n1²-2=-1\n2²-2=2\n3²-2=7\n4²-2=14\n5²-2=23\n\n③ 6²-2=34!`
    },
    {
      sequence: '2, 6, 12, 20, 30, ?',
      answer: '42',
      wrongs: ['36', '38', '40'],
      explanation: `① The answer is 42.\n\n② Each number follows n² + n:\n1²+1=2\n2²+2=6\n3²+3=12\n4²+4=20\n5²+5=30\n\n③ 6²+6=42!`
    },
    // 交互パターン
    {
      sequence: '1, 4, 2, 8, 3, 12, ?',
      answer: '4',
      wrongs: ['5', '6', '16'],
      explanation: `① The answer is 4.\n\n② Split into odd and even positions:\nOdd positions: 1, 2, 3, ? → increases by 1\nEven positions: 4, 8, 12 → increases by 4\n\n③ The next odd position is 4!`
    },
    {
      sequence: '2, 6, 3, 9, 4, 12, ?',
      answer: '5',
      wrongs: ['6', '15', '16'],
      explanation: `① The answer is 5.\n\n② Split into odd and even positions:\nOdd positions: 2, 3, 4, ? → increases by 1\nEven positions: 6, 9, 12 → increases by 3\n\n③ The next odd position is 5!`
    },
    // 3乗系
    {
      sequence: '1, 8, 27, 64, 125, ?',
      answer: '216',
      wrongs: ['180', '196', '200'],
      explanation: `① The answer is 216.\n\n② Each number is a perfect cube:\n1³=1\n2³=8\n3³=27\n4³=64\n5³=125\n\n③ 6³=216!`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: `Find the pattern in the sequence.\n${p.sequence}`,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Sequence Patterns',topPercent: 15
  }
}

// ジャンル18：指数的拡散
function generateExponentialSpread(): ExpertQuestion {
  const patterns = [
    { people: 3, stages: 4, answer: 81 },
    { people: 3, stages: 5, answer: 243 },
    { people: 2, stages: 8, answer: 256 },
    { people: 2, stages: 10, answer: 1024 },
    { people: 4, stages: 4, answer: 256 },
    { people: 5, stages: 4, answer: 625 },
    { people: 3, stages: 6, answer: 729 },
    { people: 2, stages: 6, answer: 64 },
    { people: 4, stages: 3, answer: 64 },
    { people: 2, stages: 7, answer: 128 },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: `One person tells ${p.people} others a piece of news.\nEach of those ${p.people} people tells ${p.people} more, and so on.\nHow many people have heard the news by stage ${p.stages}?`,
    choices: makeChoices(
      `${p.answer} people`,
      [`${p.answer + 10} people`, `${p.answer - 10} people`, `${p.answer * p.people} people`]
    ),
    answer: `${p.answer} people`,
    explanation: `① The answer is ${p.answer} people.\n\n② The number multiplies by ${p.people} at every stage:\nStage 1: ${p.people} people\nStage 2: ${p.people * p.people} people\nStage 3: ${p.people ** 3} people\n\n③ At stage ${p.stages}, multiply ${p.people} by itself ${p.stages} times:\n${p.people}^${p.stages} = ${p.answer} people!`,
    genre: 'Exponential Spread',topPercent: 15
  }
}

// ジャンル19：倍増系②
function generateDoublingReverse(): ExpertQuestion {
  const fullDays = [20, 30, 40]
  const fractions = [
    { label: '1/2', daysBack: 1 },
    { label: '1/4', daysBack: 2 },
    { label: '1/8', daysBack: 3 },
  ]
  const fullDay = fullDays[randInt(0, fullDays.length - 1)]
  const fraction = fractions[randInt(0, fractions.length - 1)]
  const answer = fullDay - fraction.daysBack

  return {
    question: `Bacteria double in count every day.\nThe container is full on day ${fullDay}.\nOn which day was it ${fraction.label} full?`,
    choices: makeChoices(
      `Day ${answer}`,
      [`Day ${answer - 1}`, `Day ${answer + 1}`, `Day ${answer - 2}`]
    ),
    answer: `Day ${answer}`,
    explanation: `① The answer is Day ${answer}.\n\n② If the count doubles every day,\nthen the previous day always had half as much!\n\n③ If day ${fullDay} is full, then:\nDay ${fullDay - 1} → 1/2 full\nDay ${fullDay - 2} → 1/4 full\nDay ${fullDay - 3} → 1/8 full\n\n④ ${fraction.label} full = Day ${answer}!\nThe key is to think backwards!`,
    genre: 'Doubling Reverse',topPercent: 5
  }
}

// ジャンル20：72の法則
function generateRule72(): ExpertQuestion {
  const rates = [2, 3, 4, 6, 8, 9, 12, 18, 24, 36]
  const rate = rates[randInt(0, rates.length - 1)]
  const answer = 72 / rate

  return {
    question: `If you invest at ${rate}% annual compound interest,\napproximately how many years will it take to double your money?`,
    choices: makeChoices(
      `~${answer} years`,
      [`~${answer + 2} years`, `~${answer - 2} years`, `~${answer * 2} years`]
    ),
    answer: `~${answer} years`,
    explanation: `① The answer is ~${answer} years.\n\n② Use the "Rule of 72":\n72 ÷ interest rate (%) = years to double\n\n③ 72 ÷ ${rate} = ${answer} years!\n\n④ With compound interest, dividing 72 by the rate\ngives you a quick estimate of how long it takes to double!`,
    genre: 'Rule of 72',topPercent: 15
  }
}

// ジャンル21：ガウスの足し算②
function generateGauss2(): ExpertQuestion {
  const patterns = [
    { mult: 2, max: 100, n: 50, answer: 2550 },
    { mult: 3, max: 99, n: 33, answer: 1683 },
    { mult: 4, max: 100, n: 25, answer: 1300 },
    { mult: 5, max: 100, n: 20, answer: 1050 },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: `${p.mult} + ${p.mult * 2} + ${p.mult * 3} + … + ${p.max}\nAdd up all multiples of ${p.mult}. What is the total?`,
    choices: makeChoices(
      String(p.answer),
      [String(p.answer + 100), String(p.answer - 100), String(p.answer + 50)]
    ),
    answer: String(p.answer),
    explanation: `① The answer is ${p.answer}.\n\n② First, factor out ${p.mult}:\n${p.mult} × (1 + 2 + 3 + … + ${p.n})\n\n③ Use Gauss's formula for the sum inside:\n1 + 2 + 3 + … + ${p.n} = ${p.n} × ${p.n + 1} ÷ 2 = ${p.n * (p.n + 1) / 2}\n\n④ ${p.mult} × ${p.n * (p.n + 1) / 2} = ${p.answer}!`,
    genre: "Gauss's Sum II",topPercent: 5
  }
}

// ジャンル22：切る回数と個数の差
function generateCutting(): ExpertQuestion {
  const patterns: Array<{question: string, answer: string, wrongs: string[], explanation: string}> = []

  // パターン1：等間隔に切る
  const p1Options = [
    { length: 30, interval: 5 },
    { length: 40, interval: 8 },
    { length: 60, interval: 10 },
    { length: 48, interval: 6 },
    { length: 35, interval: 7 },
    { length: 54, interval: 9 },
    { length: 24, interval: 4 },
    { length: 45, interval: 5 },
  ]
  const p1 = p1Options[randInt(0, p1Options.length - 1)]
  const p1pieces = p1.length / p1.interval
  const p1answer = p1pieces - 1
  patterns.push({
    question: `A ${p1.length} cm rope is cut into ${p1.interval} cm pieces.\nHow many cuts are needed?`,
    answer: `${p1answer} cuts`,
    wrongs: [`${p1answer + 1} cuts`, `${p1pieces} cuts`, `${p1answer - 1} cuts`],
    explanation: `① The answer is ${p1answer} cuts.\n\n② ${p1.length} ÷ ${p1.interval} = ${p1pieces} pieces.\n\n③ To get ${p1pieces} pieces, you need:\n${p1pieces} - 1 = ${p1answer} cuts!\n\n④ It's tempting to say ${p1pieces} cuts, but\nthe last piece doesn't need a cut.\nNumber of pieces - 1 = number of cuts!`
  })

  // パターン2：丸太を等分
  const p2Options = [6, 8, 10, 12, 15, 20]
  const p2n = p2Options[randInt(0, p2Options.length - 1)]
  const p2answer = p2n - 1
  patterns.push({
    question: `How many cuts are needed to divide a log into ${p2n} equal pieces?`,
    answer: `${p2answer} cuts`,
    wrongs: [`${p2n} cuts`, `${p2answer - 1} cuts`, `${p2answer + 2} cuts`],
    explanation: `① The answer is ${p2answer} cuts.\n\n② To get ${p2n} pieces, you need:\n${p2n} - 1 = ${p2answer} cuts!\n\n③ It's tempting to say ${p2n} cuts, but\nthe last piece doesn't need a cut.\nNumber of pieces - 1 = number of cuts!`
  })

  // パターン3：時間がかかる
  const p3Options = [
    { time: 3, pieces: 6 },
    { time: 4, pieces: 5 },
    { time: 5, pieces: 7 },
    { time: 2, pieces: 8 },
    { time: 6, pieces: 5 },
    { time: 3, pieces: 9 },
    { time: 4, pieces: 7 },
    { time: 5, pieces: 6 },
  ]
  const p3 = p3Options[randInt(0, p3Options.length - 1)]
  const p3cuts = p3.pieces - 1
  const p3answer = p3cuts * p3.time
  patterns.push({
    question: `Each cut takes ${p3.time} minutes.\nHow many minutes does it take to cut a log into ${p3.pieces} pieces?`,
    answer: `${p3answer} minutes`,
    wrongs: [`${p3.pieces * p3.time} minutes`, `${p3answer + p3.time} minutes`, `${p3answer - p3.time} minutes`],
    explanation: `① The answer is ${p3answer} minutes.\n\n② To get ${p3.pieces} pieces, you need:\n${p3.pieces} - 1 = ${p3cuts} cuts.\n\n③ Each cut takes ${p3.time} minutes, so:\n${p3cuts} × ${p3.time} = ${p3answer} minutes!\n\n④ It's tempting to say ${p3.pieces}×${p3.time}=${p3.pieces * p3.time} minutes,\nbut the last piece needs no cut.\n${p3cuts} cuts is all it takes!`
  })

  // パターン4：両端から同時
  const p4Options = [9, 11, 13, 15, 17, 19]
  const p4n = p4Options[randInt(0, p4Options.length - 1)]
  const p4cuts = p4n - 1
  const p4answer = p4cuts / 2
  patterns.push({
    question: `A machine can cut both ends simultaneously.\nHow many cuts are needed to divide a log into ${p4n} equal pieces?`,
    answer: `${p4answer} cuts`,
    wrongs: [`${p4cuts} cuts`, `${p4answer + 1} cuts`, `${p4answer + 2} cuts`],
    explanation: `① The answer is ${p4answer} cuts.\n\n② Normally, you would need:\n${p4n} - 1 = ${p4cuts} cuts.\n\n③ Since both ends are cut at once:\n${p4cuts} ÷ 2 = ${p4answer} cuts!\n\n④ Easy if you know the trick —\nbut without it, ${p4cuts} cuts feels like the obvious answer!`
  })

  // パターン5：折ってから切る
  const p5Options = [2, 3, 4, 5]
  const p5cuts = p5Options[randInt(0, p5Options.length - 1)]
  const p5answer = (p5cuts + 1) * 2
  patterns.push({
    question: `A rope is folded in half, then cut ${p5cuts} time${p5cuts > 1 ? 's' : ''}.\nHow many pieces do you end up with?`,
    answer: `${p5answer} pieces`,
    wrongs: [`${p5cuts + 1} pieces`, `${p5answer - 2} pieces`, `${p5answer + 2} pieces`],
    explanation: `① The answer is ${p5answer} pieces.\n\n② Folding in half creates 2 layers.\n\n③ Cutting ${p5cuts} time${p5cuts > 1 ? 's' : ''} through 2 layers gives:\n${p5cuts} + 1 = ${p5cuts + 1} sections per layer.\n\n④ Unfold and you get:\n${p5cuts + 1} × 2 = ${p5answer} pieces!`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Cuts and Pieces',topPercent: 15
  }
}

// ジャンル23：トーナメント試合数の差
function generateTournamentDiff(): ExpertQuestion {
  const patterns: Array<{question: string, answer: string, wrongs: string[], explanation: string}> = []

  // 角度①：試合数の差
  const p1Options = [
    { a: 10, b: 20 }, { a: 15, b: 30 }, { a: 20, b: 40 },
    { a: 25, b: 50 }, { a: 12, b: 24 }, { a: 16, b: 32 },
    { a: 18, b: 36 }, { a: 20, b: 30 }, { a: 15, b: 25 },
    { a: 10, b: 30 },
  ]
  const p1 = p1Options[randInt(0, p1Options.length - 1)]
  const p1diff = p1.b - p1.a
  patterns.push({
    question: `How many more matches does a ${p1.b}-player tournament have\nthan a ${p1.a}-player tournament?`,
    answer: `${p1diff} matches`,
    wrongs: [`${p1diff + 1} matches`, `${p1diff - 1} matches`, `${p1diff * 2} matches`],
    explanation: `① The answer is ${p1diff} matches.\n\n② Matches in a tournament = players - 1.\n\n③ ${p1.a} players: ${p1.a} - 1 = ${p1.a - 1} matches\n${p1.b} players: ${p1.b} - 1 = ${p1.b - 1} matches\n\n④ ${p1.b - 1} - ${p1.a - 1} = ${p1diff} matches difference!\nThe difference is simply ${p1.b} - ${p1.a} = ${p1diff}!`
  })

  // 角度②：3つの合計
  const p2Options = [
    { a: 10, b: 20, c: 30 }, { a: 15, b: 20, c: 25 },
    { a: 12, b: 16, c: 20 }, { a: 10, b: 15, c: 25 },
    { a: 16, b: 20, c: 24 }, { a: 10, b: 20, c: 25 },
    { a: 12, b: 18, c: 24 }, { a: 15, b: 25, c: 30 },
  ]
  const p2 = p2Options[randInt(0, p2Options.length - 1)]
  const p2answer = (p2.a - 1) + (p2.b - 1) + (p2.c - 1)
  patterns.push({
    question: `Three tournaments have ${p2.a}, ${p2.b}, and ${p2.c} players each.\nWhat is the total number of matches across all three?`,
    answer: `${p2answer} matches`,
    wrongs: [`${p2answer + 3} matches`, `${p2answer - 3} matches`, `${p2.a + p2.b + p2.c - 1} matches`],
    explanation: `① The answer is ${p2answer} matches.\n\n② Matches in a tournament = players - 1.\n\n③ ${p2.a} players: ${p2.a} - 1 = ${p2.a - 1} matches\n${p2.b} players: ${p2.b} - 1 = ${p2.b - 1} matches\n${p2.c} players: ${p2.c} - 1 = ${p2.c - 1} matches\n\n④ ${p2.a - 1} + ${p2.b - 1} + ${p2.c - 1} = ${p2answer} matches!`
  })

  // 角度③：逆算系
  const p3matches = randInt(10, 99)
  const p3answer = p3matches + 1
  patterns.push({
    question: `A tournament had ${p3matches} matches in total.\nHow many players participated?`,
    answer: `${p3answer} players`,
    wrongs: [`${p3answer - 1} players`, `${p3answer + 1} players`, `${p3answer * 2} players`],
    explanation: `① The answer is ${p3answer} players.\n\n② Matches in a tournament = players - 1.\n\n③ So: players = matches + 1\n${p3matches} + 1 = ${p3answer} players!\n\n④ Once you know the rule, this is instant!`
  })

  // 角度④：チーム戦
  const p4teams = randInt(4, 16)
  const p4members = randInt(3, 8)
  const p4answer = (p4teams - 1) * p4members
  patterns.push({
    question: `A team tournament has ${p4teams} teams of ${p4members} players each.\nEvery losing team retires immediately.\nHow many players retire in total?`,
    answer: `${p4answer} players`,
    wrongs: [`${p4answer + p4members} players`, `${p4answer - p4members} players`, `${p4teams * p4members} players`],
    explanation: `① The answer is ${p4answer} players.\n\n② Number of matches in the tournament:\n${p4teams} - 1 = ${p4teams - 1} matches\n\n③ Each match eliminates one team of ${p4members} players:\n${p4teams - 1} × ${p4members} = ${p4answer} players retire!`
  })

  // 角度⑤：男女別
  const p5men = randInt(10, 30)
  const p5women = randInt(10, 30)
  const p5answer = (p5men - 1) + (p5women - 1)
  patterns.push({
    question: `${p5men} men and ${p5women} women each hold their own separate tournament.\nHow many matches are there in total?`,
    answer: `${p5answer} matches`,
    wrongs: [`${p5answer + 2} matches`, `${p5answer - 2} matches`, `${p5men + p5women - 1} matches`],
    explanation: `① The answer is ${p5answer} matches.\n\n② Men's tournament:\n${p5men} - 1 = ${p5men - 1} matches\n\n③ Women's tournament:\n${p5women} - 1 = ${p5women - 1} matches\n\n④ ${p5men - 1} + ${p5women - 1} = ${p5answer} matches!`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Tournament Variations',topPercent: 15
  }
}

// ジャンル24：倍数でない数の個数
function generateNonMultiple(): ExpertQuestion {
  const patterns = [
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 3 nor multiples of 5?',
      answer: '53',
      wrongs: ['47', '50', '60'],
      explanation: `① The answer is 53.\n\n② From 1 to 100:\nMultiples of 3: 100÷3 = 33\nMultiples of 5: 100÷5 = 20\nMultiples of 15: 100÷15 = 6\n\n③ Multiples of 3 or 5:\n33 + 20 - 6 = 47\n\n④ Neither:\n100 - 47 = 53!`
    },
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 2 nor multiples of 3?',
      answer: '33',
      wrongs: ['34', '50', '17'],
      explanation: `① The answer is 33.\n\n② From 1 to 100:\nMultiples of 2: 100÷2 = 50\nMultiples of 3: 100÷3 = 33\nMultiples of 6: 100÷6 = 16\n\n③ Multiples of 2 or 3:\n50 + 33 - 16 = 67\n\n④ Neither:\n100 - 67 = 33!`
    },
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 2 nor multiples of 5?',
      answer: '40',
      wrongs: ['50', '30', '60'],
      explanation: `① The answer is 40.\n\n② From 1 to 100:\nMultiples of 2: 100÷2 = 50\nMultiples of 5: 100÷5 = 20\nMultiples of 10: 100÷10 = 10\n\n③ Multiples of 2 or 5:\n50 + 20 - 10 = 60\n\n④ Neither:\n100 - 60 = 40!`
    },
    {
      question: 'Among the integers from 1 to 50,\nhow many are neither multiples of 3 nor multiples of 5?',
      answer: '27',
      wrongs: ['23', '25', '30'],
      explanation: `① The answer is 27.\n\n② From 1 to 50:\nMultiples of 3: 50÷3 = 16\nMultiples of 5: 50÷5 = 10\nMultiples of 15: 50÷15 = 3\n\n③ Multiples of 3 or 5:\n16 + 10 - 3 = 23\n\n④ Neither:\n50 - 23 = 27!`
    },
    {
      question: 'Among the integers from 1 to 50,\nhow many are neither multiples of 2 nor multiples of 3?',
      answer: '17',
      wrongs: ['16', '25', '33'],
      explanation: `① The answer is 17.\n\n② From 1 to 50:\nMultiples of 2: 50÷2 = 25\nMultiples of 3: 50÷3 = 16\nMultiples of 6: 50÷6 = 8\n\n③ Multiples of 2 or 3:\n25 + 16 - 8 = 33\n\n④ Neither:\n50 - 33 = 17!`
    },
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 3 nor multiples of 7?',
      answer: '57',
      wrongs: ['43', '50', '55'],
      explanation: `① The answer is 57.\n\n② From 1 to 100:\nMultiples of 3: 100÷3 = 33\nMultiples of 7: 100÷7 = 14\nMultiples of 21: 100÷21 = 4\n\n③ Multiples of 3 or 7:\n33 + 14 - 4 = 43\n\n④ Neither:\n100 - 43 = 57!`
    },
    {
      question: 'Among the integers from 1 to 200,\nhow many are neither multiples of 2 nor multiples of 5?',
      answer: '80',
      wrongs: ['100', '60', '120'],
      explanation: `① The answer is 80.\n\n② From 1 to 200:\nMultiples of 2: 200÷2 = 100\nMultiples of 5: 200÷5 = 40\nMultiples of 10: 200÷10 = 20\n\n③ Multiples of 2 or 5:\n100 + 40 - 20 = 120\n\n④ Neither:\n200 - 120 = 80!`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Non-Multiples Count',topPercent: 5
  }
}

// ジャンル25：一の位が5の2乗
function generateSquareEndingIn5(): ExpertQuestion {
  const nOptions = [15, 25, 35, 45, 55, 65, 75, 85, 95]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const tens = Math.floor(n / 10)
  const answer = tens * (tens + 1) * 100 + 25

  return {
    question: `What is ${n}²?`,
    choices: makeChoices(
      String(answer),
      [String(answer + 100), String(answer - 100), String(answer + 200)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② There's a trick for squaring numbers that end in 5!\n\n③ For ${n}²:\nTake the tens digit "${tens}" and multiply:\n${tens} × (${tens}+1) = ${tens} × ${tens + 1} = ${tens * (tens + 1)}\n\n④ Attach "25" at the end:\n${answer}!`,
    genre: 'Squaring Numbers Ending in 5',topPercent: 30
  }
}

// ジャンル26：100に近い数の掛け算
function generateNear100Multiply(): ExpertQuestion {
  const pairs = [
    { a: 97, b: 96 }, { a: 98, b: 97 }, { a: 99, b: 97 },
    { a: 96, b: 95 }, { a: 98, b: 96 }, { a: 99, b: 96 },
    { a: 97, b: 95 }, { a: 98, b: 95 }, { a: 99, b: 98 },
    { a: 96, b: 94 }, { a: 97, b: 94 }, { a: 98, b: 94 },
    { a: 99, b: 94 }, { a: 96, b: 93 }, { a: 97, b: 93 },
  ]
  const p = pairs[randInt(0, pairs.length - 1)]
  const da = 100 - p.a
  const db = 100 - p.b
  const answer = 10000 - da * 100 - db * 100 + da * db

  return {
    question: `${p.a} × ${p.b} = ?`,
    choices: makeChoices(
      String(answer),
      [String(answer + 100), String(answer - 100), String(answer + da * db)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② Use each number's distance from 100:\n${p.a} = 100 - ${da}\n${p.b} = 100 - ${db}\n\n③ ${p.a} × ${p.b}\n= (100-${da})(100-${db})\n= 10000 - ${da * 100} - ${db * 100} + ${da * db}\n= ${answer}!`,
    genre: 'Multiplying Near 100',topPercent: 15
  }
}

// ジャンル27：×25の変換
function generateTimes25(): ExpertQuestion {
  const multiples = [12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68]
  const n = multiples[randInt(0, multiples.length - 1)]
  const answer = n * 25

  return {
    question: `${n} × 25 = ?`,
    choices: makeChoices(
      String(answer),
      [String(answer + 25), String(answer - 25), String(answer + 100)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② Use the fact that 25 = 100 ÷ 4.\n\n③ ${n} × 25\n= ${n} × 100 ÷ 4\n= ${n * 100} ÷ 4\n= ${answer}!`,
    genre: 'Multiplying by 25',topPercent: 30
  }
}

// ジャンル28：100付近の2乗
function generateNear100Square(): ExpertQuestion {
  const nOptions = [91, 92, 93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 108, 109]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const diff = n - 100
  const answer = 10000 + 2 * diff * 100 + diff * diff

  return {
    question: `What is ${n}²?`,
    choices: makeChoices(
      String(answer),
      [String(answer + 100), String(answer - 100), String(answer + 200)]
    ),
    answer: String(answer),
    explanation: `① The answer is ${answer}.\n\n② Use the number's distance from 100:\n${n} = 100 ${diff >= 0 ? '+' : '-'} ${Math.abs(diff)}\n\n③ ${n}²\n= (100${diff >= 0 ? '+' : '-'}${Math.abs(diff)})²\n= 10000 ${diff >= 0 ? '+' : '-'} ${Math.abs(2 * diff * 100)} + ${diff * diff}\n= ${answer}!`,
    genre: 'Squaring Near 100',topPercent: 15
  }
}

// ジャンル29：対称な掛け算
function generateSymmetricMultiply(): ExpertQuestion {
  const patterns = [
    // 差が1のパターン
    { a: 19, b: 21, center: 20, diff: 1, answer: 399 },
    { a: 29, b: 31, center: 30, diff: 1, answer: 899 },
    { a: 39, b: 41, center: 40, diff: 1, answer: 1599 },
    { a: 49, b: 51, center: 50, diff: 1, answer: 2499 },
    { a: 59, b: 61, center: 60, diff: 1, answer: 3599 },
    { a: 69, b: 71, center: 70, diff: 1, answer: 4899 },
    { a: 79, b: 81, center: 80, diff: 1, answer: 6399 },
    { a: 89, b: 91, center: 90, diff: 1, answer: 8099 },
    // 差が2のパターン
    { a: 18, b: 22, center: 20, diff: 2, answer: 396 },
    { a: 28, b: 32, center: 30, diff: 2, answer: 896 },
    { a: 38, b: 42, center: 40, diff: 2, answer: 1596 },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: `${p.a} × ${p.b} = ?`,
    choices: makeChoices(
      String(p.answer),
      [String(p.answer + 100), String(p.answer - 100), String(p.center * p.center)]
    ),
    answer: String(p.answer),
    explanation: `① The answer is ${p.answer}.\n\n② ${p.a} and ${p.b} are symmetric around ${p.center}:\n${p.a} = ${p.center} - ${p.diff}\n${p.b} = ${p.center} + ${p.diff}\n\n③ (${p.center}-${p.diff})(${p.center}+${p.diff}) = ${p.center}² - ${p.diff}²\n= ${p.center * p.center} - ${p.diff * p.diff} = ${p.answer}!\n\n④ This uses the difference of squares formula:\n(a-b)(a+b) = a² - b²`,
    genre: 'Symmetric Multiplication',topPercent: 15
  }
}

// ジャンル30：壁登りの到達日
function generateSnailClimb(): ExpertQuestion {
  const patterns: Array<{question: string, answer: string, wrongs: string[], explanation: string}> = []

  // 角度①：通常パターン
  const p1Options = [
    { wall: 10, up: 3, down: 2, day: 8 },
    { wall: 15, up: 4, down: 3, day: 12 },
    { wall: 20, up: 5, down: 4, day: 16 },
    { wall: 12, up: 3, down: 2, day: 10 },
    { wall: 18, up: 4, down: 3, day: 15 },
    { wall: 8, up: 3, down: 2, day: 6 },
    { wall: 14, up: 4, down: 3, day: 11 },
    { wall: 16, up: 5, down: 4, day: 12 },
  ]
  const p1 = p1Options[randInt(0, p1Options.length - 1)]
  patterns.push({
    question: `A snail is climbing a ${p1.wall} m wall.\nIt climbs ${p1.up} m during the day and slides ${p1.down} m at night.\nOn which day does it reach the top?`,
    answer: `Day ${p1.day}`,
    wrongs: [`Day ${p1.day - 1}`, `Day ${p1.day + 1}`, `Day ${p1.wall - p1.up}`],
    explanation: `① The answer is Day ${p1.day}.\n\n② The snail makes a net gain of ${p1.up - p1.down} m per day.\n\n③ But on the final day, it doesn't slide back!\nEnd of Day ${p1.day - 1}: ${(p1.day - 1) * (p1.up - p1.down)} m\nDay ${p1.day} daytime: ${(p1.day - 1) * (p1.up - p1.down)} + ${p1.up} = ${(p1.day - 1) * (p1.up - p1.down) + p1.up} m → Reached!\n\n④ It's tempting to say Day ${p1.wall},\nbut the snail doesn't slide on the final day!`
  })

  // 角度②：逆算パターン
  const p2Options = [
    { day: 8, up: 3, down: 2, wall: 10 },
    { day: 12, up: 4, down: 3, wall: 15 },
    { day: 6, up: 3, down: 2, wall: 8 },
    { day: 10, up: 3, down: 2, wall: 12 },
    { day: 11, up: 4, down: 3, wall: 14 },
  ]
  const p2 = p2Options[randInt(0, p2Options.length - 1)]
  patterns.push({
    question: `A snail climbs ${p2.up} m during the day and slides ${p2.down} m at night.\nIt reached the top on Day ${p2.day}.\nHow tall is the wall?`,
    answer: `${p2.wall} m`,
    wrongs: [`${p2.wall + 1} m`, `${p2.wall - 1} m`, `${p2.wall + p2.up} m`],
    explanation: `① The answer is ${p2.wall} m.\n\n② Think about where the snail was at the end of the previous day.\nAfter ${p2.day - 1} nights: ${p2.up - p2.down} m × ${p2.day - 2} days = ${(p2.day - 2) * (p2.up - p2.down)} m\n\n③ On the final day it climbs ${p2.up} m to reach the top:\nWall height = ${(p2.day - 2) * (p2.up - p2.down)} + ${p2.up} = ${p2.wall} m!`
  })

  // 角度③：合計時間パターン
  const p3Options = [
    { wall: 10, up: 3, down: 2, time: 2, day: 8, total: 16 },
    { wall: 15, up: 4, down: 3, time: 2, day: 12, total: 24 },
    { wall: 8, up: 3, down: 2, time: 3, day: 6, total: 18 },
    { wall: 12, up: 3, down: 2, time: 2, day: 10, total: 20 },
    { wall: 14, up: 4, down: 3, time: 3, day: 11, total: 33 },
  ]
  const p3 = p3Options[randInt(0, p3Options.length - 1)]
  patterns.push({
    question: `A snail is climbing a ${p3.wall} m wall.\nIt takes ${p3.time} hours to climb ${p3.up} m during the day,\nthen slides ${p3.down} m at night.\nHow many total hours does it spend climbing?`,
    answer: `${p3.total} hours`,
    wrongs: [`${p3.total + p3.time} hours`, `${p3.total - p3.time} hours`, `${p3.wall * p3.time} hours`],
    explanation: `① The answer is ${p3.total} hours.\n\n② The snail reaches the top on Day ${p3.day}.\n\n③ It climbs ${p3.time} hours each day, so:\n${p3.day} × ${p3.time} = ${p3.total} hours!\n\n④ The snail still climbs on the final day,\nso all ${p3.day} days of climbing count.`
  })

  // 角度④：2匹パターン
  const p4Options = [
    { wall: 15, up1: 3, down1: 2, day1: 13, up2: 4, down2: 3, day2: 12, winner: 'Snail 2' },
    { wall: 20, up1: 3, down1: 2, day1: 18, up2: 5, down2: 4, day2: 16, winner: 'Snail 2' },
    { wall: 12, up1: 3, down1: 2, day1: 10, up2: 4, down2: 3, day2: 9, winner: 'Snail 2' },
  ]
  const p4 = p4Options[randInt(0, p4Options.length - 1)]
  patterns.push({
    question: `Two snails are climbing a ${p4.wall} m wall.\nSnail 1: climbs ${p4.up1} m by day, slides ${p4.down1} m at night\nSnail 2: climbs ${p4.up2} m by day, slides ${p4.down2} m at night\nWhich snail reaches the top first?`,
    answer: p4.winner,
    wrongs: ['Snail 1', 'They tie', 'Cannot be determined'],
    explanation: `① The answer is ${p4.winner}.\n\n② Snail 1's arrival day:\nNet ${p4.up1 - p4.down1} m/day → end of Day ${p4.day1 - 1}: ${(p4.day1 - 1) * (p4.up1 - p4.down1)} m\nDay ${p4.day1}: ${(p4.day1 - 1) * (p4.up1 - p4.down1)} + ${p4.up1} = ${(p4.day1 - 1) * (p4.up1 - p4.down1) + p4.up1} m → Day ${p4.day1}\n\n③ Snail 2's arrival day:\nNet ${p4.up2 - p4.down2} m/day → end of Day ${p4.day2 - 1}: ${(p4.day2 - 1) * (p4.up2 - p4.down2)} m\nDay ${p4.day2}: ${(p4.day2 - 1) * (p4.up2 - p4.down2)} + ${p4.up2} = ${(p4.day2 - 1) * (p4.up2 - p4.down2) + p4.up2} m → Day ${p4.day2}\n\n④ Day ${p4.day1} vs Day ${p4.day2} → ${p4.winner} wins!`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Snail Climb',topPercent: 5
  }
}

// ジャンル31：リサイクル交換の最大数
function generateRecycle(): ExpertQuestion {
  const patterns = [
    {
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 9 bottles, what is the maximum you can drink?',
      answer: '13 bottles',
      wrongs: ['12 bottles', '14 bottles', '11 bottles'],
      explanation: `① The answer is 13 bottles.\n\n② Drink the first 9 → 9 empty bottles\n9 ÷ 3 = exchange for 3 more → 3 empty bottles\n3 ÷ 3 = exchange for 1 more → 1 empty bottle\n\n③ Total: 9 + 3 + 1 = 13 bottles!`
    },
    {
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 12 bottles, what is the maximum you can drink?',
      answer: '17 bottles',
      wrongs: ['16 bottles', '18 bottles', '15 bottles'],
      explanation: `① The answer is 17 bottles.\n\n② Drink the first 12 → 12 empty bottles\n12 ÷ 3 = exchange for 4 more → 4 empty bottles\n4 ÷ 3 = exchange for 1 more → 1 empty bottle\n\n③ Total: 12 + 4 + 1 = 17 bottles!`
    },
    {
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 15 bottles, what is the maximum you can drink?',
      answer: '21 bottles',
      wrongs: ['20 bottles', '22 bottles', '18 bottles'],
      explanation: `① The answer is 21 bottles.\n\n② Drink the first 15 → 15 empty bottles\n15 ÷ 3 = exchange for 5 more → 5 empty bottles\n5 ÷ 3 = exchange for 1 more → 2 empty bottles left\n\n③ Total: 15 + 5 + 1 = 21 bottles!`
    },
    {
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 18 bottles, what is the maximum you can drink?',
      answer: '26 bottles',
      wrongs: ['25 bottles', '27 bottles', '24 bottles'],
      explanation: `① The answer is 26 bottles.\n\n② Drink the first 18 → 18 empty bottles\n18 ÷ 3 = exchange for 6 more → 6 empty bottles\n6 ÷ 3 = exchange for 2 more → 2 empty bottles left\n\n③ Total: 18 + 6 + 2 = 26 bottles!`
    },
    {
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 27 bottles, what is the maximum you can drink?',
      answer: '40 bottles',
      wrongs: ['39 bottles', '41 bottles', '36 bottles'],
      explanation: `① The answer is 40 bottles.\n\n② Drink the first 27 → 27 empty bottles\n27 ÷ 3 = exchange for 9 more → 9 empty bottles\n9 ÷ 3 = exchange for 3 more → 3 empty bottles\n3 ÷ 3 = exchange for 1 more → 1 empty bottle\n\n③ Total: 27 + 9 + 3 + 1 = 40 bottles!`
    },
    {
      question: 'Every 4 empty bottles can be exchanged for 1 full bottle.\nIf you start with 16 bottles, what is the maximum you can drink?',
      answer: '21 bottles',
      wrongs: ['20 bottles', '22 bottles', '18 bottles'],
      explanation: `① The answer is 21 bottles.\n\n② Drink the first 16 → 16 empty bottles\n16 ÷ 4 = exchange for 4 more → 4 empty bottles\n4 ÷ 4 = exchange for 1 more → 1 empty bottle\n\n③ Total: 16 + 4 + 1 = 21 bottles!`
    },
    {
      question: 'Every 4 empty bottles can be exchanged for 1 full bottle.\nIf you start with 20 bottles, what is the maximum you can drink?',
      answer: '26 bottles',
      wrongs: ['25 bottles', '27 bottles', '24 bottles'],
      explanation: `① The answer is 26 bottles.\n\n② Drink the first 20 → 20 empty bottles\n20 ÷ 4 = exchange for 5 more → 5 empty bottles\n5 ÷ 4 = exchange for 1 more → 1 empty bottle\n\n③ Total: 20 + 5 + 1 = 26 bottles!`
    },
    {
      question: 'Every 4 empty bottles can be exchanged for 1 full bottle.\nIf you start with 24 bottles, what is the maximum you can drink?',
      answer: '31 bottles',
      wrongs: ['30 bottles', '32 bottles', '28 bottles'],
      explanation: `① The answer is 31 bottles.\n\n② Drink the first 24 → 24 empty bottles\n24 ÷ 4 = exchange for 6 more → 6 empty bottles\n6 ÷ 4 = exchange for 1 more → 2 empty bottles left\n\n③ Total: 24 + 6 + 1 = 31 bottles!`
    },
    {
      question: 'Every 5 empty bottles can be exchanged for 1 full bottle.\nIf you start with 25 bottles, what is the maximum you can drink?',
      answer: '31 bottles',
      wrongs: ['30 bottles', '32 bottles', '28 bottles'],
      explanation: `① The answer is 31 bottles.\n\n② Drink the first 25 → 25 empty bottles\n25 ÷ 5 = exchange for 5 more → 5 empty bottles\n5 ÷ 5 = exchange for 1 more → 1 empty bottle\n\n③ Total: 25 + 5 + 1 = 31 bottles!`
    },
    {
      question: 'Every 5 empty bottles can be exchanged for 1 full bottle.\nIf you start with 20 bottles, what is the maximum you can drink?',
      answer: '24 bottles',
      wrongs: ['23 bottles', '25 bottles', '20 bottles'],
      explanation: `① The answer is 24 bottles.\n\n② Drink the first 20 → 20 empty bottles\n20 ÷ 5 = exchange for 4 more → 4 empty bottles\n4 bottles can't be exchanged, so we stop.\n\n③ Total: 20 + 4 = 24 bottles!`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Bottle Recycling',topPercent: 15
  }
}

// ジャンル32：じゃんけんの確率
function generateRockPaperScissors(): ExpertQuestion {
  const patterns = [
    {
      question: 'Three people play rock-paper-scissors.\nWhat is the probability that one person wins outright?',
      answer: '1/3',
      wrongs: ['2/3', '1/9', '2/9'],
      explanation: `① The answer is 1/3.\n\n② Total combinations of throws:\n3³ = 27\n\n③ Combinations where one person wins outright:\n3 throw types × 3 possible winners = 9\n\n④ 9 ÷ 27 = 1/3!`
    },
    {
      question: 'Two people play rock-paper-scissors.\nWhat is the probability that one person wins outright?',
      answer: '2/3',
      wrongs: ['1/3', '1/2', '2/9'],
      explanation: `① The answer is 2/3.\n\n② Total combinations of throws:\n3² = 9\n\n③ Combinations where one person wins:\nRock vs Scissors, Scissors vs Paper, Paper vs Rock\n2 outcomes each → 3 × 2 = 6\n\n④ 6 ÷ 9 = 2/3!`
    },
    {
      question: 'Three people play rock-paper-scissors.\nWhat is the probability of a draw?',
      answer: '2/3',
      wrongs: ['1/3', '1/9', '1/2'],
      explanation: `① The answer is 2/3.\n\n② Total combinations of throws:\n3³ = 27\n\n③ Combinations where one person wins outright:\n3 throw types × 3 possible winners = 9\n\n④ Draw = no outright winner:\n1 - 9/27 = 1 - 1/3 = 2/3!`
    },
    {
      question: 'Two people play rock-paper-scissors.\nWhat is the probability of a draw?',
      answer: '1/3',
      wrongs: ['2/3', '1/2', '1/9'],
      explanation: `① The answer is 1/3.\n\n② Total combinations of throws:\n3² = 9\n\n③ Combinations where one person wins:\nRock vs Scissors, Scissors vs Paper, Paper vs Rock\n2 outcomes each → 3 × 2 = 6\n\n④ Draw = no outright winner:\n1 - 6/9 = 1 - 2/3 = 1/3!`
    },
    {
      question: 'Three people play rock-paper-scissors.\nWhat is the probability that all three throw the same sign?',
      answer: '1/9',
      wrongs: ['1/3', '1/27', '2/9'],
      explanation: `① The answer is 1/9.\n\n② Total combinations of throws:\n3³ = 27\n\n③ All three the same:\nRock, Scissors, or Paper → 3 combinations\n\n④ 3 ÷ 27 = 1/9!`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Rock-Paper-Scissors Probability',topPercent: 15
  }
}

const generators = [
  generateGauss,
  generateTournament,
  generateHandshake,
  generateDoubling,
  generateTimes11,
  generateComplementProbability,
  generateExponentSplit,
  generateOddSum,
  generateAdjacentPermutation,
  generateDigitCount,
  generateInfiniteGeometric,
  generateCombinationTotal,
  generateLeague,
  generateAverageSpeed,
  generateReverseHandshake,
  generateBrickWeight,
  generateSequence,
  generateExponentialSpread,
  generateDoublingReverse,
  generateRule72,
  generateGauss2,
  generateCutting,
  generateTournamentDiff,
  generateNonMultiple,
  generateSquareEndingIn5,
  generateNear100Multiply,
  generateTimes25,
  generateNear100Square,
  generateSymmetricMultiply,
  generateSnailClimb,
  generateRecycle,
  generateRockPaperScissors,
]

export function generateExpertQuestion(): ExpertQuestion {
  const generator = generators[randInt(0, generators.length - 1)]
  return generator()
}