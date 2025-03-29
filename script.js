const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Game variables
let ballX = Math.random() * canvas.width;
let ballY = 0;
let ballSpeed = 2;
let score = 0;

// Paddle variables
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Event listener for paddle movement
document.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  paddleX = event.clientX - rect.left - paddleWidth / 2;
});

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

  // Draw paddle
  ctx.fillStyle = 'black';
  ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);

  // Move ball
  ballY += ballSpeed;

  // Check for collision with paddle
  if (
    ballY + 10 >= canvas.height - paddleHeight - 10 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballSpeed += 0.5; // Increase speed
    ballY = 0; // Reset ball
    ballX = Math.random() * canvas.width;
    score++;
  }

  // Reset game if ball hits the bottom
  if (ballY > canvas.height) {
    alert(`Game Over! Your score: ${score}`);
    score = 0;
    ballSpeed = 2;
    ballY = 0;
    ballX = Math.random() * canvas.width;
  }

  // Update score display
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);

  requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();