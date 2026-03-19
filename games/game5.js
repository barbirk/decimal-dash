/* =========================================================
   GAME 5 — Number Line Jumps 📏
   ========================================================= */

function loadGame5() {
  const problems = [
    [0.5, 4], [0.5, 6], [0.25, 4], [0.5, 8], [0.5, 10],
    [0.2, 5], [0.4, 5], [0.3, 4], [0.5, 3], [0.25, 8],
  ];
  let qIdx = 0;
  let jumpsLeft = 0;
  let currentPos = 0;
  let animating = false;

  function currentProblem() { return problems[qIdx % problems.length]; }

  function doJump() {
    if (animating || jumpsLeft <= 0) return;
    const [a] = currentProblem();
    animating = true;
    jumpsLeft--;
    const prevPos = currentPos;
    currentPos = round2(currentPos + a);

    const svg = document.getElementById('number-line-svg');
    if (!svg) { animating = false; return; }

    // Animate the marker
    const marker = svg.querySelector('#nl-marker');
    const [svgMinX, svgRange] = getNLRange();
    const svgW = svg.viewBox.baseVal.width || 700;

    const newX = svgMinX + (currentPos / (svgRange)) * (svgW - 60) + 30;
    if (marker) {
      marker.setAttribute('cx', newX);
      marker.style.transition = 'cx .45s ease';
    }

    // Draw arc
    drawArc(svg, prevPos, currentPos, svgMinX, svgRange, svgW);

    // Update label and counter
    updateNLUI();

    setTimeout(() => {
      animating = false;
      const [, b] = currentProblem();
      if (jumpsLeft === 0) {
        setFeedback('g5-fb', t().g5.landed(fmtNum(currentPos)), 'success');
        awardStars(5, 3);
        launchConfetti();
        document.getElementById('g5-next').style.display = 'inline-block';
        document.getElementById('g5-jump-btn').disabled = true;
      }
    }, 500);
  }

  function getNLRange() {
    const [a, b] = currentProblem();
    const max = round2(a * b);
    return [0, max + round2(a)];
  }

  function drawArc(svg, from, to, minX, range, svgW) {
    const usableW = svgW - 60;
    const x1 = minX + (from / range) * usableW + 30;
    const x2 = minX + (to / range) * usableW + 30;
    const y = 70;
    const mx = (x1 + x2) / 2;
    const my = y - 30;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y} Q ${mx} ${my} ${x2} ${y}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#7c59e0');
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('stroke-dasharray', '5 3');
    path.setAttribute('opacity', '0.7');
    svg.insertBefore(path, svg.querySelector('#nl-marker'));
  }

  function updateNLUI() {
    const [, b] = currentProblem();
    const jumpsDone = b - jumpsLeft;
    const ctr = document.getElementById('g5-jump-counter');
    if (ctr) ctr.textContent = t().g5.jumps(jumpsDone, b);
    const posLabel = document.getElementById('g5-pos-label');
    if (posLabel) posLabel.textContent = fmtNum(currentPos);

    const btn = document.getElementById('g5-jump-btn');
    if (btn) {
      btn.textContent = t().g5.jumpBtn;
      btn.disabled = jumpsLeft === 0;
    }
  }

  function buildSVG() {
    const [a, b] = currentProblem();
    const max = round2(a * b);
    const range = max + round2(a);
    const steps = b + 1;
    const svgW = 700;
    const svgH = 120;
    const usableW = svgW - 60;
    const y = 70;

    let ticks = '';
    let labels = '';
    for (let i = 0; i <= steps; i++) {
      const val = round2(a * i);
      const x = 30 + (val / range) * usableW;
      ticks += `<line x1="${x}" y1="${y-8}" x2="${x}" y2="${y+8}" stroke="#9893c0" stroke-width="2"/>`;
      labels += `<text x="${x}" y="${y+24}" text-anchor="middle" font-family="Nunito,sans-serif" font-size="13" fill="#5a5480" font-weight="700">${fmtNum(val)}</text>`;
    }

    return `
      <svg id="number-line-svg" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;overflow:visible">
        <!-- axis -->
        <line x1="20" y1="${y}" x2="${svgW-20}" y2="${y}" stroke="#9893c0" stroke-width="3" stroke-linecap="round"/>
        ${ticks}
        ${labels}
        <!-- marker -->
        <circle id="nl-marker" cx="30" cy="${y}" r="10" fill="#7c59e0" opacity="1"/>
        <text id="nl-marker-label" x="30" y="${y-18}" text-anchor="middle" font-family="Nunito,sans-serif" font-size="13" fill="#2d1b69" font-weight="900" id="g5-pos-label">0</text>
      </svg>`;
  }

  function nextQ() {
    qIdx++;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    jumpsLeft = b;
    currentPos = 0;
    animating = false;

    const html = gameShell(5, `
      <div class="instruction-card">${L.g5.instr}</div>
      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
        <div class="sub-label">${b} ${currentLang==='fr'?'sauts de':'jumps of'} ${fmtNum(a)}</div>
      </div>

      <div class="nl-container">${buildSVG()}</div>

      <div style="text-align:center;margin-bottom:1rem">
        <div id="g5-jump-counter" style="font-size:.9rem;font-weight:800;color:var(--gray-400);margin-bottom:.8rem">
          ${L.g5.jumps(0, b)}
        </div>
        <button id="g5-jump-btn" class="btn btn-primary" onclick="g5Jump()">${L.g5.jumpBtn}</button>
      </div>

      <div id="g5-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g5-next" class="btn btn-gold" style="display:none" onclick="g5Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
  }

  window.g5Jump = doJump;
  window.g5Next = nextQ;
  render();
}
