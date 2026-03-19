/* =========================================================
   GAME 7 — Estimation Trick 🎯
   ========================================================= */

function loadGame7() {
  const problems = [
    [3.6, 4], [2.7, 3], [4.4, 5], [1.8, 6], [3.2, 4],
    [2.3, 7], [4.7, 3], [1.6, 8], [2.8, 5], [3.9, 4],
  ];
  let qIdx = 0;
  let phase = 1; // 1 = estimate, 2 = exact

  function currentProblem() { return problems[qIdx % problems.length]; }

  function checkEstimate() {
    const [a, b] = currentProblem();
    const rounded = Math.round(a);
    const expected = rounded * b;
    const raw = document.getElementById('g7-est-input').value.replace(',','.');
    const ans = parseFloat(raw);

    if (isNaN(ans)) {
      setFeedback('g7-fb', currentLang==='fr' ? 'Entre un nombre !' : 'Enter a number!', 'error');
      return;
    }

    // Accept if they got the rounded × b correct
    if (Math.abs(ans - expected) < 0.5) {
      document.getElementById('g7-est-input').classList.add('correct');
      document.getElementById('g7-est-check').disabled = true;
      document.getElementById('g7-rounded').textContent = rounded;
      document.getElementById('g7-est-show').textContent = fmtNum(ans);
      hideFeedback('g7-fb');
      // Reveal phase 2
      document.getElementById('g7-phase2').style.display = 'block';
      phase = 2;
    } else {
      shakeEl('g7-est-input');
      setFeedback('g7-fb', currentLang==='fr'
        ? `Essaie encore : ${fmtNum(a)} ≈ ${rounded}, donc ${rounded} × ${b} = ?`
        : `Try again: ${fmtNum(a)} ≈ ${rounded}, so ${rounded} × ${b} = ?`, 'info');
    }
  }

  function checkExact() {
    const [a, b] = currentProblem();
    const correct = round2(a * b);
    const raw = document.getElementById('g7-exact-input').value.replace(',','.');
    const ans = parseFloat(raw);
    const est = parseFloat(document.getElementById('g7-est-input').value.replace(',','.'));

    if (Math.abs(ans - correct) < 0.01) {
      document.getElementById('g7-exact-input').classList.add('correct');
      document.getElementById('g7-exact-check').disabled = true;
      setFeedback('g7-fb', t().g7.compare(fmtNum(est), fmtNum(correct)), 'success');
      awardStars(7, 3);
      launchConfetti();
      document.getElementById('g7-next').style.display = 'inline-block';
    } else {
      shakeEl('g7-exact-input');
      setFeedback('g7-fb', t().wrong(fmtNum(correct)), 'error');
    }
  }

  function shakeEl(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('wrong');
    setTimeout(() => el?.classList.remove('wrong'), 400);
  }

  function nextQ() {
    qIdx++;
    phase = 1;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    const Lg = L.g7;
    const rounded = Math.round(a);
    phase = 1;

    const html = gameShell(7, `
      <div class="instruction-card">${Lg.instr}</div>

      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
      </div>

      <!-- Phase 1 -->
      <div class="estimation-boxes">
        <div class="est-box">
          <div class="label">${currentLang==='fr'?'Nombre décimal':'Decimal'}</div>
          <div class="value">${fmtNum(a)}</div>
        </div>
        <div class="est-box">
          <div class="label">${Lg.roundTo(fmtNum(a))}</div>
          <div class="value" id="g7-rounded">?</div>
        </div>
        <div class="est-box">
          <div class="label">${Lg.estimate}</div>
          <div class="value" id="g7-est-show">?</div>
        </div>
      </div>

      <h4 style="text-align:center;color:var(--purple-700);font-size:1.1rem;margin-bottom:.8rem">${Lg.phase1}</h4>
      <p style="text-align:center;color:var(--gray-600);margin-bottom:.8rem">
        ${fmtNum(a)} ≈ ${rounded} &nbsp;→&nbsp; ${rounded} × ${b} = ?
      </p>
      <div class="answer-row">
        <input type="text" id="g7-est-input" inputmode="decimal"
               placeholder="${currentLang==='fr'?'Estimation':'Estimate'}" style="width:130px" />
        <button id="g7-est-check" class="btn btn-teal" onclick="g7CheckEst()">${L.checkBtn}</button>
      </div>

      <!-- Phase 2 -->
      <div id="g7-phase2" style="display:none;margin-top:1.8rem;padding-top:1.4rem;border-top:2px dashed var(--gray-200)">
        <h4 style="text-align:center;color:var(--purple-700);font-size:1.1rem;margin-bottom:.8rem">${Lg.phase2}</h4>
        <p style="text-align:center;color:var(--gray-600);margin-bottom:.8rem">
          ${Lg.exact} ${fmtNum(a)} × ${b} = ?
        </p>
        <div class="answer-row">
          <input type="text" id="g7-exact-input" inputmode="decimal"
                 placeholder="${currentLang==='fr'?'Réponse exacte':'Exact answer'}" style="width:130px" />
          <button id="g7-exact-check" class="btn btn-primary" onclick="g7CheckExact()">${L.checkBtn}</button>
        </div>
      </div>

      <div id="g7-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g7-next" class="btn btn-gold" style="display:none" onclick="g7Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
    document.getElementById('g7-est-input').addEventListener('keydown', e => { if(e.key==='Enter') g7CheckEst(); });
    document.getElementById('g7-phase2')?.querySelector('input')?.addEventListener('keydown', e => { if(e.key==='Enter') g7CheckExact(); });
  }

  window.g7CheckEst = checkEstimate;
  window.g7CheckExact = checkExact;
  window.g7Next = nextQ;
  render();
}
