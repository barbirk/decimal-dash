/* =========================================================
   GAME 8 — Vertical Method 📐
   ========================================================= */

function loadGame8() {
  const problems = [
    [2.4, 3], [3.6, 4], [1.5, 6], [4.2, 5], [2.7, 3],
    [1.8, 4], [3.4, 5], [2.3, 7], [4.5, 2], [1.6, 8],
  ];
  let qIdx = 0;
  let productRevealed = false;

  function currentProblem() { return problems[qIdx % problems.length]; }

  function decimalDigits(n) {
    const s = String(n);
    const dot = s.indexOf('.');
    return dot === -1 ? 0 : s.length - dot - 1;
  }

  function checkProduct() {
    const [a, b] = currentProblem();
    const digits = decimalDigits(a);
    const whole = Math.round(a * Math.pow(10, digits));
    const rawProduct = whole * b;
    const val = parseInt(document.getElementById('g8-product-input').value);

    if (val === rawProduct) {
      productRevealed = true;
      document.getElementById('g8-product-input').classList.add('correct');
      document.getElementById('g8-product-check').disabled = true;
      document.getElementById('g8-product-display').textContent = rawProduct;
      document.getElementById('g8-step2').style.display = 'block';
      buildDecimalPlacer(rawProduct, digits);
      hideFeedback('g8-fb');
    } else {
      document.getElementById('g8-product-input').classList.add('wrong');
      setTimeout(() => document.getElementById('g8-product-input')?.classList.remove('wrong'), 400);
      setFeedback('g8-fb', t().wrong(rawProduct), 'error');
    }
  }

  function buildDecimalPlacer(rawProduct, digits) {
    const str = String(rawProduct);
    // Show digits as clickable positions to drop decimal between
    // Positions: 0 = before first digit, ..., str.length = after last digit
    const L = t().g8;
    let html = `<p style="margin-bottom:.8rem;color:var(--gray-600)">${L.placeDecimal}</p>`;
    html += `<div style="display:flex;align-items:center;justify-content:center;gap:2px;font-size:2rem;font-weight:900;font-family:'Courier New',monospace">`;

    for (let i = 0; i <= str.length; i++) {
      // Decimal position button (skip position 0 and end, only valid inner positions)
      if (i > 0 && i < str.length) {
        html += `<button class="dp-btn" id="dp-${i}" onclick="g8PlaceDot(${i},${digits},${str.length})" title="${currentLang==='fr'?'Placer la virgule ici':'Place decimal here'}">·</button>`;
      }
      if (i < str.length) {
        html += `<span style="color:var(--purple-700)">${str[i]}</span>`;
      }
    }
    html += `</div>`;

    const el = document.getElementById('g8-dp-area');
    if (el) el.innerHTML = html;
  }

  function placeDot(pos, correctDigits, len) {
    // Correct position from right = correctDigits
    const correctPos = len - correctDigits;
    if (pos === correctPos) {
      // Mark correct
      document.querySelectorAll('.dp-btn').forEach(b => b.disabled = true);
      document.getElementById(`dp-${pos}`).classList.add('selected');
      const [a, b2] = currentProblem();
      const correct = round2(a * b2);
      setFeedback('g8-fb', `${t().g8.correct} → ${fmtNum(correct)}`, 'success');
      awardStars(8, 3);
      launchConfetti();
      document.getElementById('g8-next').style.display = 'inline-block';
    } else {
      document.getElementById(`dp-${pos}`).style.background = '#f05757';
      document.getElementById(`dp-${pos}`).style.borderColor = '#f05757';
      setTimeout(() => {
        const btn = document.getElementById(`dp-${pos}`);
        if (btn) { btn.style.background = ''; btn.style.borderColor = ''; }
      }, 500);
      setFeedback('g8-fb', t().g8.wrong, 'error');
    }
  }

  function nextQ() {
    qIdx++;
    productRevealed = false;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    const Lg = L.g8;
    const digits = decimalDigits(a);
    const whole = Math.round(a * Math.pow(10, digits));
    productRevealed = false;

    const html = gameShell(8, `
      <div class="instruction-card">${Lg.instr}</div>

      <div style="text-align:center">
        <div class="vertical-display">
          <div class="v-num">${fmtNum(a)}</div>
          <div class="v-multiplier">× ${b}</div>
          <div class="v-line"></div>
          <div class="v-result" id="g8-product-display" style="color:var(--gray-400)">?</div>
        </div>
      </div>

      <!-- Step 1: Find the product without decimal -->
      <div style="margin:1.2rem 0">
        <p style="text-align:center;color:var(--gray-600);margin-bottom:.8rem">
          ${currentLang==='fr'
            ? `<strong>Étape 1 :</strong> Multiplie ${whole} × ${b} = ?`
            : `<strong>Step 1:</strong> Multiply ${whole} × ${b} = ?`}
        </p>
        <div class="answer-row">
          <input type="number" id="g8-product-input" inputmode="numeric" style="width:130px" />
          <button id="g8-product-check" class="btn btn-primary" onclick="g8CheckProduct()">${L.checkBtn}</button>
        </div>
      </div>

      <!-- Step 2: Place the decimal -->
      <div id="g8-step2" style="display:none;margin:1.5rem 0;padding-top:1.2rem;border-top:2px dashed var(--gray-200)">
        <p style="text-align:center;color:var(--gray-600);margin-bottom:.6rem">
          ${currentLang==='fr'
            ? `<strong>Étape 2 :</strong> ${fmtNum(a)} a ${digits} chiffre${digits>1?'s':''} après la virgule.`
            : `<strong>Step 2:</strong> ${fmtNum(a)} has ${digits} decimal digit${digits>1?'s':''}.`}
        </p>
        <div id="g8-dp-area"></div>
      </div>

      <div id="g8-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g8-next" class="btn btn-gold" style="display:none" onclick="g8Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
    document.getElementById('g8-product-input').addEventListener('keydown', e => { if(e.key==='Enter') g8CheckProduct(); });
  }

  window.g8CheckProduct = checkProduct;
  window.g8PlaceDot = placeDot;
  window.g8Next = nextQ;
  render();
}
