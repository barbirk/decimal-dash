/* =========================================================
   APP.JS — Core app logic, routing, shared utilities
   ========================================================= */

// ── State ──────────────────────────────────────────────────
let currentLang = 'en';
let confettiAnimId = null;

const CARD_GRADIENTS = [
  'linear-gradient(90deg,#f5b731,#f05757)',
  'linear-gradient(90deg,#7c59e0,#1bb5a0)',
  'linear-gradient(90deg,#f05757,#f5b731)',
  'linear-gradient(90deg,#1bb5a0,#6340c9)',
  'linear-gradient(90deg,#6340c9,#f5b731)',
  'linear-gradient(90deg,#f5b731,#1bb5a0)',
  'linear-gradient(90deg,#f05757,#6340c9)',
  'linear-gradient(90deg,#1bb5a0,#f5b731)',
  'linear-gradient(90deg,#6340c9,#f05757)',
  'linear-gradient(90deg,#f5b731,#6340c9)',
];

// ── Language helpers ────────────────────────────────────────
function t() { return LANG[currentLang]; }

function toggleLang() {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  document.getElementById('lang-btn').textContent = t().langBtn;
  document.getElementById('app-title').textContent = t().appTitle;
  document.title = t().appTitle + ' — Decimals!';
  // Re-render home or current game
  if (!document.getElementById('home-screen').classList.contains('hidden')) {
    renderHome();
  }
}

// ── Progress (localStorage) ─────────────────────────────────
function getProgress() {
  try { return JSON.parse(localStorage.getItem('decimalDash') || '{}'); }
  catch { return {}; }
}
function saveProgress(gameId, stars) {
  const p = getProgress();
  p[gameId] = Math.max(p[gameId] || 0, stars);
  localStorage.setItem('decimalDash', JSON.stringify(p));
}
function getStars(gameId) { return getProgress()[gameId] || 0; }
function totalCompleted() {
  const p = getProgress();
  return Object.values(p).filter(v => v > 0).length;
}

// ── Home screen ─────────────────────────────────────────────
function renderHome() {
  const home = document.getElementById('home-screen');
  const game = document.getElementById('game-container');
  home.classList.remove('hidden');
  game.classList.add('hidden');
  game.innerHTML = '';

  const L = t();
  const done = totalCompleted();
  const total = 10;
  const pct = (done / total * 100).toFixed(0);

  home.innerHTML = `
    <div class="home-hero">
      <span class="home-hero-emoji">🔢</span>
      <h2>${L.heroTitle}</h2>
      <p>${L.heroSub}</p>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <p class="progress-label">${L.progressLabel(done, total)}</p>
    </div>

    <div class="games-grid">
      ${L.games.map((g, i) => {
        const stars = getStars(i + 1);
        const starStr = L.stars[stars];
        return `
          <div class="game-card" style="--card-gradient:${CARD_GRADIENTS[i]};animation-delay:${i * 0.05}s"
               onclick="showGame(${i + 1})" role="button" tabindex="0"
               aria-label="${g.title}">
            <span class="game-icon">${g.icon}</span>
            <span class="game-num">${L.gameLabel(i + 1)}</span>
            <div class="game-title">${g.title}</div>
            <div class="game-stars">${starStr}</div>
          </div>`;
      }).join('')}
    </div>
  `;

  // keyboard support
  home.querySelectorAll('.game-card').forEach((card, i) => {
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') showGame(i + 1); });
  });
}

function showHome() { renderHome(); stopConfetti(); }

// ── Game router ─────────────────────────────────────────────
const GAME_LOADERS = {
  1: () => loadGame1(),
  2: () => loadGame2(),
  3: () => loadGame3(),
  4: () => loadGame4(),
  5: () => loadGame5(),
  6: () => loadGame6(),
  7: () => loadGame7(),
  8: () => loadGame8(),
  9: () => loadGame9(),
  10: () => loadGame10(),
};

function showGame(id) {
  const home = document.getElementById('home-screen');
  const game = document.getElementById('game-container');
  home.classList.add('hidden');
  game.classList.remove('hidden');
  game.innerHTML = '';
  stopConfetti();
  if (GAME_LOADERS[id]) GAME_LOADERS[id]();
}

// ── Shared UI helpers ───────────────────────────────────────
function gameShell(id, bodyHTML) {
  const L = t();
  const g = L.games[id - 1];
  return `
    <div class="game-header">
      <span class="game-icon-lg">${g.icon}</span>
      <div class="game-header-text">
        <h2>${g.title}</h2>
        <p>${g.sub}</p>
      </div>
    </div>
    ${bodyHTML}
    <div class="next-row" style="margin-top:2rem">
      <button class="btn btn-sm" onclick="showHome()" style="background:var(--gray-200);color:var(--gray-600)">${L.backHome}</button>
    </div>
  `;
}

function setFeedback(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `feedback ${type}`;
}

function hideFeedback(id) {
  const el = document.getElementById(id);
  if (el) el.className = 'feedback hidden';
}

// ── Stars award ─────────────────────────────────────────────
function awardStars(gameId, stars) {
  saveProgress(gameId, stars);
  return LANG[currentLang].stars[stars];
}

// ── Confetti ─────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: 8 + Math.random() * 8,
    h: 4 + Math.random() * 6,
    color: ['#7c59e0','#f5b731','#1bb5a0','#f05757','#6340c9','#ffd04a'][Math.floor(Math.random()*6)],
    rot: Math.random() * 360,
    vx: (Math.random() - 0.5) * 2.5,
    vy: 2 + Math.random() * 3,
    vr: (Math.random() - 0.5) * 4,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    });
    confettiAnimId = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(stopConfetti, 3500);
}

function stopConfetti() {
  if (confettiAnimId) { cancelAnimationFrame(confettiAnimId); confettiAnimId = null; }
  const c = document.getElementById('confetti-canvas');
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
}

// ── Number helpers ───────────────────────────────────────────
function round2(n) { return Math.round(n * 100) / 100; }

function fmtNum(n) {
  const s = String(round2(n));
  return currentLang === 'fr' ? s.replace('.', ',') : s;
}

// Friendly problems pool
const FRIENDLY_PROBLEMS = [
  [0.5, 4], [1.2, 3], [2.5, 2], [3.4, 3], [0.6, 5],
  [4.1, 2], [1.5, 4], [2.4, 3], [3.6, 4], [0.8, 5],
  [1.1, 6], [2.2, 4], [0.7, 3], [1.4, 5], [3.2, 3],
];

function pickProblems(n, seed = Math.random()) {
  const shuffled = [...FRIENDLY_PROBLEMS].sort(() => seed - 0.5);
  return shuffled.slice(0, n);
}

// Bootstrap — called from index.html after all game scripts are loaded
function _boot() {
  const langBtn = document.getElementById('lang-btn');
  const titleEl = document.getElementById('app-title');
  if (langBtn) langBtn.textContent = t().langBtn;
  if (titleEl) titleEl.textContent = t().appTitle;
  renderHome();
}
