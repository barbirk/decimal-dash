/* =========================================================
   GAME 4 — Visual Blocks 🧱
   ========================================================= */

function loadGame4() {
  const problems = [
    [1.2, 3], [2.3, 4], [1.4, 5], [3.1, 3], [2.2, 4],
    [1.3, 6], [0.4, 5], [2.1, 3], [1.1, 7], [3.2, 3],
  ];
  let qIdx = 0;
  // groupBlocks[i] = { whole: n, tenths: n }
  let groupBlocks = [];

  function currentProblem() { return problems[qIdx % problems.length]; }

  function wholes(n) { return Math.floor(n); }
  function tenths(n) { return Math.round((n - Math.floor(n)) * 10); }

  function initGroups() {
    const [, b] = currentProblem();
    groupBlocks = Array.from({ length: b }, () => ({ whole: 0, tenth: 0 }));
  }

  function addBlock(groupIdx, type) {
    const [a] = currentProblem();
    const g = groupBlocks[groupIdx];
    const maxW = wholes(a);
    const maxT = tenths(a);
    if (type === 'whole' && g.whole < maxW) { g.whole++; }
    else if (type === 'tenth' && g.tenth < maxT) { g.tenth++; }
    else {
      setFeedback('g4-fb', currentLang==='fr' ? 'Ce groupe est déjà complet !' : 'This group is already full!', 'info');
      return;
    }
    renderBlocks();
    checkAllDone();
  }

  function resetGroup(i) {
    groupBlocks[i] = { whole: 0, tenth: 0 };
    hideFeedback('g4-fb');
    renderBlocks();
  }

  function renderBlocks() {
    const [a, b] = currentProblem();
    const container = document.getElementById('g4-groups');
    if (!container) return;
    container.innerHTML = '';
    groupBlocks.forEach((g, i) => {
      const row = document.createElement('div');
      row.className = 'group-row';
      const label = document.createElement('span');
      label.className = 'group-label';
      label.textContent = `${i + 1}.`;
      row.appendChild(label);
      // whole blocks
      for (let w = 0; w < g.whole; w++) {
        const b2 = document.createElement('span');
        b2.className = 'visual-block vb-whole';
        b2.textContent = currentLang==='fr' ? '1 entier' : '1 whole';
        row.appendChild(b2);
      }
      // tenth blocks
      for (let tt = 0; tt < g.tenth; tt++) {
        const b2 = document.createElement('span');
        b2.className = 'visual-block vb-tenth';
        b2.textContent = currentLang==='fr' ? '0,1' : '0.1';
        row.appendChild(b2);
      }
      container.appendChild(row);
    });

    // Show total
    const totalWholes = groupBlocks.reduce((s,g) => s+g.whole, 0);
    const totalTenths = groupBlocks.reduce((s,g) => s+g.tenth, 0);
    const total = round2(totalWholes + totalTenths * 0.1);
    const totalEl = document.getElementById('g4-total');
    if (totalEl) totalEl.textContent = `${t().g4.total} ${fmtNum(total)}`;
  }

  function checkAllDone() {
    const [a, b] = currentProblem();
    const W = wholes(a), T = tenths(a);
    const allDone = groupBlocks.every(g => g.whole === W && g.tenth === T);
    if (allDone) {
      const correct = round2(a * b);
      setFeedback('g4-fb', `${fmtNum(a)} × ${b} = ${fmtNum(correct)} 🎉`, 'success');
      awardStars(4, 3);
      launchConfetti();
      const btn = document.getElementById('g4-next');
      if (btn) btn.style.display = 'inline-block';
    }
  }

  function nextQ() {
    qIdx++;
    render();
  }

  function render() {
    const [a, b] = currentProblem();
    const L = t();
    const Lg = L.g4;
    initGroups();

    // Build add-block buttons per group
    let groupBtns = '';
    for (let i = 0; i < b; i++) {
      groupBtns += `
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-bottom:.5rem">
          <span style="font-size:.85rem;font-weight:800;color:var(--gray-600);min-width:70px">${currentLang==='fr'?'Groupe':'Group'} ${i+1}:</span>
          <button class="block-btn block-whole" onclick="g4Add(${i},'whole')">${Lg.whole}</button>
          <button class="block-btn block-tenth" onclick="g4Add(${i},'tenth')">${Lg.tenth}</button>
          <button class="btn btn-sm" style="background:var(--gray-200);color:var(--gray-600);border:none;font-family:var(--font);font-weight:700;cursor:pointer;border-radius:var(--radius-pill);padding:.3rem .8rem" onclick="g4Reset(${i})">↩</button>
        </div>`;
    }

    const html = gameShell(4, `
      <div class="instruction-card">${Lg.instr}</div>
      <div class="problem-display">
        <div class="equation">${fmtNum(a)} × ${b}</div>
        <div class="sub-label">
          ${fmtNum(a)} = ${wholes(a)} ${currentLang==='fr'?'entier':'whole'}${wholes(a)!==1?'s':''} + ${tenths(a)} × 0.${tenths(a)*0===0?'':''}<span style="color:var(--gold-500)">0.1</span>
        </div>
      </div>

      <div class="blocks-workspace">
        <div class="block-palette">
          <h4>${currentLang==='fr'?'Clique pour ajouter':'Click to add'}</h4>
          ${groupBtns}
        </div>
        <div class="groups-area">
          <h4>${Lg.groups}</h4>
          <div id="g4-groups"></div>
          <div style="font-size:1.2rem;font-weight:900;color:var(--purple-700);margin-top:.8rem" id="g4-total"></div>
        </div>
      </div>

      <div id="g4-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g4-next" class="btn btn-gold" style="display:none" onclick="g4Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;
    renderBlocks();
  }

  window.g4Add = addBlock;
  window.g4Reset = resetGroup;
  window.g4Next = nextQ;
  render();
}
