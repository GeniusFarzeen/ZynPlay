const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let car = { x: 100, y: canvas.height / 2, size: 30 };
let road = [];
let gameOver = false;
let score = 0;

function drawCar() {
  ctx.fillStyle = "red";
  ctx.fillRect(car.x - 20, car.y - 10, 40, 20);
}

function drawRoad() {
  ctx.fillStyle = "#444";
  for (let tile of road) {
    ctx.fillRect(tile.x, tile.y, 50, 20);
  }
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCar();

  car.x += 2;
  score++;
  document.getElementById("score").textContent = score;

  // check if car is on road
  const onRoad = road.some(tile => 
    car.x + 20 > tile.x && car.x < tile.x + 50 && 
    car.y + 10 > tile.y && car.y < tile.y + 20
  );

  if (!onRoad) {
    gameOver = true;
    alert(`Game Over! Your score: ${score}`);
  }

  requestAnimationFrame(update);
}

window.addEventListener("click", () => {
  if (!gameOver) {
    road.push({ x: car.x + 50, y: car.y + 5 });
  }
});

update();
