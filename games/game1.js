/* =========================================================
   GAME 1 — Money Model 💰
   ========================================================= */

function loadGame1() {
  const problems = [
    [3.5, 4], [2.5, 3], [1.5, 6], [4.5, 2], [0.5, 8],
  ];
  let qIdx = 0;
  let groups = [];

  function currentProblem() { return problems[qIdx % problems.length]; }

  function buildGroupsUI() {
    const [a, b] = currentProblem();
    let html = '';
    for (let i = 0; i < b; i++) {
      const g = groups[i] || [];
      html += `<div class="wallet-group" id="wg-${i}">`;
      g.forEach(coin => {
        html += `<span class="coin-chip">${coin === 1 ? (currentLang==='fr'?'1,00 €':'$1.00') : (currentLang==='fr'?'0,10 €':'$0.10')}</span>`;
      });
      html += `</div>`;
    }
    return html;
  }

  function calcTotal() {
    return round2(groups.flat().reduce((s, c) => s + c, 0));
  }

  function getActiveGroup() {
    const [, b] = currentProblem();
    for (let i = 0; i < b; i++) {
      const g = groups[i] || [];
      if (round2(g.reduce((s,c)=>s+c,0)) < round2(currentProblem()[0])) return i;
    }
    return b - 1;
  }

  function addCoin(val) {
    const [a, b] = currentProblem();
    const gi = getActiveGroup();
    if (!groups[gi]) groups[gi] = [];
    const groupTotal = round2((groups[gi] || []).reduce((s,c)=>s+c,0));
    if (groupTotal + val > a + 0.001) {
      setFeedback('g1-fb', currentLang==='fr' ? `Ce groupe est déjà plein ! Commence le suivant.` : `This group is full! Start the next one.`, 'info');
      return;
    }
    groups[gi].push(val);
    renderG1();
  }

  function renderG1() {
    const [a, b] = currentProblem();
    const L = t().g1;
    const total = calcTotal();
    const needed = round2(a * b);
    const allFilled = groups.flat().length > 0 && round2(groups.flat().reduce((s,c)=>s+c,0)) >= needed - 0.001;

    document.getElementById('g1-groups').innerHTML = buildGroupsUI();
    document.getElementById('g1-total').textContent = `${L.total} ${currentLang==='fr' ? fmtNum(total)+' €' : '$'+fmtNum(total)}`;
    const ansRow = document.getElementById('g1-ans-row');
    if (ansRow) ansRow.style.display = allFilled ? 'flex' : 'none';
    hideFeedback('g1-fb');
  }

  function checkG1() {
    const [a, b] = currentProblem();
    const correct = round2(a * b);
    const raw = document.getElementById('g1-input').value.replace(',','.');
    const ans = parseFloat(raw);
    const L = t();
    if (Math.abs(ans - correct) < 0.01) {
      setFeedback('g1-fb', L.correct, 'success');
      document.getElementById('g1-input').classList.add('correct');
      awardStars(1, 3);
      launchConfetti();
      document.getElementById('g1-next').style.display = 'inline-block';
    } else {
      setFeedback('g1-fb', L.wrong(fmtNum(correct)), 'error');
      document.getElementById('g1-input').classList.add('wrong');
      setTimeout(() => document.getElementById('g1-input')?.classList.remove('wrong'), 400);
    }
  }

  function nextG1() {
    qIdx++;
    groups = [];
    render();
  }

  function resetG1() {
    groups = [];
    hideFeedback('g1-fb');
    renderG1();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    const Lg = L.g1;
    groups = [];

    const html = gameShell(1, `
      <div class="instruction-card">${Lg.instr}</div>
      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
        <div class="sub-label">${Lg.question(a, b)}</div>
      </div>

      <div class="money-workspace">
        <div class="coin-tray">
          <h4>${currentLang==='fr' ? 'Clique pour ajouter' : 'Click to add'}</h4>
          <button class="coin-btn" onclick="g1AddCoin(1)">💶 ${Lg.addDollar}</button><br>
          <button class="coin-btn" onclick="g1AddCoin(0.1)">🪙 ${Lg.addDime}</button><br>
          <button class="btn btn-sm" style="margin-top:.6rem;background:var(--coral-200);color:var(--coral-500);border:none;font-family:var(--font);font-weight:800;cursor:pointer;border-radius:var(--radius-pill);padding:.4rem 1rem" onclick="g1Reset()">↩ ${Lg.reset||'Reset'}</button>
        </div>

        <div class="wallet-area">
          <h4>${Lg.wallet}</h4>
          <div id="g1-groups">${buildGroupsUI()}</div>
          <div class="running-total" id="g1-total"></div>
        </div>
      </div>

      <div id="g1-ans-row" class="answer-row" style="display:none">
        <input type="text" id="g1-input" placeholder="${Lg.enterAns}" inputmode="decimal" />
        <button class="btn btn-primary" onclick="checkG1()">${L.checkBtn}</button>
      </div>
      <div id="g1-fb" class="feedback hidden"></div>
      <button id="g1-next" class="btn btn-gold" style="display:none;margin:1rem auto" onclick="nextG1()">${L.nextBtn}</button>
    `);

    document.getElementById('game-container').innerHTML = html;
    renderG1();
  }

  // Expose functions
  window.g1AddCoin = addCoin;
  window.g1Reset = resetG1;
  window.checkG1 = checkG1;
  window.nextG1 = nextG1;

  render();
}
