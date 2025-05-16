const towers = [...document.querySelectorAll(".tower")];
let selectedBlock = null;

const colors = ["violet", "blue", "pink", "orange", "yellow"];

function createBlocks() {
  colors.forEach(color => {
    const block = document.createElement("div");
    block.classList.add("block", color);
    towers[0].appendChild(block); // start all in first tower
  });
}

function getTopBlock(tower) {
  return tower.lastElementChild;
}

function canPlace(block, targetTower) {
  const top = getTopBlock(targetTower);
  return !top || block.offsetWidth < top.offsetWidth;
}

towers.forEach(tower => {
  tower.addEventListener("click", () => {
    const top = getTopBlock(tower);

    if (selectedBlock) {
      // Move block
      if (canPlace(selectedBlock, tower)) {
        tower.appendChild(selectedBlock);
        selectedBlock = null;
        checkWin();
      }
    } else if (top) {
      // Pick block
      selectedBlock = top;
    }
  });
});

function checkWin() {
  const isWinningTower = tower =>
    tower.children.length === 5 &&
    [...tower.children].map(b => b.classList[1]).join() === colors.join();

  if (isWinningTower(towers[1]) || isWinningTower(towers[2])) {
    document.getElementById("message").textContent = "🎉 Happy 33 months 🎉";
    launchConfetti();
  }
}

// Confetti
function launchConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    if (Date.now() > animationEnd) return clearInterval(interval);
    confetti({
      particleCount: 50,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      ...defaults
    });
  }, 300);
}

// Load confetti library
(function () {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  script.onload = createBlocks;
  document.head.appendChild(script);
})();
