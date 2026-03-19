/* =========================================================
   LANG.JS — All bilingual content
   ========================================================= */

const LANG = {
  en: {
    appTitle: "Decimal Dash",
    heroTitle: "Let's Multiply Decimals! 🎉",
    heroSub:   "Pick a mini-game and start learning. Each one teaches you a cool strategy!",
    progressLabel: (done, total) => `${done} of ${total} games completed`,
    home: "🏠 Home",
    langBtn: "🇫🇷 FR",
    stars: ["☆☆☆", "⭐☆☆", "⭐⭐☆", "⭐⭐⭐"],
    gameLabel: (n) => `GAME ${n}`,
    checkBtn:  "Check ✓",
    nextBtn:   "Next →",
    tryAgain:  "Try Again",
    playAgain: "Play Again",
    backHome:  "Home 🏠",
    correct:   "🎉 Correct! Great work!",
    wrong:     (ans) => `Not quite. The answer is ${ans}. Keep going!`,
    hint:      "Hint",

    // Game metadata
    games: [
      { title: "Money Model",          icon: "💰", sub: "Decimals are money!" },
      { title: "Repeated Addition",    icon: "➕", sub: "Add it up step by step" },
      { title: "Ignore the Decimal",   icon: "🔢", sub: "A 3-step magic trick" },
      { title: "Visual Blocks",        icon: "🧱", sub: "Build groups of blocks" },
      { title: "Number Line Jumps",    icon: "📏", sub: "Hop your way to the answer" },
      { title: "Everyday Examples",    icon: "🌍", sub: "Real-world story problems" },
      { title: "Estimation Trick",     icon: "🎯", sub: "Guess first, then check" },
      { title: "Vertical Method",      icon: "📐", sub: "Column multiplication" },
      { title: "Friendly Numbers",     icon: "🤸", sub: "Build confidence" },
      { title: "Daily Drill",          icon: "⏱",  sub: "5 quick questions" },
    ],

    // Game 1
    g1: {
      title:   "Money Model 💰",
      sub:     "Decimals are just dollars and cents!",
      instr:   "Add the <strong>same amount</strong> of money into your wallet for each group. Then find the total!",
      addDollar: "Add $1.00",
      addDime:   "Add $0.10",
      group:     (n) => `Group ${n}`,
      wallet:    "Your Wallet",
      total:     "Running Total:",
      question:  (a, b) => `If you have ${b} groups of $${a.toFixed(2)}, what is the total?`,
      enterAns:  "Enter total ($)",
    },

    // Game 2
    g2: {
      title:  "Repeated Addition ➕",
      sub:    "Multiplication is just fast addition!",
      instr:  "Click <strong>\"Add\"</strong> to add the number one more time, and watch the total grow.",
      addBtn: (n) => `+ Add ${n}`,
      sum:    "= Total:",
      question: (a, b) => `${a} × ${b}  =  ${a} + ${a} + … (${b} times)`,
    },

    // Game 3
    g3: {
      title: "Ignore the Decimal 🔢",
      sub:   "3 steps — ignore, multiply, place back!",
      instr: "Follow the 3 steps below. Each step unlocks the next one.",
      step1h: "Step 1 — Ignore the decimal point",
      step1p: (a, b) => `What is ${a} × ${b}?`,
      step2h: "Step 2 — Count the decimal digits",
      step2p: (a) => `How many digits are after the decimal point in ${a}?`,
      step3h: "Step 3 — Place the decimal back",
      step3p: (raw, digs) => `Take ${raw} and move the decimal ${digs} place${digs>1?'s':''} from the right.`,
      revealBtn: "Reveal",
    },

    // Game 4
    g4: {
      title:   "Visual Blocks 🧱",
      sub:     "Build each group using blocks!",
      instr:   "Each group needs <strong>whole blocks</strong> and <strong>tenth blocks</strong>. Click the blocks to add them.",
      whole:   "1 Whole",
      tenth:   "0.1 Tenth",
      reset:   "Reset Group",
      groups:  "Your Groups",
      total:   "Total blocks:",
    },

    // Game 5
    g5: {
      title:   "Number Line Jumps 📏",
      sub:     "Hop your way to the answer!",
      instr:   "Press <strong>Jump!</strong> to hop the next step on the number line. Count the jumps!",
      jumpBtn: "Jump! →",
      jumps:   (n, t) => `Jump ${n} of ${t}`,
      landed:  (v) => `You landed on ${v}! That's the answer! 🎉`,
    },

    // Game 6
    g6: {
      title:  "Everyday Examples 🌍",
      sub:    "Real situations make it click!",
      instr:  "Read the story, then type the answer.",
      unit:   "",   // appended per story
      stories: [
        { emoji: "🪢", text: (a,b) => `A rope is <strong>${a} m</strong> long. You have <strong>${b} ropes</strong>. How many metres in total?`, unit: "m" },
        { emoji: "🍫", text: (a,b) => `A chocolate bar weighs <strong>${a} kg</strong>. You buy <strong>${b} bars</strong>. What is the total weight?`, unit: "kg" },
        { emoji: "🧃", text: (a,b) => `Each juice bottle holds <strong>${a} L</strong>. You have <strong>${b} bottles</strong>. How many litres altogether?`, unit: "L" },
        { emoji: "🪙", text: (a,b) => `Each coin is worth <strong>$${a}</strong>. You have <strong>${b} coins</strong>. What is the total value?`, unit: "$" },
        { emoji: "🎁", text: (a,b) => `A ribbon is <strong>${a} m</strong> long. You need <strong>${b} ribbons</strong>. How many metres of ribbon do you need?`, unit: "m" },
      ],
    },

    // Game 7
    g7: {
      title: "Estimation Trick 🎯",
      sub:   "Round first — catch mistakes before they happen!",
      instr: "Phase 1: <strong>round</strong> the decimal to the nearest whole number and estimate. Phase 2: find the <strong>exact</strong> answer.",
      phase1: "Phase 1 — Your Estimate",
      phase2: "Phase 2 — Exact Answer",
      roundTo: (n) => `${n} rounds to…`,
      estimate: "Estimate:",
      exact:    "Exact answer:",
      compare:  (est, real) => `Your estimate was ${est} — exact answer is ${real}. ${Math.abs(est-real) <= Math.abs(real)*.2 ? "Great estimate! 🎯" : "They're in the same range!"}`,
    },

    // Game 8
    g8: {
      title: "Vertical Method 📐",
      sub:   "Stack it up and multiply!",
      instr: "Multiply the numbers normally, then <strong>click the correct position</strong> to place the decimal point.",
      placeDecimal: "Tap where the decimal point should go:",
      correct: "Perfect! You placed the decimal point correctly! 🎉",
      wrong:   "Not there — try again!",
    },

    // Game 9
    g9: {
      title: "Friendly Numbers 🤸",
      sub:   "Build your confidence step by step!",
      instr: "Solve each problem. You can peek at a hint if you need one — but try without first!",
      hintLabel: "Show a hint:",
      hints: ["💰 Money", "➕ Add it up", "🔢 Ignore decimal"],
      noHint: "No hint (3 ⭐)",
      withHint: "Hint used (2 ⭐)",
    },

    // Game 10
    g10: {
      title: "Daily Drill ⏱",
      sub:   "5 quick questions — let's go!",
      instr: "Answer all 5 questions as fast as you can. You have 60 seconds!",
      timer: (s) => `${s}s`,
      q:     (n) => `Question ${n} / 5`,
      results: "Your Results",
      score:   (n) => `You got ${n} out of 5 correct!`,
      perfect: "PERFECT! You're a decimal star! 🌟",
      great:   "Great job! Keep practising!",
      good:    "Good effort! Try again to improve!",
    },
  },

  fr: {
    appTitle: "Décimale Sprint",
    heroTitle: "Multiplions les décimales ! 🎉",
    heroSub:   "Choisis un mini-jeu et commence à apprendre. Chacun t'enseigne une astuce super !",
    progressLabel: (done, total) => `${done} jeu${done>1?'x':''} sur ${total} terminé${done>1?'s':''}`,
    home: "🏠 Accueil",
    langBtn: "🇬🇧 EN",
    stars: ["☆☆☆", "⭐☆☆", "⭐⭐☆", "⭐⭐⭐"],
    gameLabel: (n) => `JEU ${n}`,
    checkBtn:  "Vérifier ✓",
    nextBtn:   "Suivant →",
    tryAgain:  "Réessayer",
    playAgain: "Rejouer",
    backHome:  "Accueil 🏠",
    correct:   "🎉 Bravo ! C'est exact !",
    wrong:     (ans) => `Pas tout à fait. La réponse est ${ans}. Continue !`,
    hint:      "Indice",

    games: [
      { title: "L'argent, c'est facile",  icon: "💰", sub: "Les décimales, c'est de l'argent !" },
      { title: "Addition répétée",         icon: "➕", sub: "Additionne étape par étape" },
      { title: "Oublie la virgule",        icon: "🔢", sub: "L'astuce en 3 étapes" },
      { title: "Blocs visuels",            icon: "🧱", sub: "Construis des groupes de blocs" },
      { title: "Sauts sur la droite",      icon: "📏", sub: "Saute jusqu'à la réponse !" },
      { title: "Exemples du quotidien",    icon: "🌍", sub: "Des problèmes de la vraie vie" },
      { title: "L'astuce d'estimation",   icon: "🎯", sub: "Estime d'abord, vérifie ensuite" },
      { title: "Méthode en colonne",       icon: "📐", sub: "La multiplication posée" },
      { title: "Nombres amis",             icon: "🤸", sub: "Gagne de la confiance" },
      { title: "Entraînement du jour",     icon: "⏱",  sub: "5 questions rapides" },
    ],

    g1: {
      title:   "L'argent, c'est facile 💰",
      sub:     "Les décimales, ce sont des euros et des centimes !",
      instr:   "Ajoute <strong>le même montant</strong> d'argent dans ton portefeuille pour chaque groupe. Puis trouve le total !",
      addDollar: "Ajouter 1,00 €",
      addDime:   "Ajouter 0,10 €",
      group:     (n) => `Groupe ${n}`,
      wallet:    "Ton portefeuille",
      total:     "Total en cours :",
      question:  (a, b) => `Si tu as ${b} groupes de ${a.toFixed(2).replace('.',',')} €, quel est le total ?`,
      enterAns:  "Entrer le total (€)",
    },

    g2: {
      title:  "Addition répétée ➕",
      sub:    "Multiplier, c'est additionner rapidement !",
      instr:  "Clique sur <strong>« Ajouter »</strong> pour additionner le nombre encore une fois et regarde le total grandir.",
      addBtn: (n) => `+ Ajouter ${n}`,
      sum:    "= Total :",
      question: (a, b) => `${a} × ${b}  =  ${a} + ${a} + … (${b} fois)`,
    },

    g3: {
      title: "Oublie la virgule 🔢",
      sub:   "3 étapes — ignore, multiplie, replace !",
      instr: "Suis les 3 étapes ci-dessous. Chaque étape débloque la suivante.",
      step1h: "Étape 1 — Ignore la virgule",
      step1p: (a, b) => `Combien font ${a} × ${b} ?`,
      step2h: "Étape 2 — Compte les chiffres après la virgule",
      step2p: (a) => `Combien y a-t-il de chiffres après la virgule dans ${a} ?`,
      step3h: "Étape 3 — Replace la virgule",
      step3p: (raw, digs) => `Prends ${raw} et déplace la virgule de ${digs} chiffre${digs>1?'s':''} vers la gauche.`,
      revealBtn: "Afficher",
    },

    g4: {
      title:   "Blocs visuels 🧱",
      sub:     "Construis chaque groupe avec des blocs !",
      instr:   "Chaque groupe a besoin de <strong>blocs entiers</strong> et de <strong>blocs dixièmes</strong>. Clique pour les ajouter.",
      whole:   "1 Entier",
      tenth:   "0,1 Dixième",
      reset:   "Réinitialiser",
      groups:  "Tes groupes",
      total:   "Total des blocs :",
    },

    g5: {
      title:   "Sauts sur la droite 📏",
      sub:     "Saute jusqu'à la réponse !",
      instr:   "Appuie sur <strong>Sauter !</strong> pour faire le prochain bond sur la droite graduée. Compte les sauts !",
      jumpBtn: "Sauter ! →",
      jumps:   (n, t) => `Saut ${n} sur ${t}`,
      landed:  (v) => `Tu as atterri sur ${String(v).replace('.',',')} ! C'est la réponse ! 🎉`,
    },

    g6: {
      title:  "Exemples du quotidien 🌍",
      sub:    "La vraie vie, ça aide à comprendre !",
      instr:  "Lis le problème, puis tape la réponse.",
      unit:   "",
      stories: [
        { emoji: "🪢", text: (a,b) => `Une corde mesure <strong>${String(a).replace('.',',')} m</strong>. Tu as <strong>${b} cordes</strong>. Quelle est la longueur totale ?`, unit: "m" },
        { emoji: "🍫", text: (a,b) => `Une tablette de chocolat pèse <strong>${String(a).replace('.',',')} kg</strong>. Tu en achètes <strong>${b}</strong>. Quel est le poids total ?`, unit: "kg" },
        { emoji: "🧃", text: (a,b) => `Chaque bouteille de jus contient <strong>${String(a).replace('.',',')} L</strong>. Tu as <strong>${b} bouteilles</strong>. Combien de litres au total ?`, unit: "L" },
        { emoji: "🪙", text: (a,b) => `Chaque pièce vaut <strong>${String(a).replace('.',',')} €</strong>. Tu en as <strong>${b}</strong>. Quel est le total ?`, unit: "€" },
        { emoji: "🎁", text: (a,b) => `Un ruban mesure <strong>${String(a).replace('.',',')} m</strong>. Tu as besoin de <strong>${b} rubans</strong>. Combien de mètres en tout ?`, unit: "m" },
      ],
    },

    g7: {
      title: "L'astuce d'estimation 🎯",
      sub:   "Arrondis d'abord — évite les erreurs à l'avance !",
      instr: "Phase 1 : <strong>arrondis</strong> la décimale au nombre entier le plus proche et estime. Phase 2 : trouve la réponse <strong>exacte</strong>.",
      phase1: "Phase 1 — Ton estimation",
      phase2: "Phase 2 — Réponse exacte",
      roundTo: (n) => `${n} s'arrondit à…`,
      estimate: "Estimation :",
      exact:    "Réponse exacte :",
      compare:  (est, real) => `Ton estimation était ${est} — la réponse exacte est ${String(real).replace('.',',')}. ${Math.abs(est-real) <= Math.abs(real)*.2 ? "Super estimation ! 🎯" : "C'est dans la même zone !"}`,
    },

    g8: {
      title: "Méthode en colonne 📐",
      sub:   "Pose et multiplie !",
      instr: "Multiplie normalement, puis <strong>clique au bon endroit</strong> pour placer la virgule.",
      placeDecimal: "Clique où la virgule doit aller :",
      correct: "Parfait ! Tu as bien placé la virgule ! 🎉",
      wrong:   "Pas là — réessaie !",
    },

    g9: {
      title: "Nombres amis 🤸",
      sub:   "Gagne de la confiance, étape par étape !",
      instr: "Résous chaque problème. Tu peux regarder un indice au besoin — mais essaie sans d'abord !",
      hintLabel: "Voir un indice :",
      hints: ["💰 Argent", "➕ Addition", "🔢 Ignore la virgule"],
      noHint: "Sans indice (3 ⭐)",
      withHint: "Indice utilisé (2 ⭐)",
    },

    g10: {
      title: "Entraînement du jour ⏱",
      sub:   "5 questions rapides — c'est parti !",
      instr: "Réponds aux 5 questions le plus vite possible. Tu as 60 secondes !",
      timer: (s) => `${s}s`,
      q:     (n) => `Question ${n} / 5`,
      results: "Tes résultats",
      score:   (n) => `Tu as eu ${n} bonne${n>1?'s':''} réponse${n>1?'s':''} sur 5 !`,
      perfect: "PARFAIT ! Tu es une star des décimales ! 🌟",
      great:   "Très bien ! Continue à t'entraîner !",
      good:    "Bon effort ! Réessaie pour t'améliorer !",
    },
  }
};
