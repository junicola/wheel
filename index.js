const btnSpin = document.getElementById("btn-spin");
const textarea = document.getElementById("options-input");
const popupContainer = document.querySelector(".popup-container");
const resultDialog = document.getElementById("resultDialog");
const resultText = document.getElementById("resultText");
const btnClose = document.getElementById("btn-close");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinSound = document.getElementById("spinSound");
const sparkleSound = document.getElementById("sparkleSound");

let rotation = 0;
let options = [];
const colors = ["#ea7095", "#ecbac3", "#eeb240", "#cdd1dc", "#858FB3", ];

function resizeCanvas() {
  const size = Math.min(window.innerWidth * 0.7, 500);
  canvas.width = size;
  canvas.height = size;
  drawWheel();
}

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
      ctx.fillText(options[i], radius * 0.4, 10); 
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
  if(options.length > 0) {
    const randomRotation = Math.ceil(Math.random() * 5000) + rotation;
    rotation = randomRotation;
  
    canvas.style.transition = "transform 2s ease-out";
    canvas.style.transform = `rotate(${rotation}deg)`;
  
    spinSound.play()
    setTimeout(() => {
        const total = options.length;
        if (total === 0) return;
  
        const finalRotation = rotation % 360;
        const angleStep = 360 / total;
  
        const selectedIndex = Math.floor((360 - finalRotation) / angleStep) % total;
        const selectedOption = options[selectedIndex];
  
        resultText.textContent = selectedOption;
        popupContainer.style.visibility = "visible";
        popupContainer.style.opacity = "1";
        sparkleSound.play()
        resultDialog.showModal();
    }, 2000);
  } else {
    document.getElementById("options-input").focus()
  }
};

btnClose.addEventListener("click", () => {
  popupContainer.style.visibility = "hidden";
  popupContainer.style.opacity = "0";
  resultDialog.close();
});

document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
});

window.addEventListener("load", () => {
  resizeCanvas();
});