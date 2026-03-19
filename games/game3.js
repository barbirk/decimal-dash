/* =========================================================
   GAME 3 — Ignore the Decimal Trick 🔢
   ========================================================= */

function loadGame3() {
  const problems = [
    [3.6, 4], [2.4, 3], [1.5, 6], [4.2, 5], [3.8, 3],
    [2.7, 4], [1.3, 7], [4.5, 2], [2.6, 5], [3.4, 4],
  ];
  let qIdx = 0;
  let stepsDone = 0;

  function currentProblem() { return problems[qIdx % problems.length]; }

  function decimalDigits(n) {
    const s = String(n);
    const dot = s.indexOf('.');
    return dot === -1 ? 0 : s.length - dot - 1;
  }

  function checkStep(step) {
    const [a, b] = currentProblem();
    const L = t().g3;
    const digits = decimalDigits(a);
    const whole = Math.round(a * Math.pow(10, digits)); // e.g. 3.6 → 36

    if (step === 1) {
      const val = parseInt(document.getElementById('g3-s1-input').value);
      const correct = whole * b;
      if (val === correct) {
        markStepDone(1, `✓ ${whole} × ${b} = ${correct}`);
        activateStep(2);
      } else {
        shakeInput('g3-s1-input');
        setFeedback('g3-s1-fb', t().wrong(correct), 'error');
      }
    } else if (step === 2) {
      const val = parseInt(document.getElementById('g3-s2-input').value);
      if (val === digits) {
        markStepDone(2, `✓ ${digits} digit${digits>1?'s':''} after the decimal`);
        activateStep(3);
        buildStep3();
      } else {
        shakeInput('g3-s2-input');
        setFeedback('g3-s2-fb', t().wrong(digits), 'error');
      }
    } else if (step === 3) {
      const raw = document.getElementById('g3-s3-input').value.replace(',','.');
      const correct = round2(a * b);
      if (Math.abs(parseFloat(raw) - correct) < 0.001) {
        markStepDone(3, `✓ ${fmtNum(correct)}`);
        awardStars(3, 3);
        launchConfetti();
        setFeedback('g3-fb', `🎉 ${fmtNum(a)} × ${b} = ${fmtNum(correct)}`, 'success');
        document.getElementById('g3-next').style.display = 'inline-block';
      } else {
        shakeInput('g3-s3-input');
        setFeedback('g3-s3-fb', t().wrong(fmtNum(correct)), 'error');
      }
    }
  }

  function buildStep3() {
    const [a, b] = currentProblem();
    const digits = decimalDigits(a);
    const whole = Math.round(a * Math.pow(10, digits));
    const raw = whole * b;
    const L = t().g3;
    const el = document.getElementById('g3-s3-body');
    if (el) el.innerHTML = `
      <p>${L.step3p(raw, digits)}</p>
      <div class="step-input-row" style="margin-top:.6rem">
        <input type="text" id="g3-s3-input" style="width:120px" inputmode="decimal"
               placeholder="${currentLang==='fr'?'Réponse':'Answer'}" />
        <button class="btn btn-primary btn-sm" onclick="g3Check(3)">${t().g3.revealBtn}</button>
        <div id="g3-s3-fb" class="feedback hidden" style="margin:0;font-size:.9rem"></div>
      </div>
    `;
  }

  function markStepDone(step, msg) {
    const el = document.getElementById(`g3-step-${step}`);
    if (el) {
      el.classList.remove('active');
      el.classList.add('done');
      const body = el.querySelector('.step-input-row') || el.querySelector('div');
      if (body) {
        const done = document.createElement('p');
        done.style.cssText = 'color:var(--green-500);font-weight:800;margin-top:.4rem';
        done.textContent = msg;
        el.appendChild(done);
      }
    }
    stepsDone++;
  }

  function activateStep(step) {
    const el = document.getElementById(`g3-step-${step}`);
    if (el) el.classList.add('active');
  }

  function shakeInput(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('wrong');
    setTimeout(() => el.classList.remove('wrong'), 400);
  }

  function nextQ() {
    qIdx++;
    stepsDone = 0;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    const Lg = L.g3;
    const digits = decimalDigits(a);
    const whole = Math.round(a * Math.pow(10, digits));

    stepsDone = 0;

    const html = gameShell(3, `
      <div class="instruction-card">${Lg.instr}</div>

      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
      </div>

      <div class="wizard-steps">

        <div class="wizard-step active" id="g3-step-1">
          <h4>${Lg.step1h}</h4>
          <p>${Lg.step1p(whole, b)}</p>
          <div class="step-input-row" style="margin-top:.6rem">
            <input type="number" id="g3-s1-input" style="width:120px" inputmode="numeric" />
            <button class="btn btn-primary btn-sm" onclick="g3Check(1)">${L.checkBtn}</button>
            <div id="g3-s1-fb" class="feedback hidden" style="margin:0;font-size:.9rem"></div>
          </div>
        </div>

        <div class="wizard-step" id="g3-step-2">
          <h4>${Lg.step2h}</h4>
          <p>${Lg.step2p(fmtNum(a))}</p>
          <div class="step-input-row" style="margin-top:.6rem">
            <input type="number" id="g3-s2-input" style="width:80px" min="1" max="3" inputmode="numeric" />
            <button class="btn btn-primary btn-sm" onclick="g3Check(2)">${L.checkBtn}</button>
            <div id="g3-s2-fb" class="feedback hidden" style="margin:0;font-size:.9rem"></div>
          </div>
        </div>

        <div class="wizard-step" id="g3-step-3">
          <h4>${Lg.step3h}</h4>
          <div id="g3-s3-body"><p style="color:var(--gray-400)">${currentLang==='fr'?'Complète les étapes précédentes…':'Complete the steps above…'}</p></div>
        </div>

      </div>

      <div id="g3-fb" class="feedback hidden" style="margin-top:1.2rem"></div>
      <div class="next-row">
        <button id="g3-next" class="btn btn-gold" style="display:none" onclick="g3Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
  }

  window.g3Check = checkStep;
  window.g3Next = nextQ;
  render();
}
