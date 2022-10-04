const main = document.querySelector("main");
const gameIndicator = document.getElementById("game-indicator");
const gameScore = document.getElementById("game-score");
const gameTime = document.getElementById("game-time");

let rockEl;
let cloudEl;
let treeEl;

let gameStarted = false;

let time = 61;
let score = -1;

document.addEventListener("keydown", (e) => {
  if (!gameStarted) return startGame();

  const allObstacles = document.querySelectorAll(".obstacle");
  const firstObstacle = allObstacles[0];

  switch (e.key) {
    case "q":
      if (firstObstacle.className === "rock obstacle") {
        firstObstacle.remove();
        updateScore();
      }
      getObstacle();
      break;

    case "w":
      if (firstObstacle.className === "cloud obstacle") {
        firstObstacle.remove();
        updateScore();
      }
      getObstacle();
      break;

    case "e":
      if (firstObstacle.className === "tree obstacle") {
        firstObstacle.remove();
        updateScore();
      }
      getObstacle();
      break;

    default:
      break;
  }
});

const startGame = () => {
  gameStarted = true;

  const timeUpdater = setInterval(() => {
    if (gameStarted) {
      if (time > 0) return updateTime();
      stopGame();
      clearInterval(timeUpdater);
    }
  }, 1000);

  updateScore();
  rockEl = document.querySelector(".rock");
  cloudEl = document.querySelector(".cloud");
  treeEl = document.querySelector(".tree");
  gameIndicator.textContent = "Game has started.";

  const bean = document.createElement("div");

  bean.id = "bean";
  main.appendChild(bean);

  getObstacle();
  getObstacle();
  getObstacle();
};

const getObstacle = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  let newObstacle = document.createElement("img");
  newObstacle.style.width = "100px";

  switch (randomNumber) {
    case 0:
      newObstacle.className = "rock obstacle";
      newObstacle.src = "./images/rock.png";
      break;

    case 1:
      newObstacle.className = "cloud obstacle";
      newObstacle.src = "./images/cloud.png";
      break;

    case 2:
      newObstacle.className = "tree obstacle";
      newObstacle.src = "./images/tree.png";
      break;

    default:
      break;
  }

  main.appendChild(newObstacle);
};

const updateScore = () => {
  score++;
  gameScore.textContent = `Score: ${score}`;
};

const updateTime = () => {
  time--;
  gameTime.textContent = time;
};

const stopGame = () => {
  console.log("Hello");
  const bean = document.getElementById("bean");
  const allObstacles = document.querySelectorAll(".obstacle");

  gameIndicator.textContent = `Your score total score is ${
    score - allObstacles.length
  }.`;
  gameScore.textContent = "Press any key to start again!";

  bean.remove();

  allObstacles.forEach((obstacle) => {
    obstacle.remove();
  });

  time = 61;
  score = -1;
  gameStarted = false;
};
