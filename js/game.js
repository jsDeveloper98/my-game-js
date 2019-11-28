const btn = document.getElementById("btn");
const playerNameInput1 = document.getElementById("playerName1");
const playerNameInput2 = document.getElementById("playerName2");
const playerName1 = document.getElementById("user1");
const playerName2 = document.getElementById("user2");
const form = document.querySelector("form");
const nameAndScore = document.getElementById("container");

btn.addEventListener("click", () => {
  if (playerNameInput1.value == "" || playerNameInput2.value == "") {
    alert("This field can't be empty");
  } else {
    playerName1.innerHTML = playerNameInput1.value;
    playerName2.innerHTML = playerNameInput2.value;
    form.style.display = "none";
    const game = new Game();
    game.start();
    nameAndScore.style.display = "block";
  }
});

class Game {
  constructor() {
    this.gameZoneEl = document.getElementById("game_zone");
    this.starLifeTime = 5000;
    this.giftLifeTime = 50000;
    this.ball1 = new Circle("url(gifs/voter.gif)", 50, 50, this);
    this.ball2 = new Circle("url(gifs/voter2.gif)", 50, 50, this);
    this.balls = [this.ball1, this.ball2];
    this.gameZoneEl.appendChild(this.ball1.element);
    this.gameZoneEl.appendChild(this.ball2.element);
  }

  start() {
    let sound = new Howl({
      src: "./sounds/theme.mp3",
      format: ["mp3", "aac"]
    });
    sound.play();
    setInterval(() => {
      sound.play();
    }, 96000);

    this.initKeyEvents();
    this.initGiftLifeCycle();
    this.startStarLife();
  }
  startStarLife() {
    const time = getRndInteger(8, 10) * 1000;
    setTimeout(() => {
      this.star = new Star(this);
      setTimeout(() => {
        this.star.destroy();
        this.startStarLife();
      }, this.starLifeTime);
    }, time);
  }
  initGiftLifeCycle() {
    this.gift = new Gift(this);
  }

  initKeyEvents() {
    document.body.addEventListener("keydown", event => {
      switch (event.which) {
        case 37:
          this.ball1.moveLeft();
          break;
        case 38:
          this.ball1.moveUp();
          break;
        case 39:
          this.ball1.moveRight();
          break;
        case 40:
          this.ball1.moveDown();
          break;
        case 65:
          this.ball2.moveLeft();
          break;
        case 87:
          this.ball2.moveUp();
          break;
        case 68:
          this.ball2.moveRight();
          break;
        case 83:
          this.ball2.moveDown();
          break;
      }
    });
  }
}
