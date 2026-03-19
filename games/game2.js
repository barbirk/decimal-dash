/* =========================================================
   GAME 2 — Repeated Addition ➕
   ========================================================= */

function loadGame2() {
  const problems = [
    [2.4, 3], [1.5, 4], [3.2, 3], [0.7, 5], [4.1, 2],
    [1.2, 6], [2.5, 4], [0.6, 7], [3.4, 3], [1.8, 5],
  ];
  let qIdx = 0;
  let addedCount = 0;
  let runningTotal = 0;

  function currentProblem() { return problems[qIdx % problems.length]; }

  function doAdd() {
    const [a, b] = currentProblem();
    if (addedCount >= b) return;
    addedCount++;
    runningTotal = round2(runningTotal + a);
    renderState();
  }

  function renderState() {
    const [a, b] = currentProblem();
    const L = t();

    // Build addend column
    const col = document.getElementById('g2-column');
    if (!col) return;
    col.innerHTML = '';
    for (let i = 0; i < addedCount; i++) {
      const div = document.createElement('div');
      div.className = 'addend';
      div.textContent = fmtNum(a);
      col.appendChild(div);
    }
    if (addedCount > 0) {
      const sum = document.createElement('div');
      sum.className = 'addend sum-row';
      sum.textContent = (addedCount < b ? '... ' : '= ') + fmtNum(runningTotal);
      col.appendChild(sum);
    }

    // Feedback and button state
    const btn = document.getElementById('g2-add-btn');
    if (btn) {
      btn.disabled = addedCount >= b;
      btn.textContent = L.g2.addBtn(fmtNum(a));
    }

    if (addedCount === b) {
      setFeedback('g2-fb', `${fmtNum(a)} × ${b} = ${fmtNum(runningTotal)} 🎉`, 'success');
      awardStars(2, 3);
      launchConfetti();
      const nr = document.getElementById('g2-next');
      if (nr) nr.style.display = 'inline-block';
    }
  }

  function nextQ() {
    qIdx++;
    addedCount = 0;
    runningTotal = 0;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    addedCount = 0;
    runningTotal = 0;

    const html = gameShell(2, `
      <div class="instruction-card">${L.g2.instr}</div>

      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
        <div class="sub-label">${L.g2.question(fmtNum(a), b)}</div>
      </div>

      <div style="text-align:center;margin:1.5rem 0">
        <button id="g2-add-btn" class="btn btn-primary" onclick="g2Add()">
          ${L.g2.addBtn(fmtNum(a))}
        </button>
      </div>

      <div class="addition-column" id="g2-column"></div>

      <div id="g2-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g2-next" class="btn btn-gold" style="display:none" onclick="g2Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
  }

  window.g2Add = doAdd;
  window.g2Next = nextQ;
  render();
}
