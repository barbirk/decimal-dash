/* =========================================================
   GAME 6 — Everyday Examples 🌍
   ========================================================= */

function loadGame6() {
  const sets = [
    [2.5, 3], [1.2, 4], [3.5, 2], [0.8, 5], [4.2, 3],
  ];
  let qIdx = 0;

  function currentSet() { return sets[qIdx % sets.length]; }
  function currentStory(L) {
    const stories = L.g6.stories;
    return stories[qIdx % stories.length];
  }

  function checkAns() {
    const [a, b] = currentSet();
    const correct = round2(a * b);
    const rawVal = document.getElementById('g6-input').value.replace(',','.');
    const ans = parseFloat(rawVal);
    const L = t();
    const story = currentStory(L);

    if (Math.abs(ans - correct) < 0.01) {
      setFeedback('g6-fb', `${L.correct} (${fmtNum(correct)} ${story.unit})`, 'success');
      document.getElementById('g6-input').classList.add('correct');
      awardStars(6, 3);
      launchConfetti();
      document.getElementById('g6-next').style.display = 'inline-block';
    } else {
      setFeedback('g6-fb', L.wrong(fmtNum(correct) + ' ' + story.unit), 'error');
      document.getElementById('g6-input').classList.add('wrong');
      setTimeout(() => document.getElementById('g6-input')?.classList.remove('wrong'), 400);
    }
  }

  function nextQ() {
    qIdx++;
    render();
  }

  function render() {
    const [a, b] = currentSet();
    const L = t();
    const story = currentStory(L);

    const html = gameShell(6, `
      <div class="instruction-card">${L.g6.instr}</div>

      <div class="story-card">
        <span class="story-emoji">${story.emoji}</span>
        <p>${story.text(a, b)}</p>
      </div>

      <div class="answer-row">
        <span style="font-size:1.1rem;font-weight:800;color:var(--gray-600)">${story.unit}</span>
        <input type="text" id="g6-input" inputmode="decimal"
               placeholder="${currentLang==='fr'?'Ta réponse':'Your answer'}" style="width:150px" />
        <button class="btn btn-primary" onclick="g6Check()">${L.checkBtn}</button>
      </div>

      <div id="g6-fb" class="feedback hidden"></div>
      <div class="next-row">
        <button id="g6-next" class="btn btn-gold" style="display:none" onclick="g6Next()">${L.nextBtn}</button>
      </div>
    `);

    document.getElementById('game-container').innerHTML = html;

    // Enter key support
    document.getElementById('g6-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') g6Check();
    });
  }

  window.g6Check = checkAns;
  window.g6Next = nextQ;
  render();
}
