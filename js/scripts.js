import { LESSONS } from './lessons.js';
import { REAL_FLASHCARDS } from './flashcards.js';
import { QUIZZES } from './quizzes.js';
import { PROJECTS } from './projects.js';
import { MISSIONS } from './missions.js';

let state = { fcQueue: [...REAL_FLASHCARDS], fcIndex: 0, user: null };

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

function renderLessons(){
  const container = $('#lessons'); container.innerHTML = '';
  Object.entries(LESSONS).forEach(([id,l])=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<div style="display:flex;justify-content:space-between"><div><strong>${l.title}</strong><div class="small">${l.cat}</div></div><div><button class="btn" data-id="${id}">Otwórz</button></div></div><p class="small">${l.content.replace(/<[^>]+>/g,'').slice(0,160)}...</p>`;
    container.appendChild(div);
  });
  container.querySelectorAll('.btn').forEach(btn=>btn.onclick=(e)=>{ const id=e.target.dataset.id; const L=LESSONS[id]; if(L) showModal(`<h2>${L.title}</h2>${L.content}<h4>Materiały</h4><ul>${(L.links||[]).map(x=>`<li><a href="${x.u}" target="_blank">${x.t}</a></li>`).join('')}</ul>`); });
}

function renderFlashcard(){
  if(!state.fcQueue.length){ $('#flashcardBox').innerText='Brak fiszek'; return; }
  const f = state.fcQueue[state.fcIndex % state.fcQueue.length];
  $('#flashcardBox').innerHTML = `<div><strong>${f.q}</strong></div>`;
  $('#flashcardBox').onclick = ()=> { $('#flashcardBox').innerHTML = `<div><strong>${f.q}</strong><p style="margin-top:8px;color:var(--muted)">${f.a}</p></div>`; };
}
$('#btnKnow').onclick = ()=> { addXP(10); state.fcIndex++; renderFlashcard(); };
$('#btnDont').onclick = ()=> { $('#flashcardBox').click(); };
$('#btnShuffle').onclick = ()=> { state.fcQueue.sort(()=>Math.random()-0.5); state.fcIndex=0; renderFlashcard(); };

function renderQuizzes(){
  const container = $('#quizzes'); container.innerHTML='';
  Object.entries(QUIZZES).forEach(([id,q])=>{ const div=document.createElement('div'); div.className='card'; div.innerHTML=`<div style="display:flex;justify-content:space-between"><strong>${q.title}</strong><button class="btn" data-qid="${id}">Start</button></div><div class="small">Poziom: ${q.level}</div>`; container.appendChild(div); });
  container.querySelectorAll('.btn').forEach(btn=>btn.onclick=(e)=>startQuiz(e.target.dataset.qid));
}

function startQuiz(id){
  const quiz = QUIZZES[id]; if(!quiz) return;
  let html = `<h2>${quiz.title}</h2><form id='quizForm'>`;
  quiz.questions.forEach((qq,idx)=>{ html += `<div><strong>${qq.q}</strong>`; qq.opts.forEach((op,i)=>{ html += `<label style="display:block"><input type="radio" name="q${idx}" value="${i}"> ${op}</label>` }); html += `</div><hr>`; });
  html += `<button class="btn" type="button" id="submitQuiz">Wyślij</button></form>`;
  showModal(html);
  $('#submitQuiz').onclick = ()=> {
    let score=0; quiz.questions.forEach((qq,i)=>{ const sel=document.querySelector(`#modalContent input[name='q${i}']:checked`); if(sel && parseInt(sel.value)===qq.correct) score++; });
    const percent = Math.round((score/quiz.questions.length)*100);
    addXP(Math.round(percent*4));
    showModal(`<h3>Wynik: ${percent}%</h3><p class="small">Zdobyte XP: ${Math.round(percent*4)}</p>`);
    renderLeaderboardLocal();
  };
}

function renderProjects(){
  const container = $('#projects'); container.innerHTML = '';
  Object.entries(PROJECTS).forEach(([id,p])=>{ const div=document.createElement('div'); div.className='card'; div.innerHTML=`<strong>${p.title}</strong><p class="small">${p.overview}</p><div style="margin-top:8px"><button class="btn" data-pid="${id}">Instrukcja</button></div>`; container.appendChild(div); });
  container.querySelectorAll('.btn').forEach(btn=>btn.onclick=(e)=>{ const id=e.target.dataset.pid; const p=PROJECTS[id]; showModal(`<h2>${p.title}</h2>${p.instructions}<h4>Przykłady</h4><ul>${(p.examples||[]).map(x=>`<li><a href="${x.u}" target="_blank">${x.t}</a></li>`).join('')}</ul>`); });
}

function renderMissions(){ const container = $('#missions'); container.innerHTML=''; MISSIONS.forEach(m=>{ const div=document.createElement('div'); div.className='card'; div.innerHTML=`<strong>${m.title}</strong><div class="small">+${m.xp} XP</div><div style="margin-top:8px"><button class="btn" data-mid="${m.id}">Wykonaj</button></div>`; container.appendChild(div); }); container.querySelectorAll('.btn').forEach(btn=>btn.onclick=(e)=>{ const id=e.target.dataset.mid; const m=MISSIONS.find(x=>x.id===id); if(m){ addXP(m.xp); showToast('Misja wykonana: '+m.title); renderLeaderboardLocal(); } }); }

function renderLeaderboardLocal(){ const p = JSON.parse(localStorage.getItem('cyber_progress')||'{}'); const box = $('#leaderboard'); box.innerHTML = `<div class="card"><strong>Twoje XP: ${p.xp||0}</strong></div>`; }

function addXP(v){ const p = JSON.parse(localStorage.getItem('cyber_progress')||'{}'); p.xp = (p.xp||0)+v; localStorage.setItem('cyber_progress', JSON.stringify(p)); updateUI(); }

function updateUI(){ const p = JSON.parse(localStorage.getItem('cyber_progress')||'{}'); document.getElementById('recommended').innerHTML = `<div class='card'>Twoje XP: ${p.xp||0}</div>`; }

function showModal(html, title){
  const modal = document.createElement('div'); modal.id='modal'; modal.className='modal active';
  modal.innerHTML = `<div class="modal-content"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong>${title||''}</strong><button class="btn ghost" id="closeModal">Zamknij</button></div><div id="modalContent">${html}</div></div>`;
  document.body.appendChild(modal);
  document.getElementById('closeModal').onclick = ()=>{ modal.remove(); };
}

function showToast(msg){ const n = document.createElement('div'); n.style.cssText='position:fixed;right:16px;bottom:16px;background:var(--accent);color:#071126;padding:10px 14px;border-radius:12px;font-weight:800;z-index:9999'; n.innerText=msg; document.body.appendChild(n); setTimeout(()=>n.remove(),2200); }

renderLessons();
renderFlashcard();
renderQuizzes();
renderProjects();
renderMissions();
renderLeaderboardLocal();
