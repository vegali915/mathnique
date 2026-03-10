// Expert Mode 問題自動生成ロジック

export type ExpertQuestion = {
  question: string
  choices: string[]
  answer: string
  explanation: string
  genre: string
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
    explanation: `① 答えは ${answer} です。\n\n② なぜ？\n端から順にペアを作ると\n「1 + ${n}」「2 + ${n - 1}」「3 + ${n - 2}」…\nどのペアも合計が ${n + 1} になります！\n\n③ ペアの数は ${n} ÷ 2 = ${n / 2} 組\n${n + 1} × ${n / 2} = ${answer}`,
    genre: 'ガウスの足し算'
  }
}

// ジャンル2：トーナメントの試合数
function generateTournament(): ExpertQuestion {
  const settings = ['スポーツ大会', 'ゲーム大会', '料理大会', 'クイズ大会']
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(8, 100)
  const answer = n - 1

  return {
    question: `${n}人参加の${setting}。\nトーナメント形式で優勝者を1人決めると、全部で何試合？`,
    choices: makeChoices(
      String(answer),
      [String(answer - 1), String(answer + 1), String(Math.floor(n / 2))]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} 試合です。\n\n② なぜ？\nトーナメントでは1試合で必ず1人が脱落します。\n\n③ ${n}人の大会で最後に優勝者が1人残るので\n脱落する人数 = ${n} - 1 = ${answer}人\n\n④ 脱落者1人につき1試合なので\n試合数 = ${answer}試合！\nトーナメントの人数がいくつでもこの法則は成り立ちます。`,
    genre: 'トーナメントの試合数'
  }
}

// ジャンル3：握手・乾杯の総数
function generateHandshake(): ExpertQuestion {
  const settings = [
    { scene: 'パーティー', action: '握手' },
    { scene: '飲み会', action: '乾杯' },
    { scene: 'スポーツ大会', action: 'ハイタッチ' },
    { scene: '会議', action: '挨拶' },
  ]
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(5, 20)
  const answer = (n * (n - 1)) / 2

  return {
    question: `${n}人が参加した${setting.scene}。\n全員が互いに1回ずつ${setting.action}すると、合計何回？`,
    choices: makeChoices(
      String(answer),
      [String(n * (n - 1)), String(answer + n), String(answer - n)]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} 回です。\n\n② なぜ？\n${n}人それぞれが残り${n - 1}人と${setting.action}するので\n${n} × ${n - 1} = ${n * (n - 1)} …でも！\n\n③ これだと「AとBの${setting.action}」を\nAからもBからも数えてしまっています。\n2回ずつ数えているので最後に2で割ります。\n\n④ ${n * (n - 1)} ÷ 2 = ${answer}回`,
    genre: '握手・乾杯の総数'
  }
}

// ジャンル4：倍増系
function generateDoubling(): ExpertQuestion {
  const settings = [
    { subject: 'バクテリア', unit: '分', container: '瓶' },
    { subject: 'スイレン', unit: '日', container: '池' },
    { subject: '藻', unit: '時間', container: 'タンク' },
    { subject: '菌', unit: '分', container: 'シャーレ' },
  ]
  const setting = settings[randInt(0, settings.length - 1)]

  const questionTypes = [
    () => {
      const n = randInt(10, 60)
      const answer = n - 1
      return {
        question: `${setting.subject}が毎${setting.unit}2倍に増え続ける。\n${n}${setting.unit}後に${setting.container}が満杯になるとき、半分だったのは何${setting.unit}後？`,
        answer: String(answer),
        wrongs: [String(Math.floor(n / 2)), String(n - 2), String(n + 1)],
        explanation: `① 答えは ${answer}${setting.unit}後です。\n\n② なぜ？\n毎${setting.unit}2倍に増えるということは\n逆に言うと「1${setting.unit}前は今の半分」です。\n\n③ ${n}${setting.unit}後に満杯になるなら\nその1${setting.unit}前 = ${n - 1}${setting.unit}後は半分！\n\n④ 直感では「半分なら${Math.floor(n / 2)}${setting.unit}」と思いがちですが\n倍増では最後の1${setting.unit}で一気に2倍になります。`
      }
    },
    () => {
      const n = randInt(10, 60)
      return {
        question: `${setting.subject}が毎${setting.unit}2倍に増え続ける。\n${n}${setting.unit}後に${setting.container}が満杯になるとき、${n - 2}${setting.unit}後は何%埋まっている？`,
        answer: '25%',
        wrongs: ['50%', '75%', '12.5%'],
        explanation: `① 答えは 25% です。\n\n② なぜ？\n${n}${setting.unit}後が100%（満杯）なら\n1${setting.unit}前の${n - 1}${setting.unit}後は 50%（半分）\nさらに1${setting.unit}前の${n - 2}${setting.unit}後は 25%（4分の1）\n\n③ 2${setting.unit}前 = 満杯の4分の1 = 25%\n\n④ 倍増では時間が経つほど急激に増えます。\nほとんどの増加が最後の数${setting.unit}に集中しています！`
      }
    }
  ]

  const qt = questionTypes[randInt(0, questionTypes.length - 1)]()

  return {
    question: qt.question,
    choices: makeChoices(qt.answer, qt.wrongs),
    answer: qt.answer,
    explanation: qt.explanation,
    genre: '倍増系'
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
    explanation: `① 答えは ${answer} です。\n\n② 11との掛け算には裏ワザがあります！\n${n}の十の位は「${tens}」、一の位は「${ones}」\n\n③ 裏ワザ：両端の数字の間に\nその2つの和を挟み込む！\n${tens}・（${tens}+${ones}）・${ones}\n= ${tens}・${mid}・${ones}${mid >= 10 ? '\n\n④ 真ん中が10以上になったら繰り上がりに注意！' : `\n\n④ 並べると ${answer} になります！`}`,
    genre: '11との掛け算'
  }
}

// ジャンル6：余事象の確率
function generateComplementProbability(): ExpertQuestion {
  const patterns = [
    {
      question: '3枚のコインを同時に投げるとき、\n少なくとも1枚が表になる確率は？',
      answer: '7/8',
      wrongs: ['1/2', '3/4', '6/8'],
      explanation: `① 答えは 7/8 です。\n\n② 「少なくとも1枚表」を直接計算するのは大変！\n\n③ 余事象（反対のこと）を考えます。\n「1枚も表が出ない」= 全部裏\nその確率は (1/2)³ = 1/8\n\n④ 求める確率 = 1 - 1/8 = 7/8`
    },
    {
      question: '2つのサイコロを同時に振るとき、\n少なくとも1つが6になる確率は？',
      answer: '11/36',
      wrongs: ['1/6', '1/3', '2/6'],
      explanation: `① 答えは 11/36 です。\n\n② 余事象を使います。\n「1つも6が出ない」確率は\n(5/6) × (5/6) = 25/36\n\n③ 求める確率 = 1 - 25/36 = 11/36`
    },
    {
      question: '4枚のコインを同時に投げるとき、\n少なくとも1枚が表になる確率は？',
      answer: '15/16',
      wrongs: ['1/2', '3/4', '7/8'],
      explanation: `① 答えは 15/16 です。\n\n② 余事象を使います。\n「1枚も表が出ない」= 全部裏\nその確率は (1/2)⁴ = 1/16\n\n③ 求める確率 = 1 - 1/16 = 15/16`
    },
    {
      question: '5枚のコインを同時に投げるとき、\n少なくとも1枚が表になる確率は？',
      answer: '31/32',
      wrongs: ['15/16', '7/8', '1/2'],
      explanation: `① 答えは 31/32 です。\n\n② 余事象を使います。\n「1枚も表が出ない」= 全部裏\nその確率は (1/2)⁵ = 1/32\n\n③ 求める確率 = 1 - 1/32 = 31/32`
    },
    {
      question: '3つのサイコロを同時に振るとき、\n少なくとも1つが6になる確率は？',
      answer: '91/216',
      wrongs: ['1/6', '1/2', '125/216'],
      explanation: `① 答えは 91/216 です。\n\n② 余事象を使います。\n「1つも6が出ない」確率は\n(5/6)³ = 125/216\n\n③ 求める確率 = 1 - 125/216 = 91/216`
    },
    {
      question: '2つのサイコロを同時に振るとき、\n少なくとも1つが偶数になる確率は？',
      answer: '3/4',
      wrongs: ['1/2', '1/4', '2/3'],
      explanation: `① 答えは 3/4 です。\n\n② 余事象を使います。\n「1つも偶数が出ない」= 両方奇数\n奇数は1,3,5の3つなので\n(3/6)² = (1/2)² = 1/4\n\n③ 求める確率 = 1 - 1/4 = 3/4`
    },
    {
      question: '2人でじゃんけんをするとき、\n少なくとも1人がグーを出す確率は？',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],
      explanation: `① 答えは 5/9 です。\n\n② 余事象を使います。\n「1人もグーを出さない」確率は\n(2/3)² = 4/9\n\n③ 求める確率 = 1 - 4/9 = 5/9`
    },
    {
      question: '2人でじゃんけんをするとき、\n少なくとも1人がチョキを出す確率は？',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],
      explanation: `① 答えは 5/9 です。\n\n② 余事象を使います。\n「1人もチョキを出さない」確率は\n(2/3)² = 4/9\n\n③ 求める確率 = 1 - 4/9 = 5/9`
    },
    {
      question: '2人でじゃんけんをするとき、\n少なくとも1人がパーを出す確率は？',
      answer: '5/9',
      wrongs: ['1/3', '2/3', '4/9'],
      explanation: `① 答えは 5/9 です。\n\n② 余事象を使います。\n「1人もパーを出さない」確率は\n(2/3)² = 4/9\n\n③ 求める確率 = 1 - 4/9 = 5/9`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '余事象の確率'
  }
}

// ジャンル7：指数の分割計算
function generateExponentSplit(): ExpertQuestion {
  const patterns = [
    {
      question: '2の10乗はいくつ？',
      answer: '1024',
      wrongs: ['512', '2048', '768'],
      explanation: `① 答えは 1024 です。\n\n② 10乗を半分に分割します。\n2¹⁰ = 2⁵ × 2⁵\n\n③ 2⁵ = 32なので\n32 × 32 = 1024！`
    },
    {
      question: '2の8乗はいくつ？',
      answer: '256',
      wrongs: ['128', '512', '64'],
      explanation: `① 答えは 256 です。\n\n② 8乗を半分に分割します。\n2⁸ = 2⁴ × 2⁴\n\n③ 2⁴ = 16なので\n16 × 16 = 256！`
    },
    {
      question: '3の4乗はいくつ？',
      answer: '81',
      wrongs: ['64', '27', '12'],
      explanation: `① 答えは 81 です。\n\n② 4乗を半分に分割します。\n3⁴ = 3² × 3²\n\n③ 3² = 9なので\n9 × 9 = 81！`
    },
    {
      question: '2の12乗はいくつ？',
      answer: '4096',
      wrongs: ['2048', '8192', '1024'],
      explanation: `① 答えは 4096 です。\n\n② 12乗を半分に分割します。\n2¹² = 2⁶ × 2⁶\n\n③ 2⁶ = 64なので\n64 × 64 = 4096！`
    },
    {
      question: '3の6乗はいくつ？',
      answer: '729',
      wrongs: ['512', '648', '810'],
      explanation: `① 答えは 729 です。\n\n② 6乗を半分に分割します。\n3⁶ = 3³ × 3³\n\n③ 3³ = 27なので\n27 × 27 = 729！`
    },
    {
      question: '4の4乗はいくつ？',
      answer: '256',
      wrongs: ['128', '512', '64'],
      explanation: `① 答えは 256 です。\n\n② 4乗を半分に分割します。\n4⁴ = 4² × 4²\n\n③ 4² = 16なので\n16 × 16 = 256！`
    },
    {
      question: '5の4乗はいくつ？',
      answer: '625',
      wrongs: ['500', '525', '650'],
      explanation: `① 答えは 625 です。\n\n② 4乗を半分に分割します。\n5⁴ = 5² × 5²\n\n③ 5² = 25なので\n25 × 25 = 625！`
    },
    {
      question: '2の6乗はいくつ？',
      answer: '64',
      wrongs: ['32', '128', '48'],
      explanation: `① 答えは 64 です。\n\n② 6乗を半分に分割します。\n2⁶ = 2³ × 2³\n\n③ 2³ = 8なので\n8 × 8 = 64！`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '指数の分割計算'
  }
}

// ジャンル8：奇数の和の法則
function generateOddSum(): ExpertQuestion {
  const nOptions = [3, 4, 5, 6, 7, 8, 9, 10]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = n * n
  const sequence = Array.from({length: n}, (_, i) => 2 * i + 1).join(' + ')

  return {
    question: `1から始まる奇数を${n}個足すと？\n1 + 3 + 5 + … = ?`,
    choices: makeChoices(
      String(answer),
      [String(answer - 1), String(answer + 1), String(answer - n)]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} です。\n\n② 実は「1から始まる奇数をn個足すとn²」という法則があります！\n\n③ ${n}個足すと ${n}² = ${answer}\n\n④ 実際に確認すると：\n${sequence} = ${answer}\nどんな数でもこの法則は成り立ちます！`,
    genre: '奇数の和の法則'
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
      question: '4人が1列に並ぶとき、\nAとBが隣り合う並び方は何通り？',
      answer: '12通り',
      wrongs: ['24通り', '6通り', '48通り'],
      explanation: `① 答えは 12通りです。\n\n② AとBを「1人のセット」として考えます。\nセットを含む3人の並び方は\n3! = 6通り\n\n③ さらにセット内でAとBが入れ替わるので\n× 2 = 12通り！`
    },
    {
      question: '5人が1列に並ぶとき、\nAとBが隣り合う並び方は何通り？',
      answer: '48通り',
      wrongs: ['120通り', '24通り', '96通り'],
      explanation: `① 答えは 48通りです。\n\n② AとBを「1人のセット」として考えます。\nセットを含む4人の並び方は\n4! = 24通り\n\n③ さらにセット内でAとBが入れ替わるので\n× 2 = 48通り！`
    },
    {
      question: '6人が1列に並ぶとき、\nAとBが隣り合う並び方は何通り？',
      answer: '240通り',
      wrongs: ['720通り', '120通り', '480通り'],
      explanation: `① 答えは 240通りです。\n\n② AとBを「1人のセット」として考えます。\nセットを含む5人の並び方は\n5! = 120通り\n\n③ さらにセット内でAとBが入れ替わるので\n× 2 = 240通り！`
    },
    // A・B・Cが全員隣り合う
    {
      question: '5人が1列に並ぶとき、\nA・B・Cが全員隣り合う並び方は何通り？',
      answer: '36通り',
      wrongs: ['12通り', '24通り', '48通り'],
      explanation: `① 答えは 36通りです。\n\n② A・B・Cを「1つのセット」として考えます。\nセットを含む3人の並び方は\n3! = 6通り\n\n③ さらにセット内でA・B・Cが\n入れ替わるので 3! = 6通り\n\n④ 6 × 6 = 36通り！`
    },
    {
      question: '6人が1列に並ぶとき、\nA・B・Cが全員隣り合う並び方は何通り？',
      answer: '144通り',
      wrongs: ['72通り', '36通り', '288通り'],
      explanation: `① 答えは 144通りです。\n\n② A・B・Cを「1つのセット」として考えます。\nセットを含む4人の並び方は\n4! = 24通り\n\n③ さらにセット内でA・B・Cが\n入れ替わるので 3! = 6通り\n\n④ 24 × 6 = 144通り！`
    },
    // 円形
    {
      question: '4人が円形に並ぶとき、\nAとBが隣り合う並び方は何通り？',
      answer: '4通り',
      wrongs: ['6通り', '8通り', '12通り'],
      explanation: `① 答えは 4通りです。\n\n② 円形の並び方はAを固定して考えます。\n残り3人の並び方は 3! = 6通り\n\n③ BがAの隣になる確率は\n残り3席のうち2席なので 2/3\n\n④ 6 × 2/3 = 4通り！`
    },
    {
      question: '5人が円形に並ぶとき、\nAとBが隣り合う並び方は何通り？',
      answer: '12通り',
      wrongs: ['24通り', '6通り', '48通り'],
      explanation: `① 答えは 12通りです。\n\n② 円形の並び方はAを固定して考えます。\n残り4人の並び方は 4! = 24通り\n\n③ BがAの隣になる確率は\n残り4席のうち2席なので 2/4\n\n④ 24 × 2/4 = 12通り！`
    },
    {
      question: '6人が円形に並ぶとき、\nAとBが隣り合う並び方は何通り？',
      answer: '48通り',
      wrongs: ['120通り', '24通り', '96通り'],
      explanation: `① 答えは 48通りです。\n\n② 円形の並び方はAを固定して考えます。\n残り5人の並び方は 5! = 120通り\n\n③ BがAの隣になる確率は\n残り5席のうち2席なので 2/5\n\n④ 120 × 2/5 = 48通り！`
    },
    // AとBが隣り合わない
    {
      question: '4人が1列に並ぶとき、\nAとBが隣り合わない並び方は何通り？',
      answer: '12通り',
      wrongs: ['6通り', '18通り', '24通り'],
      explanation: `① 答えは 12通りです。\n\n② 全体の並び方：4! = 24通り\n\n③ AとBが隣り合う並び方：\n3! × 2 = 12通り\n\n④ 隣り合わない = 全体 - 隣り合う\n24 - 12 = 12通り！`
    },
    {
      question: '5人が1列に並ぶとき、\nAとBが隣り合わない並び方は何通り？',
      answer: '72通り',
      wrongs: ['48通り', '60通り', '96通り'],
      explanation: `① 答えは 72通りです。\n\n② 全体の並び方：5! = 120通り\n\n③ AとBが隣り合う並び方：\n4! × 2 = 48通り\n\n④ 隣り合わない = 全体 - 隣り合う\n120 - 48 = 72通り！`
    },
    // 男女交互
    {
      question: '男子2人・女子2人が1列に並ぶとき、\n男女交互になる並び方は何通り？',
      answer: '8通り',
      wrongs: ['4通り', '12通り', '24通り'],
      explanation: `① 答えは 8通りです。\n\n② 男女交互の並び方は\n「男女男女」か「女男女男」の2パターン\n\n③ 男子2人の並び方：2! = 2通り\n女子2人の並び方：2! = 2通り\n\n④ 2 × 2 × 2 = 8通り！`
    },
    {
      question: '男子3人・女子3人が1列に並ぶとき、\n男女交互になる並び方は何通り？',
      answer: '72通り',
      wrongs: ['36通り', '48通り', '144通り'],
      explanation: `① 答えは 72通りです。\n\n② 男女交互の並び方は\n「男女男女男女」か「女男女男女男」の2パターン\n\n③ 男子3人の並び方：3! = 6通り\n女子3人の並び方：3! = 6通り\n\n④ 2 × 6 × 6 = 72通り！`
    },
  ]

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '隣り合う順列'
  }
}

// ジャンル10：数字の登場回数
function generateDigitCount(): ExpertQuestion {
  const patterns = [
    {
      question: '1から100までの数字を全部書いたとき、\n「1」は何回登場する？',
      answer: '21回',
      wrongs: ['20回', '11回', '10回'],
      explanation: `① 答えは 21回です。\n\n② 一の位に「1」が出る数：\n1, 11, 21, 31, 41, 51, 61, 71, 81, 91 → 10回\n\n③ 十の位に「1」が出る数：\n10, 11, 12, 13, 14, 15, 16, 17, 18, 19 → 10回\n\n④ 100の百の位に「1」が1回\n合計 10 + 10 + 1 = 21回！`
    },
    {
      question: '1から50までの数字を全部書いたとき、\n「3」は何回登場する？',
      answer: '15回',
      wrongs: ['5回', '14回', '10回'],
      explanation: `① 答えは 15回です。\n\n② 一の位に「3」が出る数：\n3, 13, 23, 33, 43 → 5回\n\n③ 十の位に「3」が出る数：\n30, 31, 32, 33, 34, 35, 36, 37, 38, 39 → 10回\n\n④ 合計 5 + 10 = 15回！\n33は一の位・十の位どちらにも「3」があるので2回カウントします。`
    },
    {
      question: '1から100までの数字を全部書いたとき、\n「7」は何回登場する？',
      answer: '20回',
      wrongs: ['10回', '19回', '21回'],
      explanation: `① 答えは 20回です。\n\n② 一の位に「7」が出る数：\n7, 17, 27, 37, 47, 57, 67, 77, 87, 97 → 10回\n\n③ 十の位に「7」が出る数：\n70, 71, 72, 73, 74, 75, 76, 77, 78, 79 → 10回\n\n④ 合計 10 + 10 = 20回！\n77は一の位・十の位どちらにも「7」があるので2回カウント済み`
    },
    {
      question: '1から200までの数字を全部書いたとき、\n「1」は何回登場する？',
      answer: '140回',
      wrongs: ['120回', '100回', '21回'],
      explanation: `① 答えは 140回です。\n\n② 一の位に「1」が出る数：\n1, 11, 21…191 → 20回\n\n③ 十の位に「1」が出る数：\n10～19, 110～119 → 20回\n\n④ 百の位に「1」が出る数：\n100～199 → 100回\n\n合計 20 + 20 + 100 = 140回！`
    },
    {
      question: '1から99までの数字を全部書いたとき、\n「5」は何回登場する？',
      answer: '20回',
      wrongs: ['10回', '19回', '15回'],
      explanation: `① 答えは 20回です。\n\n② 一の位に「5」が出る数：\n5, 15, 25, 35, 45, 55, 65, 75, 85, 95 → 10回\n\n③ 十の位に「5」が出る数：\n50, 51, 52, 53, 54, 55, 56, 57, 58, 59 → 10回\n\n④ 合計 10 + 10 = 20回！`
    },
    {
      question: '1から30までの数字を全部書いたとき、\n「2」は何回登場する？',
      answer: '13回',
      wrongs: ['3回', '10回', '12回'],
      explanation: `① 答えは 13回です。\n\n② 一の位に「2」が出る数：\n2, 12, 22 → 3回\n\n③ 十の位に「2」が出る数：\n20, 21, 22, 23, 24, 25, 26, 27, 28, 29 → 10回\n\n④ 合計 3 + 10 = 13回！\n22は一の位・十の位どちらにも「2」があるので2回カウント済み`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '数字の登場回数'
  }
}

// ジャンル11：無限等比級数
function generateInfiniteGeometric(): ExpertQuestion {
  const patterns = [
    {
      question: '0.999…（9が無限に続く）は\nいくつ？',
      answer: '1',
      wrongs: ['0.999', '0.9999', '1以下'],
      explanation: `① 答えは 1 です。\n\n② 直感では「1より少し小さい」と感じますが\n実は完全に1と等しいです！\n\n③ x = 0.999… とおくと\n10x = 9.999…\n10x - x = 9.999… - 0.999…\n9x = 9\nx = 1\n\n④ 0.999…と1は全く同じ数です！`
    },
    {
      question: '1/2 + 1/4 + 1/8 + 1/16 + …\n無限に足し続けるといくつ？',
      answer: '1',
      wrongs: ['1/2', '2', '∞'],
      explanation: `① 答えは 1 です。\n\n② 無限に足し続けても1を超えません。\n\n③ S = 1/2 + 1/4 + 1/8 + …とおくと\n2S = 1 + 1/2 + 1/4 + …\n2S = 1 + S\nS = 1\n\n④ 半分ずつ足していくと\n最終的にぴったり1になります！`
    },
    {
      question: '1/3 + 1/9 + 1/27 + …\n無限に足し続けるといくつ？',
      answer: '1/2',
      wrongs: ['1/3', '1', '2/3'],
      explanation: `① 答えは 1/2 です。\n\n② S = 1/3 + 1/9 + 1/27 + …とおくと\n3S = 1 + 1/3 + 1/9 + …\n3S = 1 + S\n2S = 1\nS = 1/2`
    },
    {
      question: '1/4 + 1/16 + 1/64 + …\n無限に足し続けるといくつ？',
      answer: '1/3',
      wrongs: ['1/4', '1/2', '2/3'],
      explanation: `① 答えは 1/3 です。\n\n② S = 1/4 + 1/16 + 1/64 + …とおくと\n4S = 1 + 1/4 + 1/16 + …\n4S = 1 + S\n3S = 1\nS = 1/3`
    },
    {
      question: '0.333…（3が無限に続く）は\nいくつ？',
      answer: '1/3',
      wrongs: ['0.333', '1/4', '0.3'],
      explanation: `① 答えは 1/3 です。\n\n② x = 0.333…とおくと\n10x = 3.333…\n10x - x = 3.333… - 0.333…\n9x = 3\nx = 3/9 = 1/3`
    },
    {
      question: '0.111…（1が無限に続く）は\nいくつ？',
      answer: '1/9',
      wrongs: ['0.111', '1/10', '1/8'],
      explanation: `① 答えは 1/9 です。\n\n② x = 0.111…とおくと\n10x = 1.111…\n10x - x = 1.111… - 0.111…\n9x = 1\nx = 1/9`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '無限等比級数'
  }
}

// ジャンル12：組み合わせの総数
function generateCombinationTotal(): ExpertQuestion {
  const settings = [
    { scene: 'ピザのトッピングが5種類ある。', n: 5 },
    { scene: 'アイスのフレーバーが4種類ある。', n: 4 },
    { scene: 'Tシャツの色が6種類ある。', n: 6 },
    { scene: 'ハンバーガーのトッピングが4種類ある。', n: 4 },
    { scene: 'サラダのトッピングが5種類ある。', n: 5 },
    { scene: 'ラーメンのトッピングが6種類ある。', n: 6 },
  ]
  const setting = settings[randInt(0, settings.length - 1)]
  const answer = Math.pow(2, setting.n) - 1

  return {
    question: `${setting.scene}\n1種類以上選ぶとしたら、選び方は何通り？`,
    choices: makeChoices(
      String(answer),
      [String(answer + 1), String(Math.pow(2, setting.n)), String(answer - 1)]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} 通りです。\n\n② 各種類について「選ぶ・選ばない」の2択があります。\n\n③ ${setting.n}種類全部で 2の${setting.n}乗 = ${Math.pow(2, setting.n)} 通り\nただし「全部選ばない」の1通りを除くので\n${Math.pow(2, setting.n)} - 1 = ${answer} 通り！`,
    genre: '組み合わせの総数'
  }
}

// ジャンル13：リーグ戦の試合数
function generateLeague(): ExpertQuestion {
  const settings = ['サッカーリーグ', 'バスケットボールリーグ', '野球リーグ', 'テニスリーグ']
  const setting = settings[randInt(0, settings.length - 1)]
  const n = randInt(4, 12)
  const answer = (n * (n - 1)) / 2

  return {
    question: `${n}チームが参加する${setting}。\n全チームが1回ずつ対戦すると、全部で何試合？`,
    choices: makeChoices(
      String(answer),
      [String(n * (n - 1)), String(answer + n), String(answer - 1)]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} 試合です。\n\n② ${n}チームそれぞれが残り${n - 1}チームと対戦するので\n${n} × ${n - 1} = ${n * (n - 1)} …でも！\n\n③ 「AチームvsBチーム」と「BチームvsAチーム」を\n2回数えてしまっているので÷2します。\n\n④ ${n * (n - 1)} ÷ 2 = ${answer} 試合！`,
    genre: 'リーグ戦の試合数'
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
  const vehicles = ['車', '自転車', 'バイク', '電車']
  const p = patterns[randInt(0, patterns.length - 1)]
  const vehicle = vehicles[randInt(0, vehicles.length - 1)]

  return {
    question: `${vehicle}で往復した。行きは時速${p.go}km、帰りは時速${p.back}km。\n平均時速は？`,
    choices: makeChoices(
      `時速${p.avg}km`,
      [`時速${Math.round((p.go + p.back) / 2)}km`, `時速${p.avg + 4}km`, `時速${p.avg - 4}km`]
    ),
    answer: `時速${p.avg}km`,
    explanation: `① 答えは 時速${p.avg}km です。\n\n② 直感では「(${p.go}+${p.back})÷2=${Math.round((p.go + p.back) / 2)}km」と思いがちですが\n単純に平均を取ってはいけません！\n\n③ 距離を仮に${p.dist}kmとおくと\n行きにかかる時間：${p.dist}÷${p.go} = ${p.dist / p.go}時間\n帰りにかかる時間：${p.dist}÷${p.back} = ${p.dist / p.back}時間\n\n④ 平均時速 = 合計距離 ÷ 合計時間\n= ${p.dist * 2} ÷ ${p.dist / p.go + p.dist / p.back} = 時速${p.avg}km`,
    genre: '往復の速さ'
  }
}

// ジャンル15：乾杯回数から人数の逆算
function generateReverseHandshake(): ExpertQuestion {
  const counts = [6, 10, 15, 21, 28, 36, 45]
  const count = counts[randInt(0, counts.length - 1)]
  const n = Math.round((1 + Math.sqrt(1 + 8 * count)) / 2)
  const scenes = ['パーティー', '会議', '結婚式', 'チームの集まり']
  const scene = scenes[randInt(0, scenes.length - 1)]

  return {
    question: `${scene}で全員が1回ずつ乾杯した。\n合計${count}回だったとき、何人いた？`,
    choices: makeChoices(
      String(n),
      [String(n - 1), String(n + 1), String(n + 2)]
    ),
    answer: String(n),
    explanation: `① 答えは ${n} 人です。\n\n② n人が全員と1回ずつ乾杯すると\nn × (n-1) ÷ 2 = 回数\nという式が成り立ちます。\n\n③ ${count}回だったので\nn × (n-1) ÷ 2 = ${count}\nn × (n-1) = ${count * 2}\n\n④ ${n} × ${n - 1} = ${count * 2}なので\nn = ${n}人！`,
    genre: '乾杯回数から人数の逆算'
  }
}



// ジャンル16：レンガの重さ
function generateBrickWeight(): ExpertQuestion {
  const nOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const answer = n * 2

  return {
    question: `あるレンガの重さは\n${n}kg + そのレンガの重さの半分。\nレンガは何kg？`,
    choices: makeChoices(
      `${answer}kg`,
      [`${answer + 1}kg`, `${answer - 1}kg`, `${answer + 2}kg`]
    ),
    answer: `${answer}kg`,
    explanation: `① 答えは ${answer}kg です。\n\n② レンガの重さをxとおくと\nx = ${n} + x/2\n\n③ 両辺からx/2を引くと\nx - x/2 = ${n}\nx/2 = ${n}\n\n④ 両辺を2倍すると\nx = ${answer}kg！`,
    genre: 'レンガの重さ'
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
      explanation: `① 答えは 22 です。\n\n② 差を見てみると\n1→2：+1\n2→4：+2\n4→7：+3\n7→11：+4\n11→16：+5\n\n③ 差が1ずつ増えているので\n16→?：+6\n16 + 6 = 22！`
    },
    {
      sequence: '1, 3, 6, 10, 15, 21, ?',
      answer: '28',
      wrongs: ['25', '26', '27'],
      explanation: `① 答えは 28 です。\n\n② 差を見てみると\n1→3：+2\n3→6：+3\n6→10：+4\n10→15：+5\n15→21：+6\n\n③ 差が1ずつ増えているので\n21→?：+7\n21 + 7 = 28！`
    },
    {
      sequence: '2, 3, 5, 8, 12, 17, ?',
      answer: '23',
      wrongs: ['21', '22', '24'],
      explanation: `① 答えは 23 です。\n\n② 差を見てみると\n2→3：+1\n3→5：+2\n5→8：+3\n8→12：+4\n12→17：+5\n\n③ 差が1ずつ増えているので\n17→?：+6\n17 + 6 = 23！`
    },
    // 差が2ずつ増える
    {
      sequence: '1, 3, 7, 13, 21, 31, ?',
      answer: '43',
      wrongs: ['40', '41', '42'],
      explanation: `① 答えは 43 です。\n\n② 差を見てみると\n1→3：+2\n3→7：+4\n7→13：+6\n13→21：+8\n21→31：+10\n\n③ 差が2ずつ増えているので\n31→?：+12\n31 + 12 = 43！`
    },
    {
      sequence: '2, 4, 8, 14, 22, 32, ?',
      answer: '44',
      wrongs: ['41', '42', '43'],
      explanation: `① 答えは 44 です。\n\n② 差を見てみると\n2→4：+2\n4→8：+4\n8→14：+6\n14→22：+8\n22→32：+10\n\n③ 差が2ずつ増えているので\n32→?：+12\n32 + 12 = 44！`
    },
    // フィボナッチ系
    {
      sequence: '1, 1, 2, 3, 5, 8, ?',
      answer: '13',
      wrongs: ['11', '12', '14'],
      explanation: `① 答えは 13 です。\n\n② 前の2つを足すと次の数になります。\n1+1=2\n1+2=3\n2+3=5\n3+5=8\n\n③ 5+8=13！\nこれはフィボナッチ数列と呼ばれます。`
    },
    {
      sequence: '1, 2, 3, 5, 8, 13, ?',
      answer: '21',
      wrongs: ['18', '19', '20'],
      explanation: `① 答えは 21 です。\n\n② 前の2つを足すと次の数になります。\n1+2=3\n2+3=5\n3+5=8\n5+8=13\n\n③ 8+13=21！\nこれはフィボナッチ数列と呼ばれます。`
    },
    // 掛け算系
    {
      sequence: '2, 6, 18, 54, ?',
      answer: '162',
      wrongs: ['108', '144', '180'],
      explanation: `① 答えは 162 です。\n\n② 前の数に3をかけると次の数になります。\n2×3=6\n6×3=18\n18×3=54\n\n③ 54×3=162！`
    },
    {
      sequence: '3, 6, 12, 24, 48, ?',
      answer: '96',
      wrongs: ['72', '84', '108'],
      explanation: `① 答えは 96 です。\n\n② 前の数に2をかけると次の数になります。\n3×2=6\n6×2=12\n12×2=24\n24×2=48\n\n③ 48×2=96！`
    },
    {
      sequence: '5, 15, 45, 135, ?',
      answer: '405',
      wrongs: ['270', '350', '450'],
      explanation: `① 答えは 405 です。\n\n② 前の数に3をかけると次の数になります。\n5×3=15\n15×3=45\n45×3=135\n\n③ 135×3=405！`
    },
    // 2乗系
    {
      sequence: '1, 4, 9, 16, 25, ?',
      answer: '36',
      wrongs: ['30', '32', '34'],
      explanation: `① 答えは 36 です。\n\n② それぞれの数は自然数の2乗です。\n1²=1\n2²=4\n3²=9\n4²=16\n5²=25\n\n③ 6²=36！`
    },
    {
      sequence: '2, 5, 10, 17, 26, ?',
      answer: '37',
      wrongs: ['33', '35', '39'],
      explanation: `① 答えは 37 です。\n\n② それぞれの数は自然数の2乗+1です。\n1²+1=2\n2²+1=5\n3²+1=10\n4²+1=17\n5²+1=26\n\n③ 6²+1=37！`
    },
    {
      sequence: '0, 3, 8, 15, 24, ?',
      answer: '35',
      wrongs: ['30', '32', '33'],
      explanation: `① 答えは 35 です。\n\n② それぞれの数は自然数の2乗-1です。\n1²-1=0\n2²-1=3\n3²-1=8\n4²-1=15\n5²-1=24\n\n③ 6²-1=35！`
    },
    {
      sequence: '3, 6, 11, 18, 27, ?',
      answer: '38',
      wrongs: ['34', '36', '40'],
      explanation: `① 答えは 38 です。\n\n② それぞれの数は自然数の2乗+2です。\n1²+2=3\n2²+2=6\n3²+2=11\n4²+2=18\n5²+2=27\n\n③ 6²+2=38！`
    },
    {
      sequence: '-1, 2, 7, 14, 23, ?',
      answer: '34',
      wrongs: ['30', '32', '36'],
      explanation: `① 答えは 34 です。\n\n② それぞれの数は自然数の2乗-2です。\n1²-2=-1\n2²-2=2\n3²-2=7\n4²-2=14\n5²-2=23\n\n③ 6²-2=34！`
    },
    {
      sequence: '2, 6, 12, 20, 30, ?',
      answer: '42',
      wrongs: ['36', '38', '40'],
      explanation: `① 答えは 42 です。\n\n② それぞれの数はn²+nです。\n1²+1=2\n2²+2=6\n3²+3=12\n4²+4=20\n5²+5=30\n\n③ 6²+6=42！`
    },
    // 交互パターン
    {
      sequence: '1, 4, 2, 8, 3, 12, ?',
      answer: '4',
      wrongs: ['5', '6', '16'],
      explanation: `① 答えは 4 です。\n\n② 奇数番目と偶数番目に分けて見ると\n奇数番目：1, 2, 3, ? → 1ずつ増える\n偶数番目：4, 8, 12 → 4ずつ増える\n\n③ 奇数番目の次は4！`
    },
    {
      sequence: '2, 6, 3, 9, 4, 12, ?',
      answer: '5',
      wrongs: ['6', '15', '16'],
      explanation: `① 答えは 5 です。\n\n② 奇数番目と偶数番目に分けて見ると\n奇数番目：2, 3, 4, ? → 1ずつ増える\n偶数番目：6, 9, 12 → 3ずつ増える\n\n③ 奇数番目の次は5！`
    },
    // 3乗系
    {
      sequence: '1, 8, 27, 64, 125, ?',
      answer: '216',
      wrongs: ['180', '196', '200'],
      explanation: `① 答えは 216 です。\n\n② それぞれの数は自然数の3乗です。\n1³=1\n2³=8\n3³=27\n4³=64\n5³=125\n\n③ 6³=216！`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: `数列の規則を見つけよう。\n${p.sequence}`,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '数列の規則発見'
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
    question: `1人が${p.people}人に話を広めた。\nその${p.people}人がまた${p.people}人に広めていくと\n${p.stages}段階目には何人に伝わっている？`,
    choices: makeChoices(
      `${p.answer}人`,
      [`${p.answer + 10}人`, `${p.answer - 10}人`, `${p.answer * p.people}人`]
    ),
    answer: `${p.answer}人`,
    explanation: `① 答えは ${p.answer}人 です。\n\n② 1段階ごとに${p.people}倍に増えていきます。\n1段階目：${p.people}人\n2段階目：${p.people * p.people}人\n3段階目：${p.people ** 3}人\n\n③ ${p.stages}段階目は${p.people}を${p.stages}回かけると\n${p.people}^${p.stages} = ${p.answer}人！`,
    genre: '指数的拡散'
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
    question: `毎日2倍に増えるバクテリアがいる。\n${fullDay}日目に容器が満杯になった。\n${fraction.label}だったのは何日目？`,
    choices: makeChoices(
      `${answer}日目`,
      [`${answer - 1}日目`, `${answer + 1}日目`, `${answer - 2}日目`]
    ),
    answer: `${answer}日目`,
    explanation: `① 答えは ${answer}日目 です。\n\n② 毎日2倍になるということは\n前の日は必ず半分！\n\n③ ${fullDay}日目が満杯なら\n${fullDay - 1}日目は1/2\n${fullDay - 2}日目は1/4\n${fullDay - 3}日目は1/8\n\n④ ${fraction.label}は${answer}日目！\n逆から考えるのがポイントです！`,
    genre: '倍増系②'
  }
}

// ジャンル20：72の法則
function generateRule72(): ExpertQuestion {
  const rates = [2, 3, 4, 6, 8, 9, 12, 18, 24, 36]
  const rate = rates[randInt(0, rates.length - 1)]
  const answer = 72 / rate

  return {
    question: `年利${rate}%で複利運用すると\n元本が2倍になるのは約何年後？`,
    choices: makeChoices(
      `約${answer}年`,
      [`約${answer + 2}年`, `約${answer - 2}年`, `約${answer * 2}年`]
    ),
    answer: `約${answer}年`,
    explanation: `① 答えは 約${answer}年 です。\n\n② 「72の法則」を使います。\n72 ÷ 金利(%) = 2倍になる年数\n\n③ 72 ÷ ${rate} = ${answer}年！\n\n④ 複利運用では「72÷金利」で\n2倍になる年数が素早く計算できます！`,
    genre: '72の法則'
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
    question: `${p.mult}+${p.mult * 2}+${p.mult * 3}+…+${p.max}\n${p.mult}の倍数を全部足すといくつ？`,
    choices: makeChoices(
      String(p.answer),
      [String(p.answer + 100), String(p.answer - 100), String(p.answer + 50)]
    ),
    answer: String(p.answer),
    explanation: `① 答えは ${p.answer} です。\n\n② まず${p.mult}でくくります。\n${p.mult}×(1+2+3+…+${p.n})\n\n③ カッコの中はガウスの公式で\n1+2+3+…+${p.n} = ${p.n}×${p.n + 1}÷2 = ${p.n * (p.n + 1) / 2}\n\n④ ${p.mult} × ${p.n * (p.n + 1) / 2} = ${p.answer}！`,
    genre: 'ガウスの足し算②'
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
    question: `${p1.length}cmのロープを${p1.interval}cmずつに切ると\n何回切る必要がある？`,
    answer: `${p1answer}回`,
    wrongs: [`${p1answer + 1}回`, `${p1pieces}回`, `${p1answer - 1}回`],
    explanation: `① 答えは ${p1answer}回 です。\n\n② ${p1.length}÷${p1.interval} = ${p1pieces}つに分かれます。\n\n③ ${p1pieces}つに切り分けるには\n${p1pieces} - 1 = ${p1answer}回！\n\n④ 直感では${p1pieces}回と思いがちですが\n最後の1つは切らなくていいので\n個数 - 1 = 切る回数です！`
  })

  // パターン2：丸太を等分
  const p2Options = [6, 8, 10, 12, 15, 20]
  const p2n = p2Options[randInt(0, p2Options.length - 1)]
  const p2answer = p2n - 1
  patterns.push({
    question: `丸太を${p2n}等分するには\n何回切る必要がある？`,
    answer: `${p2answer}回`,
    wrongs: [`${p2n}回`, `${p2answer - 1}回`, `${p2answer + 2}回`],
    explanation: `① 答えは ${p2answer}回 です。\n\n② ${p2n}等分するには\n${p2n} - 1 = ${p2answer}回！\n\n③ 直感では${p2n}回と思いがちですが\n最後の1つは切らなくていいので\n個数 - 1 = 切る回数です！`
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
    question: `1回切るのに${p3.time}分かかる。\n丸太を${p3.pieces}つに切り分けるには\n何分かかる？`,
    answer: `${p3answer}分`,
    wrongs: [`${p3.pieces * p3.time}分`, `${p3answer + p3.time}分`, `${p3answer - p3.time}分`],
    explanation: `① 答えは ${p3answer}分 です。\n\n② ${p3.pieces}つに切り分けるには\n${p3.pieces} - 1 = ${p3cuts}回切る必要があります。\n\n③ 1回${p3.time}分なので\n${p3cuts} × ${p3.time} = ${p3answer}分！\n\n④ 直感では${p3.pieces}×${p3.time}=${p3.pieces * p3.time}分と思いがちですが\n最後の1つは切らなくていいので\n${p3cuts}回で済みます！`
  })

// パターン4：両端から同時
  const p4Options = [9, 11, 13, 15, 17, 19]
  const p4n = p4Options[randInt(0, p4Options.length - 1)]
  const p4cuts = p4n - 1
  const p4answer = p4cuts / 2
  patterns.push({
    question: `両端から同時に切れる機械がある。\n丸太を${p4n}等分するには何回切る必要がある？`,
    answer: `${p4answer}回`,
    wrongs: [`${p4cuts}回`, `${p4answer + 1}回`, `${p4answer + 2}回`],
    explanation: `① 答えは ${p4answer}回 です。\n\n② まず普通に切る回数は\n${p4n} - 1 = ${p4cuts}回\n\n③ 両端から同時に切れるので\n${p4cuts} ÷ 2 = ${p4answer}回で完成！\n\n④ 知っていれば一瞬、\n知らないと${p4cuts}回と答えてしまいます！`
  })

  // パターン5：折ってから切る
  const p5Options = [2, 3, 4, 5]
  const p5cuts = p5Options[randInt(0, p5Options.length - 1)]
  const p5answer = (p5cuts + 1) * 2
  patterns.push({
    question: `ロープを半分に折ってから${p5cuts}回切ると\n何つに分かれる？`,
    answer: `${p5answer}つ`,
    wrongs: [`${p5cuts + 1}つ`, `${p5answer - 2}つ`, `${p5answer + 2}つ`],
    explanation: `① 答えは ${p5answer}つ です。\n\n② 半分に折ると2枚重なります。\n\n③ 2枚重ねた状態で${p5cuts}回切ると\n${p5cuts} + 1 = ${p5cuts + 1}つに分かれます。\n\n④ 広げると ${p5cuts + 1} × 2 = ${p5answer}つ！`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '切る回数と個数'
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
    question: `${p1.a}人トーナメントと${p1.b}人トーナメントでは\n試合数がいくつ違う？`,
    answer: `${p1diff}試合`,
    wrongs: [`${p1diff + 1}試合`, `${p1diff - 1}試合`, `${p1diff * 2}試合`],
    explanation: `① 答えは ${p1diff}試合 です。\n\n② トーナメントの試合数は\n参加人数 - 1 で求められます。\n\n③ ${p1.a}人：${p1.a}-1 = ${p1.a - 1}試合\n${p1.b}人：${p1.b}-1 = ${p1.b - 1}試合\n\n④ ${p1.b - 1} - ${p1.a - 1} = ${p1diff}試合の差！\n実は差はそのまま ${p1.b} - ${p1.a} = ${p1diff}になります！`
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
    question: `${p2.a}人・${p2.b}人・${p2.c}人の\n3つのトーナメントの試合数を\n全部足すといくつ？`,
    answer: `${p2answer}試合`,
    wrongs: [`${p2answer + 3}試合`, `${p2answer - 3}試合`, `${p2.a + p2.b + p2.c - 1}試合`],
    explanation: `① 答えは ${p2answer}試合 です。\n\n② トーナメントの試合数は\n参加人数 - 1 で求められます。\n\n③ ${p2.a}人：${p2.a}-1 = ${p2.a - 1}試合\n${p2.b}人：${p2.b}-1 = ${p2.b - 1}試合\n${p2.c}人：${p2.c}-1 = ${p2.c - 1}試合\n\n④ ${p2.a - 1} + ${p2.b - 1} + ${p2.c - 1} = ${p2answer}試合！`
  })

  // 角度③：逆算系
  const p3matches = randInt(10, 99)
  const p3answer = p3matches + 1
  patterns.push({
    question: `あるトーナメントの試合数が${p3matches}試合だった。\n何人参加していた？`,
    answer: `${p3answer}人`,
    wrongs: [`${p3answer - 1}人`, `${p3answer + 1}人`, `${p3answer * 2}人`],
    explanation: `① 答えは ${p3answer}人 です。\n\n② トーナメントの試合数は\n参加人数 - 1 で求められます。\n\n③ つまり参加人数 = 試合数 + 1\n${p3matches} + 1 = ${p3answer}人！\n\n④ 知っていれば一瞬で解けます！`
  })

  // 角度④：チーム戦
  const p4teams = randInt(4, 16)
  const p4members = randInt(3, 8)
  const p4answer = (p4teams - 1) * p4members
  patterns.push({
    question: `1チーム${p4members}人で戦うトーナメントに\n${p4teams}チーム参加した。\n負けたチームの選手は全員引退する。\n引退する選手は全部で何人？`,
    answer: `${p4answer}人`,
    wrongs: [`${p4answer + p4members}人`, `${p4answer - p4members}人`, `${p4teams * p4members}人`],
    explanation: `① 答えは ${p4answer}人 です。\n\n② トーナメントの試合数は\n${p4teams} - 1 = ${p4teams - 1}試合\n\n③ 1試合で1チームが負けて\n${p4members}人が引退するので\n${p4teams - 1} × ${p4members} = ${p4answer}人！`
  })

  // 角度⑤：男女別
  const p5men = randInt(10, 30)
  const p5women = randInt(10, 30)
  const p5answer = (p5men - 1) + (p5women - 1)
  patterns.push({
    question: `男子${p5men}人・女子${p5women}人が\nそれぞれ別々にトーナメントを行う。\n合計何試合になる？`,
    answer: `${p5answer}試合`,
    wrongs: [`${p5answer + 2}試合`, `${p5answer - 2}試合`, `${p5men + p5women - 1}試合`],
    explanation: `① 答えは ${p5answer}試合 です。\n\n② 男子トーナメント：\n${p5men} - 1 = ${p5men - 1}試合\n\n③ 女子トーナメント：\n${p5women} - 1 = ${p5women - 1}試合\n\n④ ${p5men - 1} + ${p5women - 1} = ${p5answer}試合！`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'トーナメント試合数の差'
  }
}


// ジャンル24：倍数でない数の個数
function generateNonMultiple(): ExpertQuestion {
  const patterns = [
    {
      question: '1から100までの整数のうち\n3の倍数でも5の倍数でもない数は何個？',
      answer: '53個',
      wrongs: ['47個', '50個', '60個'],
      explanation: `① 答えは 53個です。\n\n② 1から100のうち\n3の倍数：100÷3 = 33個\n5の倍数：100÷5 = 20個\n15の倍数：100÷15 = 6個\n\n③ 3または5の倍数：\n33 + 20 - 6 = 47個\n\n④ どちらでもない数：\n100 - 47 = 53個！`
    },
    {
      question: '1から100までの整数のうち\n2の倍数でも3の倍数でもない数は何個？',
      answer: '33個',
      wrongs: ['34個', '50個', '17個'],
      explanation: `① 答えは 33個です。\n\n② 1から100のうち\n2の倍数：100÷2 = 50個\n3の倍数：100÷3 = 33個\n6の倍数：100÷6 = 16個\n\n③ 2または3の倍数：\n50 + 33 - 16 = 67個\n\n④ どちらでもない数：\n100 - 67 = 33個！`
    },
    {
      question: '1から100までの整数のうち\n2の倍数でも5の倍数でもない数は何個？',
      answer: '40個',
      wrongs: ['50個', '30個', '60個'],
      explanation: `① 答えは 40個です。\n\n② 1から100のうち\n2の倍数：100÷2 = 50個\n5の倍数：100÷5 = 20個\n10の倍数：100÷10 = 10個\n\n③ 2または5の倍数：\n50 + 20 - 10 = 60個\n\n④ どちらでもない数：\n100 - 60 = 40個！`
    },
    {
      question: '1から50までの整数のうち\n3の倍数でも5の倍数でもない数は何個？',
      answer: '27個',
      wrongs: ['23個', '25個', '30個'],
      explanation: `① 答えは 27個です。\n\n② 1から50のうち\n3の倍数：50÷3 = 16個\n5の倍数：50÷5 = 10個\n15の倍数：50÷15 = 3個\n\n③ 3または5の倍数：\n16 + 10 - 3 = 23個\n\n④ どちらでもない数：\n50 - 23 = 27個！`
    },
    {
      question: '1から50までの整数のうち\n2の倍数でも3の倍数でもない数は何個？',
      answer: '17個',
      wrongs: ['16個', '25個', '33個'],
      explanation: `① 答えは 17個です。\n\n② 1から50のうち\n2の倍数：50÷2 = 25個\n3の倍数：50÷3 = 16個\n6の倍数：50÷6 = 8個\n\n③ 2または3の倍数：\n25 + 16 - 8 = 33個\n\n④ どちらでもない数：\n50 - 33 = 17個！`
    },
    {
      question: '1から100までの整数のうち\n3の倍数でも7の倍数でもない数は何個？',
      answer: '57個',
      wrongs: ['43個', '50個', '55個'],
      explanation: `① 答えは 57個です。\n\n② 1から100のうち\n3の倍数：100÷3 = 33個\n7の倍数：100÷7 = 14個\n21の倍数：100÷21 = 4個\n\n③ 3または7の倍数：\n33 + 14 - 4 = 43個\n\n④ どちらでもない数：\n100 - 43 = 57個！`
    },
    {
      question: '1から200までの整数のうち\n2の倍数でも5の倍数でもない数は何個？',
      answer: '80個',
      wrongs: ['100個', '60個', '120個'],
      explanation: `① 答えは 80個です。\n\n② 1から200のうち\n2の倍数：200÷2 = 100個\n5の倍数：200÷5 = 40個\n10の倍数：200÷10 = 20個\n\n③ 2または5の倍数：\n100 + 40 - 20 = 120個\n\n④ どちらでもない数：\n200 - 120 = 80個！`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '倍数でない数の個数'
  }
}

// ジャンル25：一の位が5の2乗
function generateSquareEndingIn5(): ExpertQuestion {
  const nOptions = [15, 25, 35, 45, 55, 65, 75, 85, 95]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const tens = Math.floor(n / 10)
  const answer = tens * (tens + 1) * 100 + 25

  return {
    question: `${n}²はいくつ？`,
    choices: makeChoices(
      String(answer),
      [String(answer + 100), String(answer - 100), String(answer + 200)]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} です。\n\n② 一の位が5の数の2乗には裏ワザがあります！\n\n③ ${n}²の場合\n十の位「${tens}」を取り出して\n${tens} × (${tens}+1) = ${tens} × ${tens + 1} = ${tens * (tens + 1)}\n\n④ 後ろに「25」をつけると\n${answer}！`,
    genre: '一の位が5の2乗'
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
    explanation: `① 答えは ${answer} です。\n\n② 100との差を使います。\n${p.a} = 100 - ${da}\n${p.b} = 100 - ${db}\n\n③ ${p.a} × ${p.b}\n= (100-${da})(100-${db})\n= 10000 - ${da * 100} - ${db * 100} + ${da * db}\n= ${answer}！`,
    genre: '100に近い数の掛け算'
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
    explanation: `① 答えは ${answer} です。\n\n② 25 = 100 ÷ 4 を使います。\n\n③ ${n} × 25\n= ${n} × 100 ÷ 4\n= ${n * 100} ÷ 4\n= ${answer}！`,
    genre: '×25の変換'
  }
}

// ジャンル28：100付近の2乗
function generateNear100Square(): ExpertQuestion {
  const nOptions = [91, 92, 93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 108, 109]
  const n = nOptions[randInt(0, nOptions.length - 1)]
  const diff = n - 100
  const answer = 10000 + 2 * diff * 100 + diff * diff

  return {
    question: `${n}²はいくつ？`,
    choices: makeChoices(
      String(answer),
      [String(answer + 100), String(answer - 100), String(answer + 200)]
    ),
    answer: String(answer),
    explanation: `① 答えは ${answer} です。\n\n② 100との差を使います。\n${n} = 100 ${diff >= 0 ? '+' : '-'} ${Math.abs(diff)}\n\n③ ${n}²\n= (100${diff >= 0 ? '+' : '-'}${Math.abs(diff)})²\n= 10000 ${diff >= 0 ? '+' : '-'} ${Math.abs(2 * diff * 100)} + ${diff * diff}\n= ${answer}！`,
    genre: '100付近の2乗'
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
    explanation: `① 答えは ${p.answer} です。\n\n② ${p.a}と${p.b}は${p.center}を中心に対称です。\n${p.a} = ${p.center} - ${p.diff}\n${p.b} = ${p.center} + ${p.diff}\n\n③ (${p.center}-${p.diff})(${p.center}+${p.diff}) = ${p.center}² - ${p.diff}²\n= ${p.center * p.center} - ${p.diff * p.diff} = ${p.answer}！\n\n④ (a-b)(a+b) = a²-b²\nという公式を使います。`,
    genre: '対称な掛け算'
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
    question: `カタツムリが${p1.wall}mの壁を登っている。\n昼間に${p1.up}m登り、夜に${p1.down}m滑り落ちる。\n何日目に頂上に着く？`,
    answer: `${p1.day}日目`,
    wrongs: [`${p1.day - 1}日目`, `${p1.day + 1}日目`, `${p1.wall - p1.up}日目`],
    explanation: `① 答えは ${p1.day}日目 です。\n\n② 1日で正味${p1.up - p1.down}m進みます。\n\n③ ただし最後の日は滑らない！\n${p1.day - 1}日目の終わり：${(p1.day - 1) * (p1.up - p1.down)}m地点\n${p1.day}日目の昼間：${(p1.day - 1) * (p1.up - p1.down)}+${p1.up}=${(p1.day - 1) * (p1.up - p1.down) + p1.up}m→到達！\n\n④ 直感では${p1.wall}日目と思いがちですが\n最後の日は滑らないのがポイントです！`
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
    question: `カタツムリが昼間に${p2.up}m登り、夜に${p2.down}m滑り落ちる。\n${p2.day}日目に頂上に着いた。\n壁は何m？`,
    answer: `${p2.wall}m`,
    wrongs: [`${p2.wall + 1}m`, `${p2.wall - 1}m`, `${p2.wall + p2.up}m`],
    explanation: `① 答えは ${p2.wall}m です。\n\n② 最終日の前日の位置を考えます。\n${p2.day - 1}日目の終わりまでに\n${p2.up - p2.down}m × ${p2.day - 2}日 = ${(p2.day - 2) * (p2.up - p2.down)}m地点\n\n③ 最終日に${p2.up}m登って頂上に到達するので\n壁の高さ = ${(p2.day - 2) * (p2.up - p2.down)} + ${p2.up} = ${p2.wall}m！`
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
    question: `カタツムリが${p3.wall}mの壁を登っている。\n昼間に${p3.up}m登るのに${p3.time}時間かかる。\n夜に${p3.down}m滑り落ちる。\n頂上に着くまで合計何時間登った？`,
    answer: `${p3.total}時間`,
    wrongs: [`${p3.total + p3.time}時間`, `${p3.total - p3.time}時間`, `${p3.wall * p3.time}時間`],
    explanation: `① 答えは ${p3.total}時間 です。\n\n② ${p3.day}日目に到達します。\n\n③ 毎日昼間に${p3.time}時間登るので\n${p3.day} × ${p3.time} = ${p3.total}時間！\n\n④ 最終日も昼間に登るので\n全${p3.day}日分の登り時間になります。`
  })

  // 角度④：2匹パターン
  const p4Options = [
    { wall: 15, up1: 3, down1: 2, day1: 13, up2: 4, down2: 3, day2: 12, winner: '2匹目' },
    { wall: 20, up1: 3, down1: 2, day1: 18, up2: 5, down2: 4, day2: 16, winner: '2匹目' },
    { wall: 12, up1: 3, down1: 2, day1: 10, up2: 4, down2: 3, day2: 9, winner: '2匹目' },
  ]
  const p4 = p4Options[randInt(0, p4Options.length - 1)]
  patterns.push({
    question: `2匹のカタツムリが${p4.wall}mの壁を登る。\n1匹目：昼間${p4.up1}m登り夜${p4.down1}m滑る\n2匹目：昼間${p4.up2}m登り夜${p4.down2}m滑る\n先に頂上に着くのはどちら？`,
    answer: p4.winner,
    wrongs: ['1匹目', '同時', '分からない'],
    explanation: `① 答えは ${p4.winner} です。\n\n② 1匹目の到達日：\n1日${p4.up1 - p4.down1}m進み${p4.day1 - 1}日目終わりに${(p4.day1 - 1) * (p4.up1 - p4.down1)}m\n${p4.day1}日目昼間：${(p4.day1 - 1) * (p4.up1 - p4.down1)}+${p4.up1}=${(p4.day1 - 1) * (p4.up1 - p4.down1) + p4.up1}m→${p4.day1}日目\n\n③ 2匹目の到達日：\n1日${p4.up2 - p4.down2}m進み${p4.day2 - 1}日目終わりに${(p4.day2 - 1) * (p4.up2 - p4.down2)}m\n${p4.day2}日目昼間：${(p4.day2 - 1) * (p4.up2 - p4.down2)}+${p4.up2}=${(p4.day2 - 1) * (p4.up2 - p4.down2) + p4.up2}m→${p4.day2}日目\n\n④ ${p4.day1}日目 vs ${p4.day2}日目なので${p4.winner}の勝ち！`
  })

  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: '壁登りの到達日'
  }
}

// ジャンル31：リサイクル交換の最大数
function generateRecycle(): ExpertQuestion {
  const patterns = [
    {
      question: '空き瓶3本でジュース1本と交換できる。\n最初に9本買うと最大何本飲める？',
      answer: '13本',
      wrongs: ['12本', '14本', '11本'],
      explanation: `① 答えは 13本です。\n\n② 最初の9本を飲む→空き瓶9本\n9÷3 = 3本と交換→空き瓶3本\n3÷3 = 1本と交換→空き瓶1本\n\n③ 合計 9 + 3 + 1 = 13本！`
    },
    {
      question: '空き瓶3本でジュース1本と交換できる。\n最初に12本買うと最大何本飲める？',
      answer: '17本',
      wrongs: ['16本', '18本', '15本'],
      explanation: `① 答えは 17本です。\n\n② 最初の12本を飲む→空き瓶12本\n12÷3 = 4本と交換→空き瓶4本\n4÷3 = 1本と交換→空き瓶1本\n\n③ 合計 12 + 4 + 1 = 17本！`
    },
    {
      question: '空き瓶3本でジュース1本と交換できる。\n最初に15本買うと最大何本飲める？',
      answer: '21本',
      wrongs: ['20本', '22本', '18本'],
      explanation: `① 答えは 21本です。\n\n② 最初の15本を飲む→空き瓶15本\n15÷3 = 5本と交換→空き瓶5本\n5÷3 = 1本と交換→空き瓶2本\n\n③ 合計 15 + 5 + 1 = 21本！`
    },
    {
      question: '空き瓶3本でジュース1本と交換できる。\n最初に18本買うと最大何本飲める？',
      answer: '26本',
      wrongs: ['25本', '27本', '24本'],
      explanation: `① 答えは 26本です。\n\n② 最初の18本を飲む→空き瓶18本\n18÷3 = 6本と交換→空き瓶6本\n6÷3 = 2本と交換→空き瓶2本\n\n③ 合計 18 + 6 + 2 = 26本！`
    },
    {
      question: '空き瓶3本でジュース1本と交換できる。\n最初に27本買うと最大何本飲める？',
      answer: '40本',
      wrongs: ['39本', '41本', '36本'],
      explanation: `① 答えは 40本です。\n\n② 最初の27本を飲む→空き瓶27本\n27÷3 = 9本と交換→空き瓶9本\n9÷3 = 3本と交換→空き瓶3本\n3÷3 = 1本と交換→空き瓶1本\n\n③ 合計 27 + 9 + 3 + 1 = 40本！`
    },
    {
      question: '空き瓶4本でジュース1本と交換できる。\n最初に16本買うと最大何本飲める？',
      answer: '21本',
      wrongs: ['20本', '22本', '18本'],
      explanation: `① 答えは 21本です。\n\n② 最初の16本を飲む→空き瓶16本\n16÷4 = 4本と交換→空き瓶4本\n4÷4 = 1本と交換→空き瓶1本\n\n③ 合計 16 + 4 + 1 = 21本！`
    },
    {
      question: '空き瓶4本でジュース1本と交換できる。\n最初に20本買うと最大何本飲める？',
      answer: '26本',
      wrongs: ['25本', '27本', '24本'],
      explanation: `① 答えは 26本です。\n\n② 最初の20本を飲む→空き瓶20本\n20÷4 = 5本と交換→空き瓶5本\n5÷4 = 1本と交換→空き瓶1本\n\n③ 合計 20 + 5 + 1 = 26本！`
    },
    {
      question: '空き瓶4本でジュース1本と交換できる。\n最初に24本買うと最大何本飲める？',
      answer: '31本',
      wrongs: ['30本', '32本', '28本'],
      explanation: `① 答えは 31本です。\n\n② 最初の24本を飲む→空き瓶24本\n24÷4 = 6本と交換→空き瓶6本\n6÷4 = 1本と交換→空き瓶2本\n\n③ 合計 24 + 6 + 1 = 31本！`
    },
    {
      question: '空き瓶5本でジュース1本と交換できる。\n最初に25本買うと最大何本飲める？',
      answer: '31本',
      wrongs: ['30本', '32本', '28本'],
      explanation: `① 答えは 31本です。\n\n② 最初の25本を飲む→空き瓶25本\n25÷5 = 5本と交換→空き瓶5本\n5÷5 = 1本と交換→空き瓶1本\n\n③ 合計 25 + 5 + 1 = 31本！`
    },
    {
      question: '空き瓶5本でジュース1本と交換できる。\n最初に20本買うと最大何本飲める？',
      answer: '24本',
      wrongs: ['23本', '25本', '20本'],
      explanation: `① 答えは 24本です。\n\n② 最初の20本を飲む→空き瓶20本\n20÷5 = 4本と交換→空き瓶4本\n4本は交換できないので終了\n\n③ 合計 20 + 4 = 24本！`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'リサイクル交換の最大数'
  }
}

// ジャンル32：じゃんけんの確率
function generateRockPaperScissors(): ExpertQuestion {
  const patterns = [
    {
      question: '3人でじゃんけんをするとき\n1回で勝負がつく確率は？',
      answer: '1/3',
      wrongs: ['2/3', '1/9', '2/9'],
      explanation: `① 答えは 1/3 です。\n\n② 3人の手の組み合わせは\n3³ = 27通り\n\n③ 勝負がつくのは\n1人が勝つ場合：3種類×3人 = 9通り\n\n④ 9 ÷ 27 = 1/3！`
    },
    {
      question: '2人でじゃんけんをするとき\n1回で勝負がつく確率は？',
      answer: '2/3',
      wrongs: ['1/3', '1/2', '2/9'],
      explanation: `① 答えは 2/3 です。\n\n② 2人の手の組み合わせは\n3² = 9通り\n\n③ 勝負がつくのは\nグーvsチョキ・チョキvsパー・パーvsグー\nそれぞれ2通りで 3×2 = 6通り\n\n④ 6 ÷ 9 = 2/3！`
    },
    {
      question: '3人でじゃんけんをするとき\nアイコになる確率は？',
      answer: '2/3',
      wrongs: ['1/3', '1/9', '1/2'],
      explanation: `① 答えは 2/3 です。\n\n② 3人の手の組み合わせは\n3³ = 27通り\n\n③ 勝負がつくのは\n1人が勝つ場合：3種類×3人 = 9通り\n\n④ アイコ = 勝負がつかない\n1 - 9/27 = 1 - 1/3 = 2/3！`
    },
    {
      question: '2人でじゃんけんをするとき\nアイコになる確率は？',
      answer: '1/3',
      wrongs: ['2/3', '1/2', '1/9'],
      explanation: `① 答えは 1/3 です。\n\n② 2人の手の組み合わせは\n3² = 9通り\n\n③ 勝負がつくのは\nグーvsチョキ・チョキvsパー・パーvsグー\nそれぞれ2通りで 3×2 = 6通り\n\n④ アイコ = 勝負がつかない\n1 - 6/9 = 1 - 2/3 = 1/3！`
    },
    {
      question: '3人でじゃんけんをするとき\n全員が同じ手を出す確率は？',
      answer: '1/9',
      wrongs: ['1/3', '1/27', '2/9'],
      explanation: `① 答えは 1/9 です。\n\n② 3人の手の組み合わせは\n3³ = 27通り\n\n③ 全員同じ手は\nグー・チョキ・パーの3通り\n\n④ 3 ÷ 27 = 1/9！`
    },
  ]
  const p = patterns[randInt(0, patterns.length - 1)]

  return {
    question: p.question,
    choices: makeChoices(p.answer, p.wrongs),
    answer: p.answer,
    explanation: p.explanation,
    genre: 'じゃんけんの確率'
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