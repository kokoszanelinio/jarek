const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerImg = new Image();
playerImg.src = 'images/player.png';

const alienImg = new Image();
alienImg.src = 'images/alien.png';

let player = { x: 50, y: 150, width: 40, height: 40, vy: 0, jumping: false };
let gravity = 1.2;
let obstacles = [];
let frame = 0;
let score = 0;

document.addEventListener('keydown', () => {
  if (!player.jumping) {
    player.vy = -15;
    player.jumping = true;
  }
});

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player movement
  player.vy += gravity;
  player.y += player.vy;
  if (player.y > 150) {
    player.y = 150;
    player.vy = 0;
    player.jumping = false;
  }

  // Draw player
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Generate obstacles
  if (frame % 90 === 0) {
    let obstacle = { x: canvas.width, y: 150, width: 40, height: 40 };
    obstacles.push(obstacle);
  }

  // Move and draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 6;
    ctx.drawImage(alienImg, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

    // Collision detection
    if (
      player.x < obstacles[i].x + obstacles[i].width &&
      player.x + player.width > obstacles[i].x &&
      player.y < obstacles[i].y + obstacles[i].height &&
      player.y + player.height > obstacles[i].y
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  }

  score++;
  ctx.fillText("Score: " + score, 700, 20);
  frame++;
  requestAnimationFrame(update);
}

playerImg.onload = () => {
  update();
};
