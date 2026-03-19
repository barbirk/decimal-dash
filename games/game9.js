/* =========================================================
   GAME 9 — Friendly Numbers Practice 🤸
   ========================================================= */

function loadGame9() {
  const problems = [
    [0.5, 4], [1.2, 3], [2.5, 2], [3.4, 3], [0.6, 5],
    [4.1, 2], [1.5, 4], [2.4, 3], [0.8, 5], [1.1, 6],
  ];
  let qIdx = 0;
  let hintUsed = false;

  function currentProblem() { return problems[qIdx % problems.length]; }

  function showHint(type) {
    const [a, b] = currentProblem();
    hintUsed = true;
    let msg = '';
    if (type === 0) { // Money
      msg = currentLang === 'fr'
        ? `💰 Pense à ${fmtNum(a)} € × ${b} groupes. Ajoute ${fmtNum(a)} € à chaque fois !`
        : `💰 Think of $${fmtNum(a)} × ${b} groups. Add $${fmtNum(a)} each time!`;
    } else if (type === 1) { // Addition
      const adds = Array.from({length: b}, () => fmtNum(a)).join(' + ');
      msg = `➕ ${adds} = ?`;
    } else { // Ignore decimal
      const digits = String(a).includes('.') ? String(a).split('.')[1].length : 0;
      const whole = Math.round(a * Math.pow(10, digits));
      msg = currentLang === 'fr'
        ? `🔢 ${whole} × ${b} = ${whole * b} → place la virgule → ${fmtNum(round2(a*b))}`
        : `🔢 ${whole} × ${b} = ${whole * b} → place decimal → ${fmtNum(round2(a*b))}`;
    }
    document.getElementById('g9-hint-box').innerHTML = `<div class="feedback info" style="margin:0">${msg}</div>`;
  }

  function checkAns() {
    const [a, b] = currentProblem();
    const correct = round2(a * b);
    const raw = document.getElementById('g9-input').value.replace(',','.');
    const ans = parseFloat(raw);
    const L = t();

    if (Math.abs(ans - correct) < 0.01) {
      const stars = hintUsed ? 2 : 3;
      awardStars(9, stars);
      setFeedback('g9-fb', `${L.correct} ${L.stars[stars]}`, 'success');
      document.getElementById('g9-input').classList.add('correct');
      launchConfetti();
      document.getElementById('g9-next').style.display = 'inline-block';
      document.getElementById('g9-check').disabled = true;
    } else {
      setFeedback('g9-fb', L.wrong(fmtNum(correct)), 'error');
      document.getElementById('g9-input').classList.add('wrong');
      setTimeout(() => document.getElementById('g9-input')?.classList.remove('wrong'), 400);
    }
  }

  function nextQ() {
    qIdx++;
    hintUsed = false;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    const Lg = L.g9;
    hintUsed = false;

    const html = gameShell(9, `
      <div class="instruction-card">${Lg.instr}</div>

      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
        <div class="sub-label">${currentLang==='fr'?'Calcule le résultat.':'Calculate the result.'}</div>
      </div>

      <div style="margin:1.2rem 0">
        <p style="text-align:center;font-size:.9rem;font-weight:800;color:var(--gray-400);margin-bottom:.6rem">${Lg.hintLabel}</p>
        <div class="quiz-hint-bar">
          ${Lg.hints.map((h, i) => `<button class="hint-chip" onclick="g9Hint(${i})">${h}</button>`).join('')}
        </div>
        <div id="g9-hint-box"></div>
      </div>

      <div class="answer-row">
        <input type="text" id="g9-input" inputmode="decimal"
               placeholder="${currentLang==='fr'?'Réponse':'Answer'}" style="width:140px" />
        <button id="g9-check" class="btn btn-primary" onclick="g9Check()">${L.checkBtn}</button>
      </div>

      <div id="g9-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g9-next" class="btn btn-gold" style="display:none" onclick="g9Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
    document.getElementById('g9-input').addEventListener('keydown', e => { if(e.key==='Enter') g9Check(); });
  }

  window.g9Hint = showHint;
  window.g9Check = checkAns;
  window.g9Next = nextQ;
  render();
}
