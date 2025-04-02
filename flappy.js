const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 480;

document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.background = "skyblue";

// Load bird image
const birdImg = new Image();
birdImg.src = "assets/bird.png";

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.5,
    lift: -5,
    velocity: 0,
};

const pipes = [];
let frame = 0;
let gameOver = false;

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
    });
}

function update() {
    if (gameOver) return;
    
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    if (frame % 100 === 0) {
        const pipeHeight = Math.random() * (canvas.height / 2);
        pipes.push({ x: canvas.width, top: pipeHeight, bottom: pipeHeight + 100, width: 40 });
    }
    
    pipes.forEach(pipe => pipe.x -= 2);
    
    pipes.forEach(pipe => {
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
        ) {
            gameOver = true;
        }
    });
    
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver = true;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    frame++;
    requestAnimationFrame(update);
}

document.addEventListener("keydown", () => {
    if (!gameOver) bird.velocity = bird.lift;
});

update();
