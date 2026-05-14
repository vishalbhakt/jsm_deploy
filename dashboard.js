// ── NAVIGATION ──
const navItems = document.querySelectorAll('.sn-item[data-section]');
const sections = document.querySelectorAll('.section');
const breadcrumb = document.getElementById('breadcrumb');

const labels = {
  overview:'Dashboard', notes:'Notes', assignments:'Assignments',
  practicals:'Practicals', videos:'Video Lectures', announcements:'Announcements',
  tests:'Tests & Quizzes', attendance:'Attendance', progress:'My Progress',
  payments:'Payments', profile:'Profile'
};

function switchSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  const nav = document.querySelector('.sn-item[data-section="' + id + '"]');
  if (nav) nav.classList.add('active');
  breadcrumb.textContent = labels[id] || id;
  window.scrollTo(0,0);
  if (id === 'progress') drawChart();
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    switchSection(item.dataset.section);
    document.getElementById('sidebar').classList.remove('open');
  });
});

// stat card & view-all links
document.querySelectorAll('[data-section]').forEach(el => {
  if (!el.classList.contains('sn-item')) {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchSection(el.dataset.section);
    });
  }
});

// ── MOBILE MENU ──
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── TABS ──
document.querySelectorAll('.tab-bar').forEach(bar => {
  bar.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

// Assignment filter tabs
const assignTabs = document.querySelectorAll('#sec-assignments .tab-btn');
assignTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.tab;
    document.querySelectorAll('.at-row:not(.header)').forEach(row => {
      row.style.display = (!filter || filter === 'all' || row.dataset.status === filter) ? '' : 'none';
    });
  });
});

// ── PROGRESS CHART ──
function drawChart() {
  const canvas = document.getElementById('progressChart');
  if (!canvas || canvas.dataset.drawn) return;
  canvas.dataset.drawn = '1';
  const ctx = canvas.getContext('2d');
  const months = ['Jan','Feb','Mar','Apr','May'];
  const data = [55, 60, 65, 68, 72];
  const W = canvas.offsetWidth; const H = canvas.height;
  canvas.width = W;
  const padL=40, padB=30, padT=16, padR=20;
  const cW=W-padL-padR, cH=H-padT-padB;
  const minV=40, maxV=100;
  ctx.clearRect(0,0,W,H);

  // grid lines
  ctx.strokeStyle='#e5e7eb'; ctx.lineWidth=1;
  [40,60,80,100].forEach(v => {
    const y=padT+cH-((v-minV)/(maxV-minV))*cH;
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(padL+cW,y); ctx.stroke();
    ctx.fillStyle='#9ca3af'; ctx.font='11px Manrope'; ctx.textAlign='right';
    ctx.fillText(v+'%', padL-6, y+4);
  });

  // x labels
  months.forEach((m,i) => {
    const x=padL+(i/(months.length-1))*cW;
    ctx.fillStyle='#6b7280'; ctx.font='11px Manrope'; ctx.textAlign='center';
    ctx.fillText(m, x, H-8);
  });

  // gradient fill
  const grad=ctx.createLinearGradient(0,padT,0,padT+cH);
  grad.addColorStop(0,'rgba(10,30,79,0.2)');
  grad.addColorStop(1,'rgba(10,30,79,0)');
  ctx.beginPath();
  data.forEach((v,i) => {
    const x=padL+(i/(data.length-1))*cW;
    const y=padT+cH-((v-minV)/(maxV-minV))*cH;
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });
  ctx.lineTo(padL+cW, padT+cH); ctx.lineTo(padL, padT+cH); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();

  // line
  ctx.beginPath(); ctx.strokeStyle='#0a1e4f'; ctx.lineWidth=2.5; ctx.lineJoin='round';
  data.forEach((v,i) => {
    const x=padL+(i/(data.length-1))*cW;
    const y=padT+cH-((v-minV)/(maxV-minV))*cH;
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });
  ctx.stroke();

  // dots
  data.forEach((v,i) => {
    const x=padL+(i/(data.length-1))*cW;
    const y=padT+cH-((v-minV)/(maxV-minV))*cH;
    ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle='#0a1e4f'; ctx.fill();
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
  });
}

// ── ANIMATE PROGRESS BARS ── on section switch
function animateBars() {
  document.querySelectorAll('.pb-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    requestAnimationFrame(() => { setTimeout(() => { bar.style.width = w; }, 50); });
  });
}

// trigger on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateBars, 100);
});
