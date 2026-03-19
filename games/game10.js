/* =========================================================
   GAME 10 — Daily Drill ⏱
   ========================================================= */

function loadGame10() {
  const ALL_PROBLEMS = [
    [2.5, 2], [1.4, 3], [3.2, 4], [0.6, 5], [4.1, 2],
    [1.2, 6], [2.4, 3], [0.5, 8], [3.5, 2], [1.5, 4],
    [0.8, 5], [4.2, 3], [1.6, 4], [2.3, 5], [3.4, 2],
  ];

  const TOTAL_Q = 5;
  const TIME_LIMIT = 60;

  let questions = [];
  let currentQ = 0;
  let score = 0;
  let timerInterval = null;
  let timeLeft = TIME_LIMIT;
  let answers = [];
  let started = false;

  function pickQuestions() {
    const shuffled = [...ALL_PROBLEMS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, TOTAL_Q);
  }

  function startDrill() {
    questions = pickQuestions();
    currentQ = 0;
    score = 0;
    answers = [];
    timeLeft = TIME_LIMIT;
    started = true;
    renderQuestion();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerUI();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // Auto-submit current empty if needed
        if (currentQ < TOTAL_Q) {
          answers.push({ q: questions[currentQ], given: null, correct: false });
          currentQ = TOTAL_Q;
        }
        showResults();
      }
    }, 1000);
  }

  function updateTimerUI() {
    const fill = document.getElementById('g10-timer-fill');
    const label = document.getElementById('g10-timer-label');
    if (fill) fill.style.width = `${(timeLeft / TIME_LIMIT) * 100}%`;
    if (label) label.textContent = t().g10.timer(timeLeft);
  }

  function submitAnswer() {
    if (currentQ >= TOTAL_Q) return;
    const [a, b] = questions[currentQ];
    const correct = round2(a * b);
    const raw = document.getElementById('g10-answer').value.replace(',','.');
    const given = parseFloat(raw);
    const isCorrect = Math.abs(given - correct) < 0.01;

    answers.push({ q: [a, b], given, correct: isCorrect, correctAns: correct });
    if (isCorrect) {
      score++;
      setFeedback('g10-fb', '✓ ' + t().correct, 'success');
    } else {
      setFeedback('g10-fb', '✗ ' + (currentLang==='fr' ? `C'était ${fmtNum(correct)}` : `It was ${fmtNum(correct)}`), 'error');
    }

    currentQ++;
    setTimeout(() => {
      hideFeedback('g10-fb');
      if (currentQ < TOTAL_Q) {
        renderQuestion();
      } else {
        clearInterval(timerInterval);
        showResults();
      }
    }, 800);
  }

  function renderQuestion() {
    const [a, b] = questions[currentQ];
    const L = t().g10;

    const qArea = document.getElementById('g10-q-area');
    if (!qArea) return;

    qArea.innerHTML = `
      <div class="drill-counter">${L.q(currentQ + 1)}</div>
      <div class="problem-display" style="margin-bottom:1rem">
        <div class="equation">${fmtNum(a)} × ${b} = ?</div>
      </div>
      <div class="answer-row">
        <input type="text" id="g10-answer" inputmode="decimal" autofocus
               placeholder="${currentLang==='fr'?'Réponse':'Answer'}" style="width:140px" />
        <button class="btn btn-primary" onclick="g10Submit()">${t().checkBtn}</button>
      </div>
      <div id="g10-fb" class="feedback hidden"></div>
    `;
    // Auto-focus input and allow Enter
    setTimeout(() => {
      const inp = document.getElementById('g10-answer');
      if (inp) {
        inp.focus();
        inp.addEventListener('keydown', e => { if(e.key==='Enter') g10Submit(); });
      }
    }, 50);
  }

  function showResults() {
    clearInterval(timerInterval);
    const L = t().g10;
    const stars = score === 5 ? 3 : score >= 3 ? 2 : score >= 1 ? 1 : 0;
    awardStars(10, stars);
    if (score === 5) launchConfetti();

    let msg = score === 5 ? L.perfect : score >= 3 ? L.great : L.good;
    let resultRows = answers.map(a => `
      <div class="drill-result-row">
        <span class="eq">${fmtNum(a.q[0])} × ${a.q[1]}</span>
        <span class="ans">${a.given !== null ? fmtNum(a.given) : (currentLang==='fr'?'Sans réponse':'—')}</span>
        <span class="icon">${a.correct ? '✅' : `❌ (${fmtNum(a.correctAns)})`}</span>
      </div>`).join('');

    const qArea = document.getElementById('g10-q-area');
    if (!qArea) return;
    qArea.innerHTML = `
      <div class="score-panel">
        <div class="score-stars">${LANG[currentLang].stars[stars]}</div>
        <h3>${L.score(score)}</h3>
        <p>${msg}</p>
      </div>
      <h4 style="font-weight:800;color:var(--gray-600);margin:1.2rem 0 .6rem">${L.results}</h4>
      <div class="drill-results">${resultRows}</div>
      <div class="next-row" style="margin-top:1.2rem">
        <button class="btn btn-gold" onclick="g10Restart()">${t().playAgain}</button>
        <button class="btn" style="background:var(--gray-200);color:var(--gray-600)" onclick="showHome()">${t().backHome}</button>
      </div>
    `;

    // Hide timer
    const tbar = document.getElementById('g10-timer-bar');
    if (tbar) tbar.style.display = 'none';
  }

  function restart() {
    clearInterval(timerInterval);
    render();
  }

  function render() {
    const L = t();
    const Lg = L.g10;
    started = false;

    const html = gameShell(10, `
      <div class="instruction-card">${Lg.instr}</div>

      <div id="g10-timer-bar" class="drill-timer-bar">
        <div id="g10-timer-fill" class="drill-timer-fill" style="width:100%"></div>
      </div>
      <div style="text-align:right;font-size:.9rem;font-weight:800;color:var(--gray-600);margin-top:-.6rem;margin-bottom:.4rem" id="g10-timer-label">${Lg.timer(TIME_LIMIT)}</div>

      <div id="g10-q-area" style="text-align:center">
        <button class="btn btn-primary" style="font-size:1.2rem;padding:.8rem 2.5rem;margin-top:1.5rem" onclick="g10Start()">
          ${currentLang==='fr' ? '🚀 Commencer !' : '🚀 Start!'}
        </button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
  }

  window.g10Start = startDrill;
  window.g10Submit = submitAnswer;
  window.g10Restart = restart;
  render();
}
