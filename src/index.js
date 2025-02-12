const btnSpin = document.getElementById("btn-spin");
const textarea = document.getElementById("options-input");

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let rotation = 0;
let options = [];
const colors = ["#ea7095", "#ecbac3", "#eeb240", "#cdd1dc", "#858FB3", ];

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const total = options.length;
  if (total === 0) return;
  
  const angleStep = (2 * Math.PI) / total;
  for (let i = 0; i < total; i++) {
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, i * angleStep, (i + 1) * angleStep);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(i * angleStep + angleStep / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "1.75rem Bai Jamjuree, serif";
      ctx.fillText(options[i], 80, 10);
      ctx.restore();
  }
}

function updateWheel() {
  options = textarea.value.split("\n").map(e => e.trim()).filter(e => e !== "");
  drawWheel();
}

let debounceTimer;
textarea.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateWheel, 300);
});

btnSpin.onclick = function () {
  const randomRotation = Math.ceil(Math.random() * 5000) + rotation;
  rotation = randomRotation;

  canvas.style.transition = "transform 2s ease-out";
  canvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
      const total = options.length;
      if (total === 0) return;

      const finalRotation = rotation % 360;
      const angleStep = 360 / total;

      const selectedIndex = Math.floor((360 - finalRotation) / angleStep) % total;
      const selectedOption = options[selectedIndex];

      alert(`Opção selecionada: ${selectedOption}`);
  }, 2000);
};