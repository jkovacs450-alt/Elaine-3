const stage = document.getElementById("stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const toast  = document.getElementById("toast");
const hint   = document.getElementById("hint");
const gifOverlay = document.getElementById("gifOverlay");

// Countdown Elemente
const elD = document.getElementById("d");
const elH = document.getElementById("h");
const elM = document.getElementById("m");
const elS = document.getElementById("s");
const countdownSub = document.getElementById("countdownSub");

// Startgröße für "Ja"
let yesScale = 1;
let dodges = 0;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function moveNoButton(awayFromX, awayFromY) {
  const rect = stage.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const btnW = btnRect.width;
  const btnH = btnRect.height;

  const pad = 12;
  const minX = pad;
  const maxX = rect.width - btnW - pad;
  const minY = pad;
  const maxY = rect.height - btnH - pad;

  const candidates = Array.from({ length: 10 }, () => {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const dx = (rect.left + x) - awayFromX;
    const dy = (rect.top  + y) - awayFromY;
    const dist = Math.hypot(dx, dy);
    return { x, y, dist };
  });

  candidates.sort((a, b) => b.dist - a.dist);
  const best = candidates[0];

  noBtn.style.left = `${best.x + btnW / 2}px`;
  noBtn.style.top  = `${best.y + btnH / 2}px`;
  noBtn.style.transform = "translate(-50%, -50%)";
}

function dodge(pointerX, pointerY) {
  dodges++;

  // Ja wird größer
  yesScale = clamp(yesScale + 0.12, 1, 2.3);
  yesBtn.style.transform = `scale(${yesScale})`;

  moveNoButton(pointerX, pointerY);

  // freches Feedback 😄
  if (dodges === 3) hint.textContent = "Ey… das wird nix mit Nein 😂";
  if (dodges === 6) hint.textContent = "Okay stopp… klick einfach Ja 😭💘";
  if (dodges === 10) hint.textContent = "NOPE-Button im Fluchtmodus 🏃‍♂️💨";
}

// Desktop
noBtn.addEventListener("mouseenter", (e) => dodge(e.clientX, e.clientY));
noBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  dodge(e.clientX, e.clientY);
});

// Mobile
noBtn.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  dodge(t.clientX, t.clientY);
}, { passive: true });

// Herzchen-Party
function spawnHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["💗","💖","💘","💝","💕"][Math.floor(Math.random()*5)];

  const x = Math.random() * window.innerWidth;
  const size = 14 + Math.random()*18;
  const duration = 4 + Math.random()*4;

  heart.style.left = `${x}px`;
  heart.style.bottom = `-30px`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// ✅ Countdown bis 14.02 10:00 (automatisch nächstes passendes Jahr)
function getNextValentineTarget() {
  const now = new Date();
  const year = now.getFullYear();

  // local time: Feb = 1 (0=Jan)
  let target = new Date(year, 1, 14, 10, 0, 0, 0);

  // falls heute schon nach dem Zeitpunkt: nächstes Jahr
  if (now.getTime() > target.getTime()) {
    target = new Date(year + 1, 1, 14, 10, 0, 0, 0);
  }
  return target;
}

let targetDate = getNextValentineTarget();

function pad2(n){ return String(n).padStart(2, "0"); }

function updateCountdown(){
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  // Wenn vorbei/erreicht:
  if (diff <= 0) {
    elD.textContent = "0";
    elH.textContent = "00";
    elM.textContent = "00";
    elS.textContent = "00";
    countdownSub.textContent = "Es ist Date-Zeit 😍";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  elD.textContent = String(days);
  elH.textContent = pad2(hours);
  elM.textContent = pad2(mins);
  elS.textContent = pad2(secs);

  // Anzeige welches Jahr gerade gezählt wird
  const yyyy = targetDate.getFullYear();
  countdownSub.textContent = `📅 14.02.${yyyy} • 10:00`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Wenn sie JA klickt
yesBtn.addEventListener("click", () => {
  toast.style.display = "block";
  hint.textContent = "Wusst ich’s 😌💞";
  noBtn.style.display = "none";

  yesBtn.textContent = "💍💘";
  yesBtn.style.transform = "scale(1.35)";

  // GIF einblenden
  gifOverlay.classList.add("show");
  setTimeout(() => gifOverlay.classList.remove("show"), 2600);

  // Party
  for (let i = 0; i < 30; i++) spawnHeart();
});

// Start: Nein einmal random platzieren
window.addEventListener("load", () => {
  const rect = stage.getBoundingClientRect();
  moveNoButton(rect.left + rect.width/2, rect.top + rect.height/2);
});
