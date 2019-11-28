class Circle {
  set left(x) {
    this._left = x;
    this.element.style.left = x + "px";
  }
  get left() {
    return this._left;
  }
  set top(y) {
    this._top = y;
    this.element.style.top = y + "px";
  }
  get top() {
    return this._top;
  }
  set color(z) {
    this._color = z;
    this.element.style.backgroundImage = z;
  }
  get color() {
    return this._color;
  }
  set width(w) {
    this._width = w;
    this.element.style.width = w + "px";
  }
  get width() {
    return this._width;
  }
  set height(h) {
    this._height = h;
    this.element.style.height = h + "px";
  }
  get height() {
    return this._height;
  }
  constructor(color, width, height, game) {
    this.gameZoneEl = document.getElementById("game_zone");
    this._color = color;
    this._left = getRndLeft();
    this._top = getRndTop();
    this._width = width;
    this._height = height;
    this.step = 1.5;
    this.score = 0;
    this.dir = null;
    const element = document.createElement("div");
    element.classList.add("circle");
    this.element = element;
    this.left = this._left;
    this.top = this._top;
    this.color = this._color;
    this.height = this._height;
    this.width = this._width;
    this.movingInterval = null;
    this.game = game;
    // this is used for recreating me in case I'm eaten
    this.initalParams = {
      color,
      width,
      height,
      game,
      step: 1.5,
      score: 0
    };
  }

  moveRight() {
    this.dir = "right";
    this.stop();
    this.element.style.transform = "scaleX(1)";
    this.movingInterval = setInterval(() => {
      if (this.canMoveRight) {
        this.eatingConditions();
        this.left += this.step;
      } else {
        this.stop();
      }
    }, 1);
  }

  moveLeft() {
    this.dir = "left";
    this.stop();
    this.element.style.transform = "scaleX(-1)";
    this.movingInterval = setInterval(() => {
      if (this.canMoveLeft) {
        this.eatingConditions();
        this.left -= this.step;
      } else {
        this.stop();
      }
    }, 1);
  }

  moveUp() {
    this.dir = "up";
    this.stop();
    this.movingInterval = setInterval(() => {
      if (this.canMoveUp) {
        this.eatingConditions();
        this.top -= this.step;
      } else {
        this.stop();
      }
    }, 1);
  }

  moveDown() {
    this.dir = "down";
    this.stop();
    this.movingInterval = setInterval(() => {
      if (this.canMoveDown) {
        this.eatingConditions();
        this.top += this.step;
      } else {
        this.stop();
      }
    }, 1);
  }

  stop() {
    clearInterval(this.movingInterval);
  }
  get canMoveUp() {
    return this.top > 0;
  }
  get canMoveDown() {
    return this.top < window.innerHeight - this.element.clientHeight;
  }
  get canMoveLeft() {
    return this.left > 0;
  }
  get canMoveRight() {
    return this.left < window.innerWidth - this.element.clientWidth;
  }
  eatingConditions() {
    this.eatingGift();
    this.eatingEachOther();
    this.eatingStar();
  }
  canEat(subject) {
    if (!this.element || !subject || !subject.element) return false;
    const ballTop = this.element.offsetTop;
    const ballLeft = this.element.offsetLeft;
    const giftTop = subject.element.offsetTop;
    const giftLeft = subject.element.offsetLeft;
    const ballWidth = this.element.offsetWidth;
    const ballHeight = this.element.offsetHeight;
    const giftWidth = subject.element.offsetWidth;
    const giftHeight = subject.element.offsetHeight;
    return (
      giftLeft + giftWidth >= ballLeft &&
      giftLeft <= ballLeft + ballWidth &&
      giftTop + giftHeight >= ballTop &&
      giftTop <= ballTop + ballHeight
    );
  }
  eatingStar() {
    if (this.game.star && this.canEat(this.game.star)) {
      this.game.star.destroy();
      this.afterEatStar();
    }
  }
  eatingGift() {
    if (this.canEat(this.game.gift)) {
      this.game.gift.eaten();
      this.afterEatGift();
    }
  }
  eatingEachOther() {
    const otherBall = this.game.balls.find(ball => ball !== this); // ball which is not me
    if (otherBall.score < this.score && this.canEat(otherBall)) {
      otherBall.eaten();
      this.afterEatGift();
    }
  }
  eaten() {
    Object.assign(this, {
      ...this.initalParams,
      top: getRndTop(),
      left: getRndLeft()
    });
  }
  afterEatGift() {
    let sound = new Howl({
      src: "./sounds/eating.mp3",
      format: ["mp3", "aac"]
    });
    sound.play();
    this.width += 15;
    this.height += 15;
    if (this.step > 0.3) {
      this.step = +(this.step - 0.1).toFixed(1);
      console.log(this.game.ball1.step);
      console.log(this.game.ball2.step);
    }

    this.updateScore();
  }
  afterEatStar() {
    let sound = new Howl({
      src: "./sounds/star.mp3",
      format: ["mp3", "aac"]
    });
    sound.play();
    this.step = +(this.step + 0.5).toFixed(1);
    setTimeout(() => {
      if (this.score !== 0) {
        this.step = +(this.step - 0.5).toFixed(1);
      }
    }, 6000);
  }

  gameOver() {
    this.gameZoneEl.style.opacity = "0";
    this.gameZoneEl.style.height = "0";
    this.gameZoneEl.style.overflow = "hidden";
    this.stop();
  }

  updateScore() {
    this.score++;
    document.getElementById("score1").innerHTML = this.game.ball1.score;
    document.getElementById("score2").innerHTML = this.game.ball2.score;
    if (this.score >= 10) {
      this.gameOver();
      document.body.style.backgroundColor = "black";
      document.getElementById("gameOver").style.display = "block";
      document.getElementById("firework").style.display = "block";
      document.getElementById("winner_name").style.display = "block";
      let sound = new Howl({
        src: "./sounds/fireworks.mp3",
        format: ["mp3", "aac"]
      });
      sound.play();
      if (this.game.ball1.score > this.game.ball2.score) {
        document.getElementById("winner_name").innerHTML =
          playerNameInput1.value;
      } else {
        document.getElementById("winner_name").innerHTML =
          playerNameInput2.value;
      }
    }
  }
}
