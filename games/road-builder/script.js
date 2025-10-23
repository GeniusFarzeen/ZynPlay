const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let car = { x: 100, y: canvas.height / 2, width: 40, height: 20 };
let road = [];
let gameOver = false;
let score = 0;

// Draw car
function drawCar() {
  ctx.fillStyle = "red";
  ctx.fillRect(car.x - car.width/2, car.y - car.height/2, car.width, car.height);
}

// Draw road
function drawRoad() {
  ctx.fillStyle = "#444";
  for (let tile of road) {
    ctx.fillRect(tile.x, tile.y, 50, 20);
  }
}

// Game loop
function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCar();

  car.x += 2; // car moves forward
  score++;
  document.getElementById("score").textContent = score;

  // check if car is on road
  const onRoad = road.some(tile =>
    car.x + car.width/2 > tile.x &&
    car.x - car.width/2 < tile.x + 50 &&
    car.y + car.height/2 > tile.y &&
    car.y - car.height/2 < tile.y + 20
  );

  if (!onRoad) {
    gameOver = true;
    alert(`Game Over! Your score: ${score}`);
  }

  requestAnimationFrame(update);
}

// Tap/click to build road
window.addEventListener("click", () => {
  if (!gameOver) {
    road.push({ x: car.x + 50, y: car.y + 5 });
  }
});

update();
