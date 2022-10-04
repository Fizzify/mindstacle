const main = document.querySelector("main");
const content = document.getElementById("content");
const gameIndicator = document.getElementById("game-indicator");
const gameScore = document.getElementById("game-score");
const gameTime = document.getElementById("game-time");

let rockEl: HTMLImageElement | null;
let cloudEl: HTMLImageElement | null;
let treeEl: HTMLImageElement | null;

let gameStarted: boolean = false;

let time: number = 61;
let score: number = -1;

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (!gameStarted) return startGame();

  const allObstacles: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".obstacle");
  const firstObstacle: Element = allObstacles[0];

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
  gameIndicator!.textContent = "Game has started.";

  const bean: HTMLDivElement = document.createElement("div");

  bean.id = "bean";
  content?.appendChild(bean);

  getObstacle();
  getObstacle();
  getObstacle();
};

const getObstacle = () => {
  const randomNumber: number = Math.floor(Math.random() * 3);
  const newObstacle: HTMLImageElement = document.createElement("img");
  newObstacle.style.width = "100px";

  switch (randomNumber) {
    case 0:
      newObstacle.className = "rock obstacle";
      newObstacle.src = "./images/rock.webp";
      break;

    case 1:
      newObstacle.className = "cloud obstacle";
      newObstacle.src = "./images/cloud.webp";
      break;

    case 2:
      newObstacle.className = "tree obstacle";
      newObstacle.src = "./images/tree.webp";
      break;

    default:
      break;
  }

  content?.appendChild(newObstacle);
};

const updateScore = () => {
  score++;
  gameScore!.textContent = `Score: ${score}`;
};

const updateTime = () => {
  time--;
  gameTime!.textContent = String(time);
};

const stopGame = () => {
  const bean = document.getElementById("bean");
  const allObstacles: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".obstacle");

  gameIndicator!.textContent = `Your score total score is ${
    score - allObstacles.length
  }.`;
  gameScore!.textContent = "Press any key to start again!";

  bean?.remove();

  allObstacles.forEach((obstacle) => {
    obstacle.remove();
  });

  time = 61;
  score = -1;
  gameStarted = false;
};
