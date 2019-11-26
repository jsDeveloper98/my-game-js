"use strict";
const GameZone = document.getElementById("game_zone");
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
    this.element.style.backgroundColor = z;
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
  constructor(left, top, color, width, height, game) {
    this._color = color;
    this._left = left;
    this._top = top;
    this._width = width;
    this._height = height;
    this.step = 1;
    this.score1 = 0;
    this.score2 = 0;
    const element = document.createElement("div");
    element.classList.add("circle");
    GameZone.appendChild(element);
    this.element = element;
    this.left = this._left;
    this.top = this._top;
    this.color = this._color;
    this.height = this._height;
    this.width = this._width;
    this.movingInterval = null;
    this.game = game;
  }
  moveRight() {
    this.movingInterval = setInterval(() => {
      if (this.canEat(this.game.gift)) {
        this.game.gift.destroy();
        this.game.gift = new Gift(
          getRndInteger(0, window.innerWidth - 80),
          getRndInteger(0, window.innerHeight - 80)
        );
        this.afterEatGift();
        if (this.color === "red") {
          this.updateScore1();
        } else if (this.color === "blue") {
          this.updateScore2();
        }
      }
      if (this.canMoveRight) {
        this.left += this.step;
      }
    }, 1);
  }
  moveLeft() {
    this.movingInterval = setInterval(() => {
      if (this.canEat(this.game.gift)) {
        this.game.gift.destroy();
        this.game.gift = new Gift(
          getRndInteger(0, window.innerWidth - 80),
          getRndInteger(0, window.innerHeight - 80)
        );
        this.afterEatGift();
        if (this.color === "red") {
          this.updateScore1();
        } else if (this.color === "blue") {
          this.updateScore2();
        }
      }
      if (this.canMoveLeft) {
        this.left -= this.step;
      }
    }, 1);
  }
  moveUp() {
    this.movingInterval = setInterval(() => {
      if (this.canEat(this.game.gift)) {
        this.game.gift.destroy();
        this.game.gift = new Gift(
          getRndInteger(0, window.innerWidth - 80),
          getRndInteger(0, window.innerHeight - 80)
        );
        this.afterEatGift();
        if (this.color === "red") {
          this.updateScore1();
        } else if (this.color === "blue") {
          this.updateScore2();
        }
      }
      if (this.canMoveUp) {
        this.top -= this.step;
      } else {
        this.stop;
      }
    }, 1);
  }
  moveDown() {
    this.movingInterval = setInterval(() => {
      if (this.canEat(this.game.gift)) {
        this.game.gift.destroy();
        this.game.gift = new Gift(
          getRndInteger(0, window.innerWidth - 80),
          getRndInteger(0, window.innerHeight - 80)
        );
        this.afterEatGift();
        if (this.color === "red") {
          this.updateScore1();
        } else if (this.color === "blue") {
          this.updateScore2();
        }
      }
      if (
        this.canEat(this.game.ball2) &&
        this.canEat(this.game.ball1) &&
        this.game.ball2 &&
        this.game.ball1._width > this.game.ball2._width
      ) {
        this.game.ball2.destroy();
        this.game.ball2 = new Circle(
          getRndInteger(0, window.innerWidth - 80),
          getRndInteger(0, window.innerHeight - 80),
          "blue",
          50,
          50,
          this.game
        );
      }
      if (this.canMoveDown) {
        this.top += this.step;
      } else {
        this.stop;
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
  canEat(subject) {
    if (!this.element) return false;
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
  afterEatGift() {
    this.width += 15;
    this.height += 15;
    if (this.step > 0.3) {
      this.step -= 0.1;
    }
  }

  updateScore1() {
    this.score1 += 1;
    document.getElementById("score1").innerHTML = this.score1;
  }
  updateScore2() {
    this.score2 += 1;
    document.getElementById("score2").innerHTML = this.score2;
  }
  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
class Gift {
  get left() {
    return this._left;
  }
  get top() {
    return this._top;
  }
  set left(x) {
    this._left = x;
    this.element.style.left = x + "px";
  }
  set top(y) {
    this._top = y;
    this.element.style.top = y + "px";
  }
  constructor(left, top) {
    this._left = left;
    this._top = top;
    const element = document.createElement("div");
    element.classList.add("gift");
    GameZone.appendChild(element);
    this.element = element;
    this.left = this._left;
    this.top = this._top;
  }
  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
// class Star {
//   get left() {
//     return this._left;
//   }
//   get top() {
//     return this._top;
//   }
//   set left(x) {
//     this._left = x;
//     this.element.style.left = x + "px";
//   }
//   set top(y) {
//     this._top = y;
//     this.element.style.top = y + "px";
//   }
//   constructor(left, top) {
//     this._left = left;
//     this._top = top;
//     const element = document.createElement("div");
//     element.classList.add("star");
//     GameZone.appendChild(element);
//     this.element = element;
//     this.left = this._left;
//     this.top = this._top;
//   }
//   destroy() {
//     this.element.parentNode.removeChild(this.element); ///
//   }
// }

class Game {
  constructor() {
    this.giftLifeTime = 50000;
    this.ball1 = new Circle(
      getRndInteger(0, window.innerWidth - 80),
      getRndInteger(0, window.innerHeight - 80),
      "red",
      50,
      50,
      this
    );
    this.ball2 = new Circle(
      getRndInteger(0, window.innerWidth - 80),
      getRndInteger(0, window.innerHeight - 80),
      "blue",
      50,
      50,
      this
    );
  }
  start() {
    this.initKeyEvents();
    this.initGiftLifeCycle();
  }

  initGiftLifeCycle() {
    this.gift = new Gift(
      getRndInteger(0, window.innerWidth - 80),
      getRndInteger(0, window.innerHeight - 80)
    );
    setInterval(() => {
      this.gift.destroy();
      this.gift = new Gift(
        getRndInteger(0, window.innerWidth - 80),
        getRndInteger(0, window.innerHeight - 80)
      );
    }, this.giftLifeTime);
  }
  initKeyEvents() {
    document.body.addEventListener("keydown", event => {
      switch (event.which) {
        case 37:
          this.ball1.stop();
          this.ball1.moveLeft();
          break;
        case 38:
          this.ball1.stop();
          this.ball1.moveUp();
          break;
        case 39:
          this.ball1.stop();
          this.ball1.moveRight();
          break;
        case 40:
          this.ball1.stop();
          this.ball1.moveDown();
          break;
        case 65:
          this.ball2.stop();
          this.ball2.moveLeft();
          break;
        case 87:
          this.ball2.stop();
          this.ball2.moveUp();
          break;
        case 68:
          this.ball2.stop();
          this.ball2.moveRight();
          break;
        case 83:
          this.ball2.stop();
          this.ball2.moveDown();
          break;
      }
    });
  }
}
const game = new Game();
game.start();
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
