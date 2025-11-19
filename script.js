const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
const startbtn = document.querySelector(".start-btn");
const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const gameover = document.querySelector(".gameover");
const restartbtn = document.querySelector(".restart");
let direction;

let highestscoreElement = document.querySelector("#highest-score");
let scoreElement = document.querySelector("#score");
let timeElement = document.querySelector("#time");

let scoreValue = 0;
let highestScoreValue = localStorage.getItem("highestScoreValue") || 0
let timelimit = `00:00`;

let timerIntervalId = null;

highestscoreElement.innerHTML = highestScoreValue;





const blocks = [];
let snake = [{ x: 1, y: 4 }]; // {x:1, y:5}, {x:1, y:6}]
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    let newBlock = document.createElement("div");
    newBlock.classList.add("block");
    // newBlock.innerText = `${row}-${col}`;
    board.appendChild(newBlock);
    blocks[`${row}-${col}`] = newBlock;
  }
}

function repeat() {
  modal2.style.display = "none";
  gameover.style.display = "none";

  intervalId = setInterval(() => {
    render();
  }, 300);
}

function render() {
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("snakeColor");
  });
  blocks[`${food.x}-${food.y}`].classList.remove("foodColor");

  let head = null;

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction == "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);
    modal2.style.display = "flex";
    gameover.style.display = "flex";
    return; 
  }

  snake.unshift(head);
  if (head.x == food.x && head.y == food.y) {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    scoreValue += 1;
    scoreElement.innerText = scoreValue;
    if(scoreValue > highestScoreValue){
      highestScoreValue = scoreValue;
      localStorage.setItem("highestScoreValue",highestScoreValue.toString());
    }
  } else {
    snake.pop();
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("snakeColor");
  });
  blocks[`${food.x}-${food.y}`].classList.add("foodColor");
}

let value = Math.floor(Math.random() * 4 + 1);
if (value == 1) {
  direction = "up";
} else if (value == 2) {
  direction = "down";
} else if (value == 3) {
  direction = "left";
} else if (value == 4) {
  direction = "right";
}

startbtn.addEventListener("click", () => {
  modal1.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 200);

  timerIntervalId = setInterval(()=>{
    let[minute, second] = timelimit.split(":").map(Number);

    if(second == 59){
      minute += 1;
      sec = 0;
    }else{
      sec += 1;
    }
    timelimit = `${minute}:${second}`;
    timeElement.innerHTML = timelimit;
  }, 1000)

});

restartbtn.addEventListener("click", () => {
  scoreValue = 0;
  scoreElement.innerHTML = scoreValue;

  init();
  repeat();
});

function init() {
  snake = [
    {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    },
  ];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
}

addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  }
});
