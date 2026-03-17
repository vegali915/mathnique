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

// Fisher-Yates shuffle（公平なシャッフル）
function shuffle<T>(arr: T[]): T[] {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function makeChoices(answer: string, wrongs: string[]): string[] {
  const selectedWrongs = shuffle(wrongs).slice(0, 3)
  return shuffle([answer, ...selectedWrongs])
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
      [
        String(answer - n),     // よくある計算ミス
        String(answer + n),     // ペア数ミス
        String(n * (n + 1))     // ÷2 を忘れるミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Write the sequence twice — once forward, once backward:
 1  +  2  +  3  + … + ${n}
${n}  + ${n-1}  + ${n-2}  + … +  1
↓    ↓    ↓         ↓
${n+1}  + ${n+1}  + ${n+1}  + … + ${n+1}

③ ${n+1} appears ${n} times → ${n+1} × ${n} = ${n*(n+1)}
But that's double the answer, so ÷ 2

④ ${n*(n+1)} ÷ 2 = ${answer}

Formula: n × (n+1) ÷ 2 = ${answer}`,
    genre: "Gauss's Sum",
    topPercent: 30
  }
}

// ジャンル2：トーナメントの試合数
function generateTournament(): ExpertQuestion {
  // settingの選択肢（cooking→cooking competition、quiz→quiz bowlに修正）
  const settings = ['sports', 'gaming', 'cooking competition', 'quiz bowl']
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(8, 100)
  const answer = n - 1

  return {
    question: `A single-elimination ${setting} tournament has ${n} players.\nHow many matches are needed to decide the champion?`,
    choices: makeChoices(
      String(answer),
      [
        String(answer - 1),       // 1少ないミス
        String(answer + 1),       // 1多いミス
        String(Math.floor(n / 2)) // 半分と勘違いするミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer} matches.

② Every match eliminates exactly 1 player.

③ To get 1 champion, ${answer} players must be eliminated:

${n} players → ${answer} eliminations → ${answer} matches

④ Key insight for any single-elimination tournament:
n players → n - 1 matches`,
    genre: 'Tournament Matches',
    topPercent: 30
  }
}

// ジャンル3：握手・カード交換の総数
function generateHandshake(): ExpertQuestion {
  const settings = [
    { scene: 'party', action: 'handshake' },
    { scene: 'sports event', action: 'handshake' },
    { scene: 'networking event', action: 'handshake' },
    { scene: 'Christmas party', action: 'card' },          // celebration+toastから変更
  ]

  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(10, 30)
  const answer = (n * (n - 1)) / 2

  return {
    question: `${n} people attend a ${setting.scene}.\nEveryone exchanges a ${setting.action} with every other person once.\nHow many ${setting.action}s ${setting.action === 'card' ? 'are exchanged' : 'take place'} in total?`,
    choices: makeChoices(
      String(answer),
      [
        String(n * (n - 1)),    // ÷2を忘れるミス
        String(answer + n),     // 1人分多く数えるミス
        String(answer - n)      // 1人分少なく数えるミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Each person interacts with every other person once:
Person 1 → ${n - 1} others
Person 2 → ${n - 2} others (Person 1 already counted)
Person 3 → ${n - 3} others
...
${n - 1} + ${n - 2} + ... + 1 = ${answer}

③ Or think of it this way:
${n} × ${n - 1} = ${n * (n - 1)} — but this counts each ${setting.action} twice!

④ ${n * (n - 1)} ÷ 2 = ${answer}

Formula: n × (n-1) ÷ 2 = ${answer}`,
    genre: 'Handshakes & High-Fives',
    topPercent: 15
  }
}

// ジャンル4：倍増系
function generateDoubling(): ExpertQuestion {
  const durationSettings = [
    { subject: 'bacteria', unit: 'minute', container: 'bottle' },
    { subject: 'water lilies', unit: 'day', container: 'pond' },
    { subject: 'algae', unit: 'hour', container: 'tank' },
    { subject: 'mold', unit: 'hour', container: 'petri dish' },
  ]

  const timeSettings = [
    { subject: 'algae', unit: 'hour', container: 'tank' },
    { subject: 'mold', unit: 'hour', container: 'petri dish' },
  ]

  // 単位の複数形を返す関数
  function pluralize(unit: string, n: number): string {
    return `${n} ${unit}${n === 1 ? '' : 's'}`
  }

  // 最初の文字を大文字にする関数
  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const questionTypes = [
    // パターン1：満杯の1単位前＝半分（n+1をn-3に変更）
    () => {
      const setting = durationSettings[randInt(0, durationSettings.length - 1)]
      const n = randInt(10, 60)
      const answer = pluralize(setting.unit, n - 1)

      return {
        question: `${capitalize(setting.subject)} double every ${setting.unit}.\nIf the ${setting.container} is full after ${pluralize(setting.unit, n)}, when was it half full?`,
        answer,
        wrongs: [
          pluralize(setting.unit, Math.floor(n / 2)),  // 半分の時間と勘違いするミス
          pluralize(setting.unit, n - 2),               // 2単位前と勘違いするミス
          pluralize(setting.unit, n - 3),               // 3単位前と勘違いするミス
        ],
        explanation:
`① The answer is ${answer}.

② Here's why:
If something doubles every ${setting.unit}, then 1 ${setting.unit} earlier it was half as much.

③ Work backwards:

${pluralize(setting.unit, n - 2)} → 25% full
${pluralize(setting.unit, n - 1)} → 50% full
${pluralize(setting.unit, n)} → 100% full ✓

④ A common trap is to think "half full" means half the time has passed, but doubling growth does not work that way.`
      }
    },

    // パターン2：満杯の2単位前＝25%
    () => {
      const setting = durationSettings[randInt(0, durationSettings.length - 1)]
      const n = randInt(10, 60)

      return {
        question: `${capitalize(setting.subject)} double every ${setting.unit}.\nIf the ${setting.container} is full after ${pluralize(setting.unit, n)}, how full is it 2 ${setting.unit}s earlier?`,
        answer: '25%',
        wrongs: [
          '50%',    // 1単位前と勘違いするミス
          '40%',    // 曖昧な直感で選びやすい罠
          '12.5%',  // 3単位前の答え
        ],
        explanation:
`① The answer is 25%.

② Work backwards:

${pluralize(setting.unit, n)}     → 100% full
${pluralize(setting.unit, n - 1)} →  50% full
${pluralize(setting.unit, n - 2)} →  25% full ✓

③ So 2 ${setting.unit}s earlier means one-quarter full.

④ With doubling, the amount grows very quickly near the end.`
      }
    },

    // パターン3：半分の時刻から満杯の時刻を求める
    () => {
      const setting = timeSettings[randInt(0, timeSettings.length - 1)]
      const times = [
        { start: '3:00 PM', answer: '4:00 PM', wrong1: '3:30 PM', wrong2: '5:00 PM', wrong3: '6:00 PM' },
        { start: '6:00 PM', answer: '7:00 PM', wrong1: '6:30 PM', wrong2: '8:00 PM', wrong3: '9:00 PM' },
        { start: '9:00 PM', answer: '10:00 PM', wrong1: '9:30 PM', wrong2: '11:00 PM', wrong3: '12:00 AM' },
        { start: '10:00 AM', answer: '11:00 AM', wrong1: '10:30 AM', wrong2: '12:00 PM', wrong3: '1:00 PM' },
      ]
      const t = times[randInt(0, times.length - 1)]

      return {
        question: `${capitalize(setting.subject)} double every hour.\nIf the ${setting.container} is half full at ${t.start}, when will it be full?`,
        answer: t.answer,
        wrongs: [
          t.wrong3,  // 2倍の時間という罠
          t.wrong1,  // 30分後という罠
          t.wrong2,  // 2時間後という罠
        ],
        explanation:
`① The answer is ${t.answer}.

② Here's why:
If something doubles every hour, it becomes full exactly 1 hour after being half full.

③ ${t.start} → 50% full
   ${t.answer} → 100% full ✓

Just 1 hour later!`
      }
    },

    // パターン4：4分の1の時刻から満杯の時刻を求める
    () => {
      const setting = timeSettings[randInt(0, timeSettings.length - 1)]
      const times = [
        { start: '1:00 PM', half: '2:00 PM', answer: '3:00 PM', wrong1: '4:00 PM', wrong2: '5:00 PM' },
        { start: '4:00 PM', half: '5:00 PM', answer: '6:00 PM', wrong1: '7:00 PM', wrong2: '8:00 PM' },
        { start: '8:00 AM', half: '9:00 AM', answer: '10:00 AM', wrong1: '11:00 AM', wrong2: '12:00 PM' },
        { start: '7:00 PM', half: '8:00 PM', answer: '9:00 PM', wrong1: '10:00 PM', wrong2: '11:00 PM' },
      ]
      const t = times[randInt(0, times.length - 1)]

      return {
        question: `${capitalize(setting.subject)} double every hour.\nIf the ${setting.container} is one-quarter full at ${t.start}, when will it be full?`,
        answer: t.answer,
        wrongs: [
          t.wrong2,  // 4倍の時間という罠
          t.wrong1,  // 3時間後という罠
          t.half,    // 1時間後という罠（半分の時刻）
        ],
        explanation:
`① The answer is ${t.answer}.

② From one-quarter to full, work forwards:

${t.start}  → 25% full
${t.half}   → 50% full
${t.answer} → 100% full ✓

③ It takes exactly 2 hours in total.`
      }
    }
  ]

  const qt = questionTypes[randInt(0, questionTypes.length - 1)]()

  return {
    question: qt.question,
    choices: makeChoices(qt.answer, qt.wrongs),
    answer: qt.answer,
    explanation: qt.explanation,
    genre: 'Doubling',
    topPercent: 10
  }
}

// ジャンル5：11との掛け算
function generateTimes11(): ExpertQuestion {
  const n = randInt(12, 99)
  const answer = 11 * n
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const mid = tens + ones

  // 繰り上がりなし・ありで解説を分岐
  const explanation =
    mid < 10
      ? `① The answer is ${answer}.

② There's a trick for multiplying by 11.
Take the tens digit (${tens}) and the ones digit (${ones}).

③ Add them: ${tens} + ${ones} = ${mid}
Then place the sum between the two digits:

  ${tens} _ ${ones}
→ ${answer} ✓`

      : `① The answer is ${answer}.

② There's a trick for multiplying by 11.
Take the tens digit (${tens}) and the ones digit (${ones}).

③ Add them: ${tens} + ${ones} = ${mid}
Place that sum between the two digits:

  ${tens} _ ${ones}
→ ${tens} [${mid}] ${ones}

④ The middle is two digits, so carry the 1:

  ${tens} [${mid}] ${ones}
= (${tens}+1)  ${mid % 10}  ${ones}
=  ${tens + 1}     ${mid % 10}  ${ones}
= ${answer} ✓`

  return {
    question: `11 × ${n} = ?`,
    choices: makeChoices(
      String(answer),
      [
        String(answer + 11),  // 11多いミス
        String(answer - 11),  // 11少ないミス
        String(answer + 22)   // 22多いミス
      ]
    ),
    answer: String(answer),
    explanation,
    genre: 'Multiplying by 11',
    topPercent: 15
  }
}

// ジャンル6：余事象の確率
function generateComplementProbability(): ExpertQuestion {
  const patterns = [
    {
      question: 'If 3 fair coins are flipped, what is the probability that at least one comes up heads?',
      answer: '7/8',
      wrongs: ['1/2', '3/4', '5/8'],        // 5/8は直感で選びやすい罠
      explanation:
`① The answer is 7/8.

② Use the complement.
"At least one comes up heads" → opposite is "all 3 come up tails."

③ P(all tails):
1/2 × 1/2 × 1/2
= 1/8

④ At least one heads = 1 - 1/8 = 7/8 ✓`
    },
    {
      question: 'If 2 fair dice are rolled, what is the probability that at least one shows a 6?',
      answer: '11/36',
      wrongs: ['1/6', '1/3', '12/36'],      // 12/36は1/6を2倍した間違い
      explanation:
`① The answer is 11/36.

② Use the complement.
"At least one shows a 6" → opposite is "neither die shows a 6."

③ P(neither shows a 6):
5/6 × 5/6
= 25/36

④ At least one shows a 6 = 1 - 25/36 = 11/36 ✓`
    },
    {
      question: 'If 4 fair coins are flipped, what is the probability that at least one comes up heads?',
      answer: '15/16',
      wrongs: ['1/2', '3/4', '7/8'],        // 7/8は3枚の答えなので混乱しやすい
      explanation:
`① The answer is 15/16.

② Use the complement.
"At least one comes up heads" → opposite is "all 4 come up tails."

③ P(all tails):
1/2 × 1/2 × 1/2 × 1/2
= 1/16

④ At least one heads = 1 - 1/16 = 15/16 ✓`
    },
    {
      question: 'If 5 fair coins are flipped, what is the probability that at least one comes up heads?',
      answer: '31/32',
      wrongs: ['15/16', '7/8', '1/2'],      // 15/16は4枚の答えなので混乱しやすい
      explanation:
`① The answer is 31/32.

② Use the complement.
"At least one comes up heads" → opposite is "all 5 come up tails."

③ P(all tails):
1/2 × 1/2 × 1/2 × 1/2 × 1/2
= 1/32

④ At least one heads = 1 - 1/32 = 31/32 ✓`
    },
    {
      question: 'If 3 fair dice are rolled, what is the probability that at least one shows a 6?',
      answer: '91/216',
      wrongs: ['1/6', '1/2', '125/216'],    // 125/216は余事象そのもの（引き算忘れ）
      explanation:
`① The answer is 91/216.

② Use the complement.
"At least one shows a 6" → opposite is "none of the dice shows a 6."

③ P(no 6):
5/6 × 5/6 × 5/6
= 125/216

④ At least one shows a 6 = 1 - 125/216 = 91/216 ✓`
    },
    {
      question: 'If 2 fair dice are rolled, what is the probability that at least one shows an even number?',
      answer: '3/4',
      wrongs: ['1/2', '1/4', '2/3'],        // 1/4は余事象そのもの（引き算忘れ）
      explanation:
`① The answer is 3/4.

② Use the complement.
"At least one shows an even number" → opposite is "both dice show odd numbers."

③ P(both odd):
Odd numbers: 1, 3, 5 → P(odd) = 3/6 = 1/2
1/2 × 1/2
= 1/4

④ At least one even = 1 - 1/4 = 3/4 ✓`
    },
    {
      question: 'If two people each choose Rock, Paper, or Scissors at random, what is the probability that at least one chooses Rock?',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],        // 4/9は余事象そのもの（引き算忘れ）
      explanation:
`① The answer is 5/9.

② Use the complement.
"At least one chooses Rock" → opposite is "neither person chooses Rock."

③ P(no Rock):
Each person has 2 choices out of 3.
2/3 × 2/3
= 4/9

④ At least one chooses Rock = 1 - 4/9 = 5/9 ✓`
    },
    {
      question: 'If 3 fair coins are flipped, what is the probability that not all of them come up heads?',
      answer: '7/8',
      wrongs: ['1/8', '1/2', '3/4'],        // 1/8は余事象そのもの（引き算忘れ）
      explanation:
`① The answer is 7/8.

② Use the complement.
"Not all come up heads" → opposite is "all 3 come up heads."

③ P(all heads):
1/2 × 1/2 × 1/2
= 1/8

④ Not all heads = 1 - 1/8 = 7/8 ✓`
    },
    {
      question: 'If 2 fair dice are rolled, what is the probability that not both show a 6?',
      answer: '35/36',
      wrongs: ['1/36', '11/36', '25/36'],   // 1/36は余事象そのもの（引き算忘れ）
      explanation:
`① The answer is 35/36.

② Use the complement.
"Not both show a 6" → opposite is "both dice show a 6."

③ P(both show a 6):
1/6 × 1/6
= 1/36

④ Not both show a 6 = 1 - 1/36 = 35/36 ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Complement Probability',
    topPercent: 30
  }
}

// ジャンル7：対角線の本数
function generateDiagonals(): ExpertQuestion {
  const polygons = [
    { sides: 5, answer: 5 },
    { sides: 6, answer: 9 },
    { sides: 7, answer: 14 },
    { sides: 8, answer: 20 },
    { sides: 9, answer: 27 },
    { sides: 10, answer: 35 },
    { sides: 11, answer: 44 },
    { sides: 12, answer: 54 },
  ]
  const p = polygons[randInt(0, polygons.length - 1)]
  const perVertex = p.sides - 3
  const beforeDivide = p.sides * perVertex

  return {
    question: `How many diagonals does a polygon with ${p.sides} sides have?`,
    choices: makeChoices(
      String(p.answer),
      [
        String(beforeDivide),        // ÷2を忘れるミス
        String(p.answer + p.sides),  // 辺の数を足すミス
        String(p.answer - 1)         // 惜しいミス
      ]
    ),
    answer: String(p.answer),
    explanation:
`① The answer is ${p.answer}.

② Each vertex connects to every other vertex except itself and its 2 neighbors:
${p.sides} - 3 = ${perVertex} diagonals per vertex

③ With ${p.sides} vertices:
${p.sides} × ${perVertex} = ${beforeDivide} — but this counts each diagonal twice!

④ ${beforeDivide} ÷ 2 = ${p.answer} ✓

Formula: n × (n-3) ÷ 2 = ${p.answer}`,
    genre: 'Diagonals',
    topPercent: 15
  }
}

// ジャンル8：奇数の和の法則
function generateOddSum(): ExpertQuestion {
  const nOptions = [3, 4, 5, 6, 7, 8, 9, 10]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = n * n

  return {
    question: `What is the sum of the first ${n} odd numbers?\n1 + 3 + 5 + … = ?`,
    choices: makeChoices(
      String(answer),
      [
        String(answer - 1),         // 1少ないミス
        String(answer + 1),         // 1多いミス
        String((n + 1) * (n + 1))   // n+1個と勘違いするミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Key insight: The sum of the first n odd numbers = n²

③ See the pattern:
1          = 1  = 1²
1 + 3      = 4  = 2²
1 + 3 + 5  = 9  = 3²
...
${Array.from({length: n}, (_, i) => 2 * i + 1).join(' + ')} = ${answer} = ${n}² ✓`,
    genre: 'Sum of Odd Numbers',
    topPercent: 30
  }
}

// ジャンル9：隣り合う順列
function generateAdjacentPermutation(): ExpertQuestion {
  function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1)
  }

  const patterns = [
    // A・B・Cが全員隣り合う（5人）
    {
      question: '5 people are standing in a row.\nHow many ways can A, B, and C all stand next to each other?',
      answer: '36 ways',
      wrongs: ['12 ways', '24 ways', '48 ways'],
      explanation:
`① The answer is 36 ways.

② Treat A, B, and C as one unit:

[ABC] D E
→ 3 units total

③ Arrange the 3 units:
3! = 6 ways

④ Arrange A, B, C within the unit:
3! = 6 ways

⑤ 6 × 6 = 36 ways ✓`
    },
    // A・B・Cが全員隣り合う（6人）
    {
      question: '6 people are standing in a row.\nHow many ways can A, B, and C all stand next to each other?',
      answer: '144 ways',
      wrongs: ['72 ways', '36 ways', '288 ways'],
      explanation:
`① The answer is 144 ways.

② Treat A, B, and C as one unit:

[ABC] D E F
→ 4 units total

③ Arrange the 4 units:
4! = 24 ways

④ Arrange A, B, C within the unit:
3! = 6 ways

⑤ 24 × 6 = 144 ways ✓`
    },
    // 円形・隣り合う（4人）
    {
      question: '4 people are seated in a circle.\nHow many ways can they sit so that A and B are next to each other?',
      answer: '4 ways',
      wrongs: ['6 ways', '8 ways', '12 ways'],
      explanation:
`① The answer is 4 ways.

② Treat A and B as one unit:

[AB] C D
→ 3 units in a circle

③ Fix one unit in place for circular arrangements:
(3-1)! = 2! = 2 ways

④ A and B can swap within the unit:
× 2 = 4 ways ✓`
    },
    // 円形・隣り合う（5人）
    {
      question: '5 people are seated in a circle.\nHow many ways can they sit so that A and B are next to each other?',
      answer: '12 ways',
      wrongs: ['24 ways', '6 ways', '48 ways'],
      explanation:
`① The answer is 12 ways.

② Treat A and B as one unit:

[AB] C D E
→ 4 units in a circle

③ Fix one unit in place for circular arrangements:
(4-1)! = 3! = 6 ways

④ A and B can swap within the unit:
× 2 = 12 ways ✓`
    },
    // 円形・隣り合う（6人）
    {
      question: '6 people are seated in a circle.\nHow many ways can they sit so that A and B are next to each other?',
      answer: '48 ways',
      wrongs: ['120 ways', '24 ways', '96 ways'],
      explanation:
`① The answer is 48 ways.

② Treat A and B as one unit:

[AB] C D E F
→ 5 units in a circle

③ Fix one unit in place for circular arrangements:
(5-1)! = 4! = 24 ways

④ A and B can swap within the unit:
× 2 = 48 ways ✓`
    },
    // 隣り合わない（4人）
    {
      question: '4 people are standing in a row.\nHow many ways can they stand so that A and B are NOT next to each other?',
      answer: '12 ways',
      wrongs: ['6 ways', '18 ways', '24 ways'],
      explanation:
`① The answer is 12 ways.

② Total arrangements:
4! = 24 ways

③ Subtract arrangements where A and B ARE next to each other:

[AB] C D
→ 3 units: 3! = 6 ways
→ A and B swap: × 2 = 12 ways

④ NOT next to each other:
24 - 12 = 12 ways ✓`
    },
    // 隣り合わない（5人）
    {
      question: '5 people are standing in a row.\nHow many ways can they stand so that A and B are NOT next to each other?',
      answer: '72 ways',
      wrongs: ['48 ways', '60 ways', '96 ways'],
      explanation:
`① The answer is 72 ways.

② Total arrangements:
5! = 120 ways

③ Subtract arrangements where A and B ARE next to each other:

[AB] C D E
→ 4 units: 4! = 24 ways
→ A and B swap: × 2 = 48 ways

④ NOT next to each other:
120 - 48 = 72 ways ✓`
    },
    // 男女交互（2人ずつ）
    {
      question: '2 men and 2 women are standing in a row.\nHow many ways can they stand in alternating man-woman order?',
      answer: '8 ways',
      wrongs: ['4 ways', '12 ways', '24 ways'],
      explanation:
`① The answer is 8 ways.

② Two alternating patterns:
M W M W
W M W M

③ Arrange the men: 2! = 2 ways
Arrange the women: 2! = 2 ways

④ 2 × 2 × 2 = 8 ways ✓`
    },
    // 男女交互（3人ずつ）
    {
      question: '3 men and 3 women are standing in a row.\nHow many ways can they stand in alternating man-woman order?',
      answer: '72 ways',
      wrongs: ['36 ways', '48 ways', '144 ways'],
      explanation:
`① The answer is 72 ways.

② Two alternating patterns:
M W M W M W
W M W M W M

③ Arrange the men: 3! = 6 ways
Arrange the women: 3! = 6 ways

④ 2 × 6 × 6 = 72 ways ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Adjacent Permutations',
    topPercent: 15
  }
}

// ジャンル10：数字の登場回数
function generateDigitCount(): ExpertQuestion {
  const patterns = [
    {
      // 1〜100の「1」の登場回数
      question: 'How many times does the digit 1 appear\nin the numbers from 1 to 100?',
      answer: '21 times',
      wrongs: ['20 times', '11 times', '10 times'],
      explanation:
`① The answer is 21 times.

② Count by position:

Ones place:     1, 11, 21 … 91   → 10 times
Tens place:     10, 11, 12 … 19  → 10 times
Hundreds place: 100              →  1 time

③ Total:
10 + 10 + 1 = 21 times ✓

Note: 11 has 1 in both places, already counted twice.`
    },
    {
      // 1〜50の「3」の登場回数
      question: 'How many times does the digit 3 appear\nin the numbers from 1 to 50?',
      answer: '15 times',
      wrongs: ['5 times', '14 times', '10 times'],
      explanation:
`① The answer is 15 times.

② Count by position:

Ones place: 3, 13, 23, 33, 43  → 5 times
Tens place: 30, 31, 32 … 39   → 10 times

③ Total:
5 + 10 = 15 times ✓

Note: 33 has 3 in both places, already counted twice.`
    },
    {
      // 1〜100の「7」の登場回数
      question: 'How many times does the digit 7 appear\nin the numbers from 1 to 100?',
      answer: '20 times',
      wrongs: ['10 times', '19 times', '21 times'],
      explanation:
`① The answer is 20 times.

② Count by position:

Ones place: 7, 17, 27 … 97   → 10 times
Tens place: 70, 71, 72 … 79  → 10 times

③ Total:
10 + 10 = 20 times ✓

Note: 77 has 7 in both places, already counted twice.`
    },
    {
      // 1〜200の「1」の登場回数
      question: 'How many times does the digit 1 appear\nin the numbers from 1 to 200?',
      answer: '140 times',
      wrongs: ['120 times', '100 times', '21 times'],
      explanation:
`① The answer is 140 times.

② Count by position:

Ones place:     1, 11, 21 … 191   → 20 times
Tens place:     10-19, 110-119    → 20 times
Hundreds place: 100-199           → 100 times

③ Total:
20 + 20 + 100 = 140 times ✓

Note: 11, 111 have 1 in multiple places, already counted.`
    },
    {
      // 1〜99の「5」の登場回数
      question: 'How many times does the digit 5 appear\nin the numbers from 1 to 99?',
      answer: '20 times',
      wrongs: ['10 times', '19 times', '15 times'],
      explanation:
`① The answer is 20 times.

② Count by position:

Ones place: 5, 15, 25 … 95   → 10 times
Tens place: 50, 51, 52 … 59  → 10 times

③ Total:
10 + 10 = 20 times ✓

Note: 55 has 5 in both places, already counted twice.`
    },
    {
      // 1〜30の「2」の登場回数
      question: 'How many times does the digit 2 appear\nin the numbers from 1 to 30?',
      answer: '13 times',
      wrongs: ['3 times', '10 times', '12 times'],
      explanation:
`① The answer is 13 times.

② Count by position:

Ones place: 2, 12, 22  → 3 times
Tens place: 20, 21, 22 … 29  → 10 times

③ Total:
3 + 10 = 13 times ✓

Note: 22 has 2 in both places, already counted twice.`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Digit Count',
    topPercent: 10
  }
}

// ジャンル11：無限等比級数・循環小数
function generateInfiniteGeometric(): ExpertQuestion {
  const patterns = [
    {
      // 0.999…= 1
      question: 'What does 0.999… (9 repeating forever) equal?',
      answer: '1',
      wrongs: ['0.999', '0.9999', 'infinitely close to 1'],  // 直感的に選びやすい罠
      explanation:
`① The answer is 1.

② It feels like it should be slightly less than 1…
but it actually equals exactly 1!

③ Let x = 0.999…
10x = 9.999…
  x = 0.999…

10x - x = 9.999… - 0.999…
9x = 9
 x = 1

④ 0.999… and 1 are exactly the same number ✓`
    },
    {
      // 1/2 + 1/4 + 1/8 + … = 1
      question: '1/2 + 1/4 + 1/8 + 1/16 + …\nWhat does this infinite sum equal?',
      answer: '1',
      wrongs: ['1/2', '2', '∞'],
      explanation:
`① The answer is 1.

② It seems like it should keep growing forever…
but it converges to exactly 1!

③ Let S = 1/2 + 1/4 + 1/8 + …
2S = 1 + 1/2 + 1/4 + …
 S =     1/2 + 1/4 + …

2S - S = 1
S = 1 ✓`
    },
    {
      // 0.333… = 1/3
      question: 'What does 0.333… (3 repeating forever) equal?',
      answer: '1/3',
      wrongs: ['0.333', '1/4', '0.3'],
      explanation:
`① The answer is 1/3.

② Let x = 0.333…
10x = 3.333…
  x = 0.333…

10x - x = 3.333… - 0.333…
9x = 3
 x = 3/9 = 1/3 ✓`
    },
    {
      // 0.111… = 1/9
      question: 'What does 0.111… (1 repeating forever) equal?',
      answer: '1/9',
      wrongs: ['0.111', '1/10', '1/8'],
      explanation:
`① The answer is 1/9.

② Let x = 0.111…
10x = 1.111…
  x = 0.111…

10x - x = 1.111… - 0.111…
9x = 1
 x = 1/9 ✓`
    },
    {
      // 0.666… = 2/3
      question: 'What does 0.666… (6 repeating forever) equal?',
      answer: '2/3',
      wrongs: ['0.666', '3/4', '5/9'],   // 5/9は直感で選びやすい罠
      explanation:
`① The answer is 2/3.

② Let x = 0.666…
10x = 6.666…
  x = 0.666…

10x - x = 6.666… - 0.666…
9x = 6
 x = 6/9 = 2/3 ✓`
    },
    {
      // 0.888… = 8/9
      question: 'What does 0.888… (8 repeating forever) equal?',
      answer: '8/9',
      wrongs: ['0.888', '7/9', 'infinitely close to 1'],  // 0.999…=1との対比で引っかかりやすい
      explanation:
`① The answer is 8/9.

② Let x = 0.888…
10x = 8.888…
  x = 0.888…

10x - x = 8.888… - 0.888…
9x = 8
 x = 8/9 ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Infinite Geometric Series',
    topPercent: 5
  }
}

// ジャンル12：組み合わせの総数
function generateCombinationTotal(): ExpertQuestion {
  const settings = [
    { scene: 'A pizza place has 5 toppings available.', n: 5 },
    { scene: 'A burger place has 4 toppings available.', n: 4 },
    { scene: 'A salad bar has 5 toppings available.', n: 5 },
    { scene: 'A ramen shop has 6 toppings available.', n: 6 },
    { scene: 'A sandwich shop has 5 fillings available.', n: 5 },  // Tシャツから差し替え
    { scene: 'A smoothie bar has 4 fruits available.', n: 4 },     // アイスクリームから差し替え
  ]

  const setting = settings[randInt(0, settings.length - 1)]
  const answer = Math.pow(2, setting.n) - 1
  const total = Math.pow(2, setting.n)

  // 2×2×…の視覚的フロー生成
  const multiplicationFlow = Array(setting.n).fill('2').join(' × ')

  return {
    question: `${setting.scene}\nIf you must choose at least one, how many combinations are possible?`,
    choices: makeChoices(
      String(answer),
      [
        String(total),        // ÷1を忘れて2ⁿそのままにするミス
        String(answer + 1),   // 1多いミス
        String(answer - 1)    // 1少ないミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer} combinations.

② For each option, there are 2 choices: pick it or skip it.

③ ${setting.n} options, each with 2 choices:
${multiplicationFlow} = ${total}

④ Subtract the 1 case where nothing is chosen:
${total} - 1 = ${answer} combinations ✓`,
    genre: 'Combination Count',
    topPercent: 15
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
      [
        String(n * (n - 1)),    // ÷2を忘れるミス
        String(answer + n),     // 1チーム分多いミス
        String(answer - 1)      // 1少ないミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer} matches.

② Each of the ${n} teams plays ${n - 1} others:
${n} × ${n - 1} = ${n * (n - 1)} — but this counts each match twice!
(A vs B and B vs A are counted separately)

③ Divide by 2:
${n * (n - 1)} ÷ 2 = ${answer} matches ✓`,
    genre: 'Round Robin Matches',
    topPercent: 30
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

  // trainを削除してbusに変更
  const vehicles = ['car', 'bicycle', 'motorcycle', 'bus']
  const p = patterns[randInt(0, patterns.length - 1)]
  const vehicle = vehicles[randInt(0, vehicles.length - 1)]

  return {
    question: `A ${vehicle} travels to a destination and back.\nGoing: ${p.go} km/h, returning: ${p.back} km/h.\nWhat is the average speed for the whole trip?`,
    choices: makeChoices(
      `${p.avg} km/h`,
      [
        `${Math.round((p.go + p.back) / 2)} km/h`,  // 単純平均してしまうミス
        `${p.avg + 4} km/h`,                          // 少し多いミス
        `${p.avg - 4} km/h`                           // 少し少ないミス
      ]
    ),
    answer: `${p.avg} km/h`,
    explanation:
`① The answer is ${p.avg} km/h.

② It's tempting to say "(${p.go}+${p.back})÷2=${Math.round((p.go + p.back) / 2)} km/h",
but you can't simply average the two speeds!

③ Let's say the one-way distance is ${p.dist} km:
Going:     ${p.dist} ÷ ${p.go} = ${p.dist / p.go} hours
Returning: ${p.dist} ÷ ${p.back} = ${p.dist / p.back} hours
Total time: ${p.dist / p.go} + ${p.dist / p.back} = ${p.dist / p.go + p.dist / p.back} hours
Total distance: ${p.dist} × 2 = ${p.dist * 2} km

④ Average speed = Total distance ÷ Total time
= ${p.dist * 2} ÷ ${p.dist / p.go + p.dist / p.back}
= ${p.avg} km/h ✓`,
    genre: 'Average Round Trip Speed',
    topPercent: 5
  }
}

// ジャンル15：握手回数から人数の逆算
function generateReverseHandshake(): ExpertQuestion {
  const counts = [6, 10, 15, 21, 28, 36, 45]
  const count = counts[randInt(0, counts.length - 1)]
  const n = Math.round((1 + Math.sqrt(1 + 8 * count)) / 2)

  // weddingとmeetingを自然なシーンに変更
  const scenes = ['party', 'networking event', 'school reunion', 'team gathering']
  const scene = scenes[randInt(0, scenes.length - 1)]

  // 連続する2つの数の積のリストを生成（視覚的フロー用）
  const productList = Array.from(
    {length: n},
    (_, i) => `${i + 1} × ${i + 2} = ${(i + 1) * (i + 2)}`
  ).join('\n')

  return {
    question: `At a ${scene}, everyone shook hands with each other exactly once.\nIf there were ${count} handshakes in total, how many people were there?`,
    choices: makeChoices(
      String(n),
      [
        String(n - 1),  // 1人少ないミス
        String(n + 1),  // 1人多いミス
        String(n + 2)   // 2人多いミス
      ]
    ),
    answer: String(n),
    explanation:
`① The answer is ${n} people.

② When n people each shake hands with everyone else once:
n × (n-1) ÷ 2 = total handshakes

③ Work backwards from ${count} handshakes:
n × (n-1) ÷ 2 = ${count}
n × (n-1) = ${count * 2}

④ Find two consecutive numbers that multiply to ${count * 2}:
${productList}

⑤ n = ${n} people ✓`,
    genre: 'Reverse Handshake',
    topPercent: 5
  }
}

// ジャンル16：レンガの重さ
function generateBrickWeight(): ExpertQuestion {
  const nOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = n * 2

  return {
    question: `A brick weighs ${n} kg more than half of its own weight.\nHow heavy is the brick?`,
    choices: makeChoices(
      `${answer} kg`,
      [
        `${n + n / 2} kg`,    // 問題文をそのまま計算してしまうミス
        `${n * 2 - 1} kg`,    // 惜しい計算ミス
        `${answer + 1} kg`    // 1多いミス
      ]
    ),
    answer: `${answer} kg`,
    explanation:
`① The answer is ${answer} kg.

② Let x = the weight of the brick:
x = x/2 + ${n}

③ Rearrange:
x - x/2 = ${n}
→ x/2 = ${n}
→ x = ${answer} kg ✓`,
    genre: 'Brick Weight',
    topPercent: 15
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
      explanation:
`① The answer is 22.

② Look at the differences:
1→2:   +1
2→4:   +2
4→7:   +3
7→11:  +4
11→16: +5
→ The gap increases by 1 each time!

③ Next difference: 5 + 1 = 6
16 + 6 = 22 ✓`
    },
    {
      sequence: '1, 3, 6, 10, 15, 21, ?',
      answer: '28',
      wrongs: ['25', '26', '27'],
      explanation:
`① The answer is 28.

② Look at the differences:
1→3:   +2
3→6:   +3
6→10:  +4
10→15: +5
15→21: +6
→ The gap increases by 1 each time!

③ Next difference: 6 + 1 = 7
21 + 7 = 28 ✓`
    },
    {
      sequence: '2, 3, 5, 8, 12, 17, ?',
      answer: '23',
      wrongs: ['21', '22', '24'],
      explanation:
`① The answer is 23.

② Look at the differences:
2→3:   +1
3→5:   +2
5→8:   +3
8→12:  +4
12→17: +5
→ The gap increases by 1 each time!

③ Next difference: 5 + 1 = 6
17 + 6 = 23 ✓`
    },
    // 差が2ずつ増える
    {
      sequence: '1, 3, 7, 13, 21, 31, ?',
      answer: '43',
      wrongs: ['40', '41', '42'],
      explanation:
`① The answer is 43.

② Look at the differences:
1→3:   +2
3→7:   +4
7→13:  +6
13→21: +8
21→31: +10
→ The gap increases by 2 each time!

③ Next difference: 10 + 2 = 12
31 + 12 = 43 ✓`
    },
    {
      sequence: '2, 4, 8, 14, 22, 32, ?',
      answer: '44',
      wrongs: ['41', '42', '43'],
      explanation:
`① The answer is 44.

② Look at the differences:
2→4:   +2
4→8:   +4
8→14:  +6
14→22: +8
22→32: +10
→ The gap increases by 2 each time!

③ Next difference: 10 + 2 = 12
32 + 12 = 44 ✓`
    },
    // フィボナッチ系
    {
      sequence: '1, 1, 2, 3, 5, 8, ?',
      answer: '13',
      wrongs: ['11', '12', '14'],
      explanation:
`① The answer is 13.

② Each number = sum of the two before it:
1+1=2
1+2=3
2+3=5
3+5=8

③ 5 + 8 = 13 ✓

This pattern is called the Fibonacci sequence!`
    },
    {
      sequence: '1, 2, 3, 5, 8, 13, ?',
      answer: '21',
      wrongs: ['18', '19', '20'],
      explanation:
`① The answer is 21.

② Each number = sum of the two before it:
1+2=3
2+3=5
3+5=8
5+8=13

③ 8 + 13 = 21 ✓

This pattern is called the Fibonacci sequence!`
    },
    // 差し替え1：2n²-1
    {
      sequence: '1, 7, 17, 31, 49, 71, ?',
      answer: '97',
      wrongs: ['90', '93', '95'],
      explanation:
`① The answer is 97.

② Look at the differences:
1→7:   +6
7→17:  +10
17→31: +14
31→49: +18
49→71: +22
→ The gap increases by 4 each time!

③ Next difference: 22 + 4 = 26
71 + 26 = 97 ✓

④ Key insight: each term can also be written as 2n² - 1`
    },
    // 差し替え2：前の3つの和
    {
      sequence: '1, 2, 3, 6, 11, 20, ?',
      answer: '37',
      wrongs: ['34', '35', '36'],
      explanation:
`① The answer is 37.

② Each number = sum of the three before it:
1+2+3=6
2+3+6=11
3+6+11=20

③ 6 + 11 + 20 = 37 ✓`
    },
    // 差し替え3：n²+2n
    {
      sequence: '3, 8, 15, 24, 35, 48, ?',
      answer: '63',
      wrongs: ['58', '60', '62'],
      explanation:
`① The answer is 63.

② Look at the differences:
3→8:   +5
8→15:  +7
15→24: +9
24→35: +11
35→48: +13
→ The gap increases by 2 each time!

③ Next difference: 13 + 2 = 15
48 + 15 = 63 ✓

④ Key insight: each term can also be written as n² + 2n`
    },
    // 2乗系
    {
      sequence: '1, 4, 9, 16, 25, ?',
      answer: '36',
      wrongs: ['30', '32', '34'],
      explanation:
`① The answer is 36.

② Each number is a perfect square:
1²=1
2²=4
3²=9
4²=16
5²=25

③ 6² = 36 ✓`
    },
    {
      sequence: '2, 5, 10, 17, 26, ?',
      answer: '37',
      wrongs: ['33', '35', '39'],
      explanation:
`① The answer is 37.

② Each number follows n² + 1:
1²+1=2
2²+1=5
3²+1=10
4²+1=17
5²+1=26

③ 6²+1 = 37 ✓`
    },
    {
      sequence: '0, 3, 8, 15, 24, ?',
      answer: '35',
      wrongs: ['30', '32', '33'],
      explanation:
`① The answer is 35.

② Each number follows n² - 1:
1²-1=0
2²-1=3
3²-1=8
4²-1=15
5²-1=24

③ 6²-1 = 35 ✓`
    },
    {
      sequence: '3, 6, 11, 18, 27, ?',
      answer: '38',
      wrongs: ['34', '36', '40'],
      explanation:
`① The answer is 38.

② Each number follows n² + 2:
1²+2=3
2²+2=6
3²+2=11
4²+2=18
5²+2=27

③ 6²+2 = 38 ✓`
    },
    {
      sequence: '-1, 2, 7, 14, 23, ?',
      answer: '34',
      wrongs: ['30', '32', '36'],
      explanation:
`① The answer is 34.

② Each number follows n² - 2:
1²-2=-1
2²-2=2
3²-2=7
4²-2=14
5²-2=23

③ 6²-2 = 34 ✓`
    },
    {
      sequence: '2, 6, 12, 20, 30, ?',
      answer: '42',
      wrongs: ['36', '38', '40'],
      explanation:
`① The answer is 42.

② Each number follows n² + n:
1²+1=2
2²+2=6
3²+3=12
4²+4=20
5²+5=30

③ 6²+6 = 42 ✓`
    },
    // 交互パターン
    {
      sequence: '1, 4, 2, 8, 3, 12, ?',
      answer: '4',
      wrongs: ['5', '6', '16'],
      explanation:
`① The answer is 4.

② Split into two alternating patterns:
1st pattern: 1, 2, 3, ? → increases by 1
2nd pattern: 4, 8, 12   → increases by 4

③ The next number in the first pattern:
3 + 1 = 4 ✓`
    },
    {
      sequence: '2, 6, 3, 9, 4, 12, ?',
      answer: '5',
      wrongs: ['6', '15', '16'],
      explanation:
`① The answer is 5.

② Split into two alternating patterns:
1st pattern: 2, 3, 4, ? → increases by 1
2nd pattern: 6, 9, 12   → increases by 3

③ The next number in the first pattern:
4 + 1 = 5 ✓`
    },
    // 3乗系
    {
      sequence: '1, 8, 27, 64, 125, ?',
      answer: '216',
      wrongs: ['180', '196', '200'],
      explanation:
`① The answer is 216.

② Each number is a perfect cube:
1³=1
2³=8
3³=27
4³=64
5³=125

③ 6³ = 216 ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: `Find the pattern in the sequence.\n${p.sequence}`,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Sequence Patterns',
    topPercent: 10
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

  // 視覚的フロー生成（↓ × peopleを繰り返す）
  const spreadFlow = Array.from({length: p.stages}, (_, i) => {
    const count = Math.pow(p.people, i + 1)
    return `↓ × ${p.people}\n${count} people (time ${i + 1})`
  }).join('\n')

  return {
 question: `One person tells ${p.people} others a piece of news.\nEach person who hears it always tells ${p.people} more people.\nHow many people hear the news in the ${p.stages}th round of spreading?`,   choices: makeChoices(
      `${p.answer} people`,
      [
        `${p.people * p.stages} people`,              // 掛け算と勘違いするミス
        `${Math.pow(p.people, p.stages - 1)} people`, // 1回少ないミス
        `${Math.pow(p.people, p.stages + 1)} people`  // 1回多いミス
      ]
    ),
    answer: `${p.answer} people`,
    explanation:
`① The answer is ${p.answer} people.

② It multiplies by ${p.people} every time:

1 person
${spreadFlow} ✓`,
    genre: 'Exponential Spread',
    topPercent: 30
  }
}

// ジャンル19：倍増の逆算（お金）
function generateDoublingReverse(): ExpertQuestion {
  const patterns = [
    { startAmount: 1, years: 10, finalAmount: 1024 },
    { startAmount: 2, years: 8, finalAmount: 512 },
    { startAmount: 5, years: 6, finalAmount: 320 },
    { startAmount: 1, years: 8, finalAmount: 256 },
    { startAmount: 3, years: 4, finalAmount: 48 },
    { startAmount: 4, years: 5, finalAmount: 128 },
    { startAmount: 2, years: 6, finalAmount: 128 },
    { startAmount: 1, years: 6, finalAmount: 64 },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  // 逆算フローの生成
  const reverseFlow = Array.from({length: p.years + 1}, (_, i) => {
    const amount = p.finalAmount / Math.pow(2, i)
    const year = p.years - i
    if (year === 0) return `Start   → $${amount}`
    return `Year ${year.toString().padStart(2, ' ')} → $${amount}`
  }).join('\n')

  return {
    question: `You invest money in a fund that doubles every year.\nAfter ${p.years} years, you have $${p.finalAmount}.\nHow much did you invest at the start?`,
    choices: makeChoices(
      `$${p.startAmount}`,
      [
        `$${Math.round(p.finalAmount / p.years)}`,  // 割り算と勘違いするミス
        `$${p.startAmount * 2}`,                     // 2倍と勘違いするミス
        `$${p.startAmount + 1}`                      // 1多いミス
      ]
    ),
    answer: `$${p.startAmount}`,
    explanation:
`① The answer is $${p.startAmount}.

② If money doubles every year,
then 1 year earlier it was always half as much!

③ Work backwards:
${reverseFlow}

④ Just $${p.startAmount} grows to $${p.finalAmount} in ${p.years} years! ✓`,
    genre: 'Doubling Reverse',
    topPercent: 10
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
      `about ${answer} years`,
      [
        `about ${rate} years`,              // 金利をそのまま年数と勘違いするミス
        `about ${72 / (rate + 2)} years`,   // 金利を少し違えた計算ミス
        `about ${answer * 2} years`         // 2倍と勘違いするミス
      ]
    ),
    answer: `about ${answer} years`,
    explanation:
`① The answer is about ${answer} years.

② Use the "Rule of 72":
72 ÷ interest rate (%) = years to double

③ 72 ÷ ${rate} = ${answer} years ✓

④ Quick check:
$100 at ${rate}% compound interest
→ doubles to ~$200 in about ${answer} years ✓`,
    genre: 'Rule of 72',
    topPercent: 15
  }
}

// ジャンル21：ガウスの足し算②（倍数の和）
function generateGauss2(): ExpertQuestion {
  const patterns = [
    { mult: 2, max: 100, n: 50, answer: 2550 },
    { mult: 3, max: 99, n: 33, answer: 1683 },
    { mult: 4, max: 100, n: 25, answer: 1300 },
    { mult: 5, max: 100, n: 20, answer: 1050 },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]
  const gaussSum = p.n * (p.n + 1) / 2

  return {
    question: `${p.mult} + ${p.mult * 2} + ${p.mult * 3} + … + ${p.max} = ?\n(Sum of all multiples of ${p.mult} up to ${p.max})`,
    choices: makeChoices(
      String(p.answer),
      [
        String(gaussSum),              // ${p.mult}を掛け忘れるミス
        String(p.answer + p.mult),     // 1つ多く足すミス
        String(p.answer * 2)           // 2倍にしすぎるミス
      ]
    ),
    answer: String(p.answer),

 explanation:
`① The answer is ${p.answer}.

② Factor out ${p.mult}:
${p.mult} + ${p.mult * 2} + ${p.mult * 3} + … + ${p.max}
= ${p.mult} × (1 + 2 + 3 + … + ${p.n})

③ Use Gauss's method for the sum inside:
 1  + ${p.n} = ${p.n + 1}
 2  + ${p.n - 1} = ${p.n + 1}
 3  + ${p.n - 2} = ${p.n + 1}
...
→ ${p.n + 1} × ${p.n} ÷ 2 = ${gaussSum}

④ ${p.mult} × ${gaussSum} = ${p.answer} ✓`,
   genre: "Gauss's Sum II",
    topPercent: 10
  }
}

// ジャンル22：切る回数と個数の差
function generateCutting(): ExpertQuestion {
  const patterns: Array<{question: string, answer: string, wrongs: string[], explanation: string}> = []

  // ピース数に応じて視覚的フローを生成する関数
  function makeFlowString(pieces: number): string {
    if (pieces <= 8) {
      return Array.from({length: pieces}, (_, i) => `[${i + 1}]`).join('✂️')
    } else {
      return `[1]✂️[2]✂️[3]✂️ … ✂️[${pieces - 1}]✂️[${pieces}]`
    }
  }

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
    explanation:
`① The answer is ${p1answer} cuts.

② ${p1.length} ÷ ${p1.interval} = ${p1pieces} pieces

③ ${makeFlowString(p1pieces)}
→ ${p1pieces} - 1 = ${p1answer} cuts ✓

Key insight: the last piece needs no cut!`
  })

  // パターン2：丸太を等分
  const p2Options = [6, 8, 10, 12, 15, 20]
  const p2n = p2Options[randInt(0, p2Options.length - 1)]
  const p2answer = p2n - 1
  patterns.push({
    question: `How many cuts are needed to divide a log into ${p2n} equal pieces?`,
    answer: `${p2answer} cuts`,
    wrongs: [`${p2n} cuts`, `${p2answer - 1} cuts`, `${p2answer + 2} cuts`],
    explanation:
`① The answer is ${p2answer} cuts.

② ${makeFlowString(p2n)}
→ ${p2n} - 1 = ${p2answer} cuts ✓

Key insight: the last piece needs no cut!`
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
    explanation:
`① The answer is ${p3answer} minutes.

② ${makeFlowString(p3.pieces)}
→ ${p3.pieces} - 1 = ${p3cuts} cuts

③ Each cut takes ${p3.time} minutes:
${p3cuts} × ${p3.time} = ${p3answer} minutes ✓

Key insight: ${p3.pieces} pieces need only ${p3cuts} cuts!`
  })

  // パターン4：両端から同時
  const p4Options = [9, 11, 13, 15, 17, 19]
  const p4n = p4Options[randInt(0, p4Options.length - 1)]
  const p4cuts = p4n - 1
  const p4answer = p4cuts / 2
  patterns.push({
    question: `A machine makes 2 cuts at the same time.\nHow many cuts are needed to divide a log into ${p4n} equal pieces?`,
    answer: `${p4answer} cuts`,
    wrongs: [`${p4cuts} cuts`, `${p4answer + 1} cuts`, `${p4answer + 2} cuts`],
    explanation:
`① The answer is ${p4answer} cuts.

② Without the machine, you'd need:
${p4n} - 1 = ${p4cuts} cuts

③ The machine makes 2 cuts at once:
${Array.from({length: p4answer}, (_, i) => `Round ${i + 1}: ✂️ ✂️ → 2 cuts`).join('\n')}

④ ${p4cuts} ÷ 2 = ${p4answer} cuts ✓`
  })

  // パターン5：折ってから切る
  const p5Options = [2, 3, 4, 5]
  const p5cuts = p5Options[randInt(0, p5Options.length - 1)]
  const p5answer = (p5cuts + 1) * 2
  const p5sections = p5cuts + 1
  patterns.push({
    question: `A rope is folded in half, then cut ${p5cuts} times.\nHow many pieces do you end up with?`,
    answer: `${p5answer} pieces`,
    wrongs: [`${p5cuts + 1} pieces`, `${p5answer - 2} pieces`, `${p5answer + 2} pieces`],
    explanation:
`① The answer is ${p5answer} pieces.

② Folding in half creates 2 layers:
|============|
|============|

③ Cutting ${p5cuts} times:
|${'====|'.repeat(p5sections)}
|${'====|'.repeat(p5sections)}

④ Unfold and you get:
${p5sections} + ${p5sections} = ${p5answer} pieces ✓`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Cuts and Pieces',
    topPercent: 15
  }
}

// ジャンル23：トーナメント試合数の応用
function generateTournamentDiff(): ExpertQuestion {
  const patterns: Array<{question: string, answer: string, wrongs: string[], explanation: string}> = []

  // パターン1：試合数の差
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
    answer: `${p1diff} more matches`,
    wrongs: [
      `${p1.b - 1} matches`,   // 大きい方の試合数そのまま
      `${p1.a - 1} matches`,   // 小さい方の試合数そのまま
      `${p1diff * 2} matches`  // 2倍と勘違いするミス
    ],
    explanation:
`① The answer is ${p1diff} more matches.

② Matches in a tournament = players - 1

③ Calculate each:
${p1.a} players → ${p1.a} - 1 = ${p1.a - 1} matches
${p1.b} players → ${p1.b} - 1 = ${p1.b - 1} matches

④ ${p1.b - 1} - ${p1.a - 1} = ${p1diff} more matches
Key insight: the difference is simply ${p1.b} - ${p1.a} = ${p1diff} ✓`
  })

  // パターン2：3つの合計
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
    wrongs: [
      `${p2.a + p2.b + p2.c - 1} matches`,  // 3つを合計して1を引くミス
      `${p2.a + p2.b + p2.c} matches`,       // 1を引き忘れるミス
      `${p2answer - 3} matches`               // 3を引くミス
    ],
    explanation:
`① The answer is ${p2answer} matches.

② Matches in a tournament = players - 1

③ Calculate each:
${p2.a} players → ${p2.a} - 1 = ${p2.a - 1} matches
${p2.b} players → ${p2.b} - 1 = ${p2.b - 1} matches
${p2.c} players → ${p2.c} - 1 = ${p2.c - 1} matches

④ ${p2.a - 1} + ${p2.b - 1} + ${p2.c - 1} = ${p2answer} matches ✓`
  })

  // パターン3：逆算系
  const p3matches = randInt(10, 99)
  const p3answer = p3matches + 1
  patterns.push({
    question: `A tournament had ${p3matches} matches in total.\nHow many players participated?`,
    answer: `${p3answer} players`,
    wrongs: [
      `${p3answer - 1} players`,  // 1少ないミス
      `${p3answer + 1} players`,  // 1多いミス
      `${p3answer * 2} players`   // 2倍と勘違いするミス
    ],
    explanation:
`① The answer is ${p3answer} players.

② Matches in a tournament = players - 1

③ Work backwards:
players = matches + 1
${p3matches} + 1 = ${p3answer} players ✓`
  })

  // パターン4：チーム戦
  const p4teams = randInt(4, 16)
  const p4members = randInt(3, 8)
  const p4answer = (p4teams - 1) * p4members
  patterns.push({
    question: `A team tournament has ${p4teams} teams of ${p4members} players each.\nEvery losing team is eliminated immediately.\nHow many players are eliminated in total?`,
    answer: `${p4answer} players`,
    wrongs: [
      `${p4answer + p4members} players`,  // 1チーム多いミス
      `${p4answer - p4members} players`,  // 1チーム少ないミス
      `${p4teams * p4members} players`    // 全員と勘違いするミス
    ],
    explanation:
`① The answer is ${p4answer} players.

② Number of matches in the tournament:
${p4teams} - 1 = ${p4teams - 1} matches

③ Each match eliminates one team of ${p4members} players:
${p4teams - 1} × ${p4members} = ${p4answer} players eliminated ✓`
  })

  // パターン5：男女別
  const p5men = randInt(10, 30)
  const p5women = randInt(10, 30)
  const p5answer = (p5men - 1) + (p5women - 1)
  patterns.push({
    question: `${p5men} men and ${p5women} women each hold their own separate tournament.\nHow many matches are there in total?`,
    answer: `${p5answer} matches`,
    wrongs: [
      `${p5men + p5women - 1} matches`,  // 合算して1を引くミス
      `${p5answer + 2} matches`,          // 2多いミス
      `${p5answer - 2} matches`           // 2少ないミス
    ],
    explanation:
`① The answer is ${p5answer} matches.

② Men's tournament:
${p5men} - 1 = ${p5men - 1} matches

③ Women's tournament:
${p5women} - 1 = ${p5women - 1} matches

④ ${p5men - 1} + ${p5women - 1} = ${p5answer} matches ✓`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Tournament Variations',
    topPercent: 30
  }
}

// ジャンル24：倍数でない数の個数
function generateNonMultiple(): ExpertQuestion {
  // 割り算の表示を動的に生成する関数
  function divFloor(total: number, divisor: number): string {
    const result = total / divisor
    if (Number.isInteger(result)) {
      return `${total} ÷ ${divisor} = ${result}`
    } else {
      return `${total} ÷ ${divisor} = ${result.toFixed(1)}… → ${Math.floor(result)}`
    }
  }

  const patterns = [
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 3 nor multiples of 5?',
      answer: '53',
      wrongs: ['47', '50', '60'],
      explanation:
`① The answer is 53.

② Count from 1 to 100:
Multiples of 3:  ${divFloor(100, 3)} → 33
Multiples of 5:  ${divFloor(100, 5)} → 20
→ 33 + 20 = 53

③ But multiples of 15 (both 3 and 5) are counted twice!
Multiples of 15: ${divFloor(100, 15)} → 6
→ 53 - 6 = 47 are multiples of 3 or 5

④ Neither:
100 - 47 = 53 ✓`
    },
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 2 nor multiples of 3?',
      answer: '33',
      wrongs: ['34', '50', '17'],
      explanation:
`① The answer is 33.

② Count from 1 to 100:
Multiples of 2: ${divFloor(100, 2)} → 50
Multiples of 3: ${divFloor(100, 3)} → 33
→ 50 + 33 = 83

③ But multiples of 6 (both 2 and 3) are counted twice!
Multiples of 6: ${divFloor(100, 6)} → 16
→ 83 - 16 = 67 are multiples of 2 or 3

④ Neither:
100 - 67 = 33 ✓`
    },
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 2 nor multiples of 5?',
      answer: '40',
      wrongs: ['50', '30', '60'],
      explanation:
`① The answer is 40.

② Count from 1 to 100:
Multiples of 2:  ${divFloor(100, 2)} → 50
Multiples of 5:  ${divFloor(100, 5)} → 20
→ 50 + 20 = 70

③ But multiples of 10 (both 2 and 5) are counted twice!
Multiples of 10: ${divFloor(100, 10)} → 10
→ 70 - 10 = 60 are multiples of 2 or 5

④ Neither:
100 - 60 = 40 ✓`
    },
    {
      question: 'Among the integers from 1 to 50,\nhow many are neither multiples of 3 nor multiples of 5?',
      answer: '27',
      wrongs: ['23', '25', '30'],
      explanation:
`① The answer is 27.

② Count from 1 to 50:
Multiples of 3:  ${divFloor(50, 3)} → 16
Multiples of 5:  ${divFloor(50, 5)} → 10
→ 16 + 10 = 26

③ But multiples of 15 (both 3 and 5) are counted twice!
Multiples of 15: ${divFloor(50, 15)} → 3
→ 26 - 3 = 23 are multiples of 3 or 5

④ Neither:
50 - 23 = 27 ✓`
    },
    {
      question: 'Among the integers from 1 to 50,\nhow many are neither multiples of 2 nor multiples of 3?',
      answer: '17',
      wrongs: ['16', '25', '33'],
      explanation:
`① The answer is 17.

② Count from 1 to 50:
Multiples of 2: ${divFloor(50, 2)} → 25
Multiples of 3: ${divFloor(50, 3)} → 16
→ 25 + 16 = 41

③ But multiples of 6 (both 2 and 3) are counted twice!
Multiples of 6: ${divFloor(50, 6)} → 8
→ 41 - 8 = 33 are multiples of 2 or 3

④ Neither:
50 - 33 = 17 ✓`
    },
    {
      question: 'Among the integers from 1 to 100,\nhow many are neither multiples of 3 nor multiples of 7?',
      answer: '57',
      wrongs: ['43', '50', '55'],
      explanation:
`① The answer is 57.

② Count from 1 to 100:
Multiples of 3:  ${divFloor(100, 3)} → 33
Multiples of 7:  ${divFloor(100, 7)} → 14
→ 33 + 14 = 47

③ But multiples of 21 (both 3 and 7) are counted twice!
Multiples of 21: ${divFloor(100, 21)} → 4
→ 47 - 4 = 43 are multiples of 3 or 7

④ Neither:
100 - 43 = 57 ✓`
    },
    {
      question: 'Among the integers from 1 to 200,\nhow many are neither multiples of 2 nor multiples of 5?',
      answer: '80',
      wrongs: ['100', '60', '120'],
      explanation:
`① The answer is 80.

② Count from 1 to 200:
Multiples of 2:  ${divFloor(200, 2)} → 100
Multiples of 5:  ${divFloor(200, 5)} → 40
→ 100 + 40 = 140

③ But multiples of 10 (both 2 and 5) are counted twice!
Multiples of 10: ${divFloor(200, 10)} → 20
→ 140 - 20 = 120 are multiples of 2 or 5

④ Neither:
200 - 120 = 80 ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Non-Multiples Count',
    topPercent: 10
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
      [
        String(tens * tens * 100 + 25),           // tens×tensを使うミス
        String((tens + 1) * (tens + 1) * 100 + 25), // (tens+1)²を使うミス
        String(answer - 100)                        // 惜しい計算ミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Trick for any number ending in 5:
tens digit × (tens digit + 1) → attach "25"

③ For ${n}²:
${tens} × ${tens + 1} = ${tens * (tens + 1)}
→ attach "25":

  ${tens * (tens + 1)} | 25
= ${answer} ✓`,
    genre: 'Squaring Numbers Ending in 5',
    topPercent: 15
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
      [
        String(10000 - da * 100 - db * 100),  // +da×dbを足し忘れるミス
        String(answer + 100),                   // 惜しいミス（大）
        String(answer - 100)                    // 惜しいミス（小）
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Use each number's distance from 100:
${p.a} = 100 - ${da}
${p.b} = 100 - ${db}

③ Formula: (100-a)(100-b) = 10000 - 100a - 100b + ab

④ Plug in:
10000 - (${da}×100) - (${db}×100) + (${da}×${db})
= 10000 - ${da * 100} - ${db * 100} + ${da * db}
= ${answer} ✓`,
    genre: 'Multiplying Near 100',
    topPercent: 15
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
      [
        String(n * 4),      // 25の代わりに4を掛けるミス
        String(n * 100),    // ÷4を忘れるミス
        String(answer + 25) // 惜しいミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Key insight: 25 = 100 ÷ 4

③ ${n} × 25
= ${n} × 100 ÷ 4
= ${n * 100} ÷ 4
= ${answer} ✓`,
    genre: 'Multiplying by 25',
    topPercent: 30
  }
}

// ジャンル28：100付近の2乗
function generateNear100Square(): ExpertQuestion {
  const nOptions = [91, 92, 93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 108, 109]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const diff = n - 100
  const answer = 10000 + 2 * diff * 100 + diff * diff
  const absDiff = Math.abs(diff)
  const sign = diff >= 0 ? '+' : '-'

  return {
    question: `What is ${n}²?`,
    choices: makeChoices(
      String(answer),
      [
        String(10000 + diff * diff),        // 200d部分を忘れるミス
        String(10000 + 2 * diff * 100),     // d²部分を忘れるミス
        String(answer + 100)                 // 惜しいミス
      ]
    ),
    answer: String(answer),
    explanation:
`① The answer is ${answer}.

② Use the number's distance from 100:
${n} = 100 ${sign} ${absDiff}

③ Formula: (100+d)² = 10000 + 200d + d²

④ Plug in (d = ${diff}):
10000 + 200×(${diff}) + (${diff})²
= 10000 ${sign} ${Math.abs(2 * diff * 100)} + ${diff * diff}
= ${answer} ✓`,
    genre: 'Squaring Near 100',
    topPercent: 15
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
      [
        String(p.center * p.center),  // 差の²を引き忘れるミス
        String(p.a * p.a),            // bの代わりにaを2回掛けるミス
        String(p.answer + p.diff)     // 惜しいミス
      ]
    ),
    answer: String(p.answer),
    explanation:
`① The answer is ${p.answer}.

② Formula: (a-b)(a+b) = a² - b²

③ ${p.a} and ${p.b} are symmetric around ${p.center}:
${p.a} = ${p.center} - ${p.diff}
${p.b} = ${p.center} + ${p.diff}

④ Plug in:
(${p.center}-${p.diff}) × (${p.center}+${p.diff})
= ${p.center}² - ${p.diff}²
= ${p.center * p.center} - ${p.diff * p.diff}
= ${p.answer} ✓`,
    genre: 'Symmetric Multiplication',
    topPercent: 10
  }
}

// ジャンル30：壁登りの到達日
function generateSnailClimb(): ExpertQuestion {
  const patterns: Array<{question: string, answer: string, wrongs: string[], explanation: string}> = []

  // パターン1：通常パターン
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
  const p1net = p1.up - p1.down
  const p1prevDay = p1.day - 1
  const p1prevHeight = p1prevDay * p1net - p1net + p1net
  // 前日終了時の高さ = (day-1-1) * net + net = (day-2) * net + net
  const p1endPrev = (p1.day - 2) * p1net + p1net
  patterns.push({
    question: `A snail is climbing a ${p1.wall} m wall.\nIt climbs ${p1.up} m during the day and slides ${p1.down} m at night.\nOn which day does it reach the top?`,
    answer: `Day ${p1.day}`,
    wrongs: [
      `Day ${p1.day - 1}`,
      `Day ${p1.day + 1}`,
      `Day ${p1.wall - p1.up}`
    ],
    explanation:
`① The answer is Day ${p1.day}.

② Net gain per day: ${p1.up} - ${p1.down} = ${p1net} m

③ Daily progress:
Day 1:        ${p1net} m
Day 2:        ${p1net * 2} m
...
Day ${p1prevDay}: ${(p1prevDay - 1) * p1net} m → slides back to ${(p1prevDay - 1) * p1net - p1.down + p1.up - p1.up} m

Wait — let's think carefully:
End of Day ${p1prevDay}: ${p1.wall - p1.up} m
Day ${p1.day}: ${p1.wall - p1.up} + ${p1.up} = ${p1.wall} m ✓
(reaches the top before sliding back!)`
  })

  // パターン2：逆算パターン
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
    wrongs: [
      `${p2.wall + 1} m`,
      `${p2.wall - 1} m`,
      `${p2.wall + p2.up} m`
    ],
    explanation:
`① The answer is ${p2.wall} m.

② Work backwards from Day ${p2.day}:
The snail reached the top on Day ${p2.day}, so on the morning of Day ${p2.day} it climbed ${p2.up} m to reach the top.

③ Height at end of Day ${p2.day - 1}:
Wall height - ${p2.up} m = ${p2.wall} - ${p2.up} = ${p2.wall - p2.up} m

④ Check: ${p2.wall - p2.up} m ÷ ${p2.up - p2.down} m/day = ${p2.day - 1} days
${p2.wall - p2.up} + ${p2.up} = ${p2.wall} m ✓`
  })

  // パターン3：合計時間パターン
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
    wrongs: [
      `${p3.total + p3.time} hours`,
      `${p3.total - p3.time} hours`,
      `${p3.wall * p3.time} hours`
    ],
    explanation:
`① The answer is ${p3.total} hours.

② The snail reaches the top on Day ${p3.day}:
Net gain: ${p3.up} - ${p3.down} = ${p3.up - p3.down} m/day
End of Day ${p3.day - 1}: ${p3.wall - p3.up} m
Day ${p3.day}: ${p3.wall - p3.up} + ${p3.up} = ${p3.wall} m ✓

③ It climbs ${p3.time} hours each day for ${p3.day} days:
${p3.day} × ${p3.time} = ${p3.total} hours ✓`
  })

// パターン4：2匹パターン（Snail 1が勝つケースも追加）
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
    explanation:
`① The answer is ${p4.winner}.

② Snail 1:
Net ${p4.up1 - p4.down1} m/day → End of Day ${p4.day1 - 1}: ${p4.wall - p4.up1} m
Day ${p4.day1}: ${p4.wall - p4.up1} + ${p4.up1} = ${p4.wall} m → Day ${p4.day1}

③ Snail 2:
Net ${p4.up2 - p4.down2} m/day → End of Day ${p4.day2 - 1}: ${p4.wall - p4.up2} m
Day ${p4.day2}: ${p4.wall - p4.up2} + ${p4.up2} = ${p4.wall} m → Day ${p4.day2}

④ Day ${p4.day1} vs Day ${p4.day2} → ${p4.winner} ✓`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Snail Climb',
    topPercent: 5
  }
}

// ジャンル31：リサイクル交換の最大数
function generateRecycle(): ExpertQuestion {
  const patterns = [
    {
      // 3本交換・9本スタート
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 9 bottles, what is the maximum you can drink?',
      answer: '13 bottles',
      wrongs: ['12 bottles', '14 bottles', '11 bottles'],
      explanation:
`① The answer is 13 bottles.

② Follow the exchanges:
Drink  9 → 9 empties → exchange for 3
Drink  3 → 3 empties → exchange for 1
Drink  1 → 1 empty   → can't exchange

③ Total:
9 + 3 + 1 = 13 bottles ✓`
    },
    {
      // 3本交換・12本スタート
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 12 bottles, what is the maximum you can drink?',
      answer: '17 bottles',
      wrongs: ['16 bottles', '18 bottles', '15 bottles'],
      explanation:
`① The answer is 17 bottles.

② Follow the exchanges:
Drink 12 → 12 empties → exchange for 4
Drink  4 → 4 empties  → exchange for 1 (2 left)
Drink  1 → 2 empties  → can't exchange

③ Total:
12 + 4 + 1 = 17 bottles ✓`
    },
    {
      // 3本交換・15本スタート（修正：21→22）
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 15 bottles, what is the maximum you can drink?',
      answer: '22 bottles',
      wrongs: ['21 bottles', '23 bottles', '18 bottles'],
      explanation:
`① The answer is 22 bottles.

② Follow the exchanges:
Drink 15 → 15 empties → exchange for 5
Drink  5 → 5 empties  → exchange for 1 (2 left)
Drink  1 → 2+1=3 empties → exchange for 1
Drink  1 → 1 empty    → can't exchange

③ Total:
15 + 5 + 1 + 1 = 22 bottles ✓`
    },
    {
      // 3本交換・18本スタート
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 18 bottles, what is the maximum you can drink?',
      answer: '26 bottles',
      wrongs: ['25 bottles', '27 bottles', '24 bottles'],
      explanation:
`① The answer is 26 bottles.

② Follow the exchanges:
Drink 18 → 18 empties → exchange for 6
Drink  6 → 6 empties  → exchange for 2
Drink  2 → 2 empties  → can't exchange

③ Total:
18 + 6 + 2 = 26 bottles ✓`
    },
    {
      // 3本交換・27本スタート
      question: 'Every 3 empty bottles can be exchanged for 1 full bottle.\nIf you start with 27 bottles, what is the maximum you can drink?',
      answer: '40 bottles',
      wrongs: ['39 bottles', '41 bottles', '36 bottles'],
      explanation:
`① The answer is 40 bottles.

② Follow the exchanges:
Drink 27 → 27 empties → exchange for 9
Drink  9 → 9 empties  → exchange for 3
Drink  3 → 3 empties  → exchange for 1
Drink  1 → 1 empty    → can't exchange

③ Total:
27 + 9 + 3 + 1 = 40 bottles ✓`
    },
    {
      // 4本交換・16本スタート
      question: 'Every 4 empty bottles can be exchanged for 1 full bottle.\nIf you start with 16 bottles, what is the maximum you can drink?',
      answer: '21 bottles',
      wrongs: ['20 bottles', '22 bottles', '18 bottles'],
      explanation:
`① The answer is 21 bottles.

② Follow the exchanges:
Drink 16 → 16 empties → exchange for 4
Drink  4 → 4 empties  → exchange for 1
Drink  1 → 1 empty    → can't exchange

③ Total:
16 + 4 + 1 = 21 bottles ✓`
    },
    {
      // 4本交換・20本スタート
      question: 'Every 4 empty bottles can be exchanged for 1 full bottle.\nIf you start with 20 bottles, what is the maximum you can drink?',
      answer: '26 bottles',
      wrongs: ['25 bottles', '27 bottles', '24 bottles'],
      explanation:
`① The answer is 26 bottles.

② Follow the exchanges:
Drink 20 → 20 empties → exchange for 5
Drink  5 → 5 empties  → exchange for 1 (1 left)
Drink  1 → 1+1=2 empties → can't exchange

③ Total:
20 + 5 + 1 = 26 bottles ✓`
    },
    {
      // 4本交換・24本スタート
      question: 'Every 4 empty bottles can be exchanged for 1 full bottle.\nIf you start with 24 bottles, what is the maximum you can drink?',
      answer: '31 bottles',
      wrongs: ['30 bottles', '32 bottles', '28 bottles'],
      explanation:
`① The answer is 31 bottles.

② Follow the exchanges:
Drink 24 → 24 empties → exchange for 6
Drink  6 → 6 empties  → exchange for 1 (2 left)
Drink  1 → 2+1=3 empties → can't exchange

③ Total:
24 + 6 + 1 = 31 bottles ✓`
    },
    {
      // 5本交換・25本スタート
      question: 'Every 5 empty bottles can be exchanged for 1 full bottle.\nIf you start with 25 bottles, what is the maximum you can drink?',
      answer: '31 bottles',
      wrongs: ['30 bottles', '32 bottles', '28 bottles'],
      explanation:
`① The answer is 31 bottles.

② Follow the exchanges:
Drink 25 → 25 empties → exchange for 5
Drink  5 → 5 empties  → exchange for 1
Drink  1 → 1 empty    → can't exchange

③ Total:
25 + 5 + 1 = 31 bottles ✓`
    },
    {
      // 5本交換・20本スタート
      question: 'Every 5 empty bottles can be exchanged for 1 full bottle.\nIf you start with 20 bottles, what is the maximum you can drink?',
      answer: '24 bottles',
      wrongs: ['23 bottles', '25 bottles', '20 bottles'],
      explanation:
`① The answer is 24 bottles.

② Follow the exchanges:
Drink 20 → 20 empties → exchange for 4
Drink  4 → 4 empties  → can't exchange (need 5)

③ Total:
20 + 4 = 24 bottles ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Bottle Recycling',
    topPercent: 10
  }
}

// ジャンル32：じゃんけんの確率
function generateRockPaperScissors(): ExpertQuestion {
  const patterns = [
    {
      // 3人・1人が勝つ確率
      question: 'Three people play rock-paper-scissors.\nWhat is the probability that one person wins outright?',
      answer: '1/3',
      wrongs: ['2/3', '1/9', '2/9'],
      explanation:
`① The answer is 1/3.

② Total combinations of throws:
3³ = 27

③ Combinations where one person wins outright:
Rock wins    → 3 possible winners (1st, 2nd, or 3rd)
Scissors wins → 3 possible winners
Paper wins   → 3 possible winners
→ 3 × 3 = 9

④ 9 ÷ 27 = 1/3 ✓`
    },
    {
      // 2人・1人が勝つ確率
      question: 'Two people play rock-paper-scissors.\nWhat is the probability that one person wins outright?',
      answer: '2/3',
      wrongs: ['1/3', '1/2', '2/9'],
      explanation:
`① The answer is 2/3.

② Total combinations of throws:
3² = 9

③ Combinations where one person wins:
Rock beats Scissors → Person 1 wins or Person 2 wins → 2 ways
Scissors beats Paper → 2 ways
Paper beats Rock    → 2 ways
→ 3 × 2 = 6

④ 6 ÷ 9 = 2/3 ✓`
    },
    {
      // 3人・引き分けの確率
      question: 'Three people play rock-paper-scissors.\nWhat is the probability of a draw?',
      answer: '2/3',
      wrongs: ['1/3', '1/9', '1/2'],
      explanation:
`① The answer is 2/3.

② Total combinations of throws:
3³ = 27

③ Combinations where one person wins outright:
Rock wins    → 3 possible winners (1st, 2nd, or 3rd)
Scissors wins → 3 possible winners
Paper wins   → 3 possible winners
→ 3 × 3 = 9

④ Draw = no outright winner:
1 - 9/27 = 1 - 1/3 = 2/3 ✓`
    },
    {
      // 2人・引き分けの確率
      question: 'Two people play rock-paper-scissors.\nWhat is the probability of a draw?',
      answer: '1/3',
      wrongs: ['2/3', '1/2', '1/9'],
      explanation:
`① The answer is 1/3.

② Total combinations of throws:
3² = 9

③ Combinations where one person wins:
Rock beats Scissors → Person 1 wins or Person 2 wins → 2 ways
Scissors beats Paper → 2 ways
Paper beats Rock    → 2 ways
→ 3 × 2 = 6

④ Draw = no outright winner:
1 - 6/9 = 1 - 2/3 = 1/3 ✓`
    },
    {
      // 3人・全員同じ手の確率
      question: 'Three people play rock-paper-scissors.\nWhat is the probability that all three throw the same sign?',
      answer: '1/9',
      wrongs: ['1/3', '1/27', '2/9'],
      explanation:
`① The answer is 1/9.

② Total combinations of throws:
3³ = 27

③ Combinations where all three throw the same:
All Rock     → 1 way
All Scissors → 1 way
All Paper    → 1 way
→ 3 ways

④ 3 ÷ 27 = 1/9 ✓`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'Rock-Paper-Scissors Probability',
    topPercent: 15
  }
}

const generators = [
  generateGauss,
  generateTournament,
  generateHandshake,
  generateDoubling,
  generateTimes11,
  generateComplementProbability,
  generateDiagonals,              // generateExponentSplitから変更
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

export function generateExpertQuestion(genreIndex?: number): ExpertQuestion {
  const index = genreIndex !== undefined
    ? genreIndex % generators.length
    : randInt(0, generators.length - 1)
  return generators[index]()
}