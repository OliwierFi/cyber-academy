
// Main app logic (simplified)
// Loads flashcards, renders UI, theme toggle, basic nav, and avatar handling
import { REAL_FLASHCARDS } from './flashcards.js';

let state = {
  fcQueue: [...REAL_FLASHCARDS],
  fcIndex: 0,
  user: null
};

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return document.querySelectorAll(sel); }

function showSection(name){
  document.querySelectorAll('.section').forEach(s=>s.style.display='none');
  const el = document.getElementById(name);
  if(el) el.style.display='block';
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.section===name));
}

$all('.nav-btn').forEach(b=> b.onclick = ()=> showSection(b.dataset.section) );
showSection('dashboard');

function renderFlashcard(){
  if(!state.fcQueue.length){ $('#flashcardBox').innerText='Brak fiszek'; return; }
  const f = state.fcQueue[state.fcIndex % state.fcQueue.length];
  $('#flashcardBox').innerHTML = `<div><strong>${f.q}</strong></div>`;
  $('#flashcardBox').onclick = ()=> { $('#flashcardBox').innerHTML = `<div><strong>${f.q}</strong><p style="margin-top:8px;color:var(--muted)">${f.a}</p></div>`; };
}

$('#btnKnow').onclick = ()=> { addXP(10); state.fcIndex++; renderFlashcard(); };
$('#btnDont').onclick = ()=> { $('#flashcardBox').click(); };
$('#btnShuffle').onclick = ()=> { state.fcQueue.sort(()=>Math.random()-0.5); state.fcIndex=0; renderFlashcard(); };

document.getElementById('themeToggle').onclick = ()=> { document.body.classList.toggle('light'); localStorage.setItem('theme', document.body.classList.contains('light')?'light':'dark'); };
document.getElementById('loginBtn').onclick = ()=> { alert('Użyj Firebase login (skonfiguruj firebase-config.js)'); };

function addXP(v){ const p = JSON.parse(localStorage.getItem('cyber_progress')||'{}'); p.xp = (p.xp||0)+v; localStorage.setItem('cyber_progress', JSON.stringify(p)); updateUI(); }
function updateUI(){ const p = JSON.parse(localStorage.getItem('cyber_progress')||'{}'); document.getElementById('recommended').innerHTML = `<div class='card'>Twoje XP: ${p.xp||0}</div>`; }

renderFlashcard();
updateUI();
